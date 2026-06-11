use async_trait::async_trait;
use bytes::Bytes;
use flate2::{read::GzDecoder, write::GzEncoder, Compression};
use sha2::{Digest, Sha256};
use std::{
    io::{Read, Write},
    path::{Component, Path, PathBuf},
    str::FromStr,
};
use tokio::fs;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StoredObject {
    pub key: String,
    pub content_type: Option<mime::Mime>,
    pub byte_size: u64,
    pub sha256: String,
    pub storage_encoding: StorageEncoding,
    pub storage_byte_size: u64,
    pub storage_sha256: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum StorageEncoding {
    Identity,
    Gzip,
    Zstd,
}

impl StorageEncoding {
    pub fn as_str(self) -> &'static str {
        match self {
            Self::Identity => "identity",
            Self::Gzip => "gzip",
            Self::Zstd => "zstd",
        }
    }

    pub fn extension(self) -> &'static str {
        match self {
            Self::Identity => "",
            Self::Gzip => ".gz",
            Self::Zstd => ".zst",
        }
    }

    pub fn compressed(self) -> bool {
        !matches!(self, Self::Identity)
    }
}

impl std::fmt::Display for StorageEncoding {
    fn fmt(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        formatter.write_str(self.as_str())
    }
}

impl FromStr for StorageEncoding {
    type Err = StorageEncodingParseError;

    fn from_str(value: &str) -> Result<Self, Self::Err> {
        match value.trim().to_ascii_lowercase().as_str() {
            "" | "identity" | "none" | "raw" => Ok(Self::Identity),
            "gzip" | "gz" => Ok(Self::Gzip),
            "zstd" | "zst" => Ok(Self::Zstd),
            _ => Err(StorageEncodingParseError(value.to_owned())),
        }
    }
}

#[derive(Debug, Clone, thiserror::Error)]
#[error("unsupported storage encoding `{0}`")]
pub struct StorageEncodingParseError(String);

pub const DEFAULT_STORAGE_ENCODING: StorageEncoding = StorageEncoding::Zstd;

pub fn encode_bytes(bytes: &[u8], encoding: StorageEncoding) -> Result<Bytes, StorageError> {
    match encoding {
        StorageEncoding::Identity => Ok(Bytes::copy_from_slice(bytes)),
        StorageEncoding::Gzip => {
            let mut encoder = GzEncoder::new(Vec::new(), Compression::default());
            encoder
                .write_all(bytes)
                .map_err(|source| StorageError::Encode { encoding, source })?;
            encoder
                .finish()
                .map(Bytes::from)
                .map_err(|source| StorageError::Encode { encoding, source })
        }
        StorageEncoding::Zstd => zstd::stream::encode_all(bytes, 3)
            .map(Bytes::from)
            .map_err(|source| StorageError::Encode { encoding, source }),
    }
}

pub fn decode_bytes(bytes: &[u8], encoding: StorageEncoding) -> Result<Bytes, StorageError> {
    match encoding {
        StorageEncoding::Identity => Ok(Bytes::copy_from_slice(bytes)),
        StorageEncoding::Gzip => {
            let mut decoder = GzDecoder::new(bytes);
            let mut decoded = Vec::new();
            decoder
                .read_to_end(&mut decoded)
                .map_err(|source| StorageError::Decode { encoding, source })?;
            Ok(Bytes::from(decoded))
        }
        StorageEncoding::Zstd => zstd::stream::decode_all(bytes)
            .map(Bytes::from)
            .map_err(|source| StorageError::Decode { encoding, source }),
    }
}

#[derive(Debug, thiserror::Error)]
pub enum StorageError {
    #[error("storage key must be a relative path without parent directory components: {0}")]
    InvalidKey(String),
    #[error("failed to write object at key {key}")]
    Write {
        key: String,
        #[source]
        source: std::io::Error,
    },
    #[error("failed to read object at key {key}")]
    Read {
        key: String,
        #[source]
        source: std::io::Error,
    },
    #[error("failed to delete object at key {key}")]
    Delete {
        key: String,
        #[source]
        source: std::io::Error,
    },
    #[error("failed to encode object with {encoding}")]
    Encode {
        encoding: StorageEncoding,
        #[source]
        source: std::io::Error,
    },
    #[error("failed to decode object with {encoding}")]
    Decode {
        encoding: StorageEncoding,
        #[source]
        source: std::io::Error,
    },
}

#[async_trait]
pub trait ObjectStorage: Send + Sync {
    async fn put(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
    ) -> Result<StoredObject, StorageError>;

    async fn put_with_encoding(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
        storage_encoding: StorageEncoding,
    ) -> Result<StoredObject, StorageError>;

    async fn get(&self, key: &str) -> Result<Bytes, StorageError>;

    /// Remove the object at `key`. Deleting a key that does not exist is not
    /// an error, so callers can safely retry after a partial failure.
    async fn delete(&self, key: &str) -> Result<(), StorageError>;
}

#[derive(Debug, Clone)]
pub struct LocalStorage {
    root: PathBuf,
    default_encoding: StorageEncoding,
}

impl LocalStorage {
    pub fn new(root: impl Into<PathBuf>) -> Self {
        Self {
            root: root.into(),
            default_encoding: DEFAULT_STORAGE_ENCODING,
        }
    }

    pub fn with_default_encoding(
        root: impl Into<PathBuf>,
        default_encoding: StorageEncoding,
    ) -> Self {
        Self {
            root: root.into(),
            default_encoding,
        }
    }

    pub fn root(&self) -> &Path {
        &self.root
    }

    fn resolve_key(&self, key: &str) -> Result<PathBuf, StorageError> {
        let path = Path::new(key);
        if path.is_absolute()
            || path
                .components()
                .any(|component| !matches!(component, Component::Normal(_)))
        {
            return Err(StorageError::InvalidKey(key.to_owned()));
        }

        Ok(self.root.join(path))
    }

    fn key_for_encoding(&self, key: &str, encoding: StorageEncoding) -> String {
        let extension = encoding.extension();
        if extension.is_empty() || key.ends_with(extension) {
            key.to_owned()
        } else {
            format!("{key}{extension}")
        }
    }
}

#[async_trait]
impl ObjectStorage for LocalStorage {
    async fn put(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
    ) -> Result<StoredObject, StorageError> {
        self.put_with_encoding(key, bytes, content_type, self.default_encoding)
            .await
    }

    async fn put_with_encoding(
        &self,
        key: &str,
        bytes: Bytes,
        content_type: Option<mime::Mime>,
        storage_encoding: StorageEncoding,
    ) -> Result<StoredObject, StorageError> {
        let stored_bytes = encode_bytes(&bytes, storage_encoding)?;
        let stored_key = self.key_for_encoding(key, storage_encoding);
        let path = self.resolve_key(&stored_key)?;
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent)
                .await
                .map_err(|source| StorageError::Write {
                    key: stored_key.clone(),
                    source,
                })?;
        }

        fs::write(&path, &stored_bytes)
            .await
            .map_err(|source| StorageError::Write {
                key: stored_key.clone(),
                source,
            })?;

        Ok(StoredObject {
            key: stored_key,
            content_type,
            byte_size: bytes.len() as u64,
            sha256: sha256_hex(&bytes),
            storage_encoding,
            storage_byte_size: stored_bytes.len() as u64,
            storage_sha256: sha256_hex(&stored_bytes),
        })
    }

    async fn get(&self, key: &str) -> Result<Bytes, StorageError> {
        let path = self.resolve_key(key)?;
        let stored_bytes = fs::read(path).await.map_err(|source| StorageError::Read {
            key: key.to_owned(),
            source,
        })?;
        let encoding = storage_encoding_from_key(key);
        decode_bytes(&stored_bytes, encoding).map_err(|error| match error {
            StorageError::Decode { .. } => error,
            _ => StorageError::Read {
                key: key.to_owned(),
                source: std::io::Error::new(std::io::ErrorKind::InvalidData, error),
            },
        })
    }

    async fn delete(&self, key: &str) -> Result<(), StorageError> {
        let path = self.resolve_key(key)?;
        match fs::remove_file(&path).await {
            Ok(()) => Ok(()),
            Err(error) if error.kind() == std::io::ErrorKind::NotFound => Ok(()),
            Err(source) => Err(StorageError::Delete {
                key: key.to_owned(),
                source,
            }),
        }
    }
}

pub fn storage_encoding_from_key(key: &str) -> StorageEncoding {
    if key.ends_with(StorageEncoding::Zstd.extension()) {
        StorageEncoding::Zstd
    } else if key.ends_with(StorageEncoding::Gzip.extension()) {
        StorageEncoding::Gzip
    } else {
        StorageEncoding::Identity
    }
}

pub fn raw_replay_key(file_sha256: &str) -> String {
    format!("replays/sha256/{file_sha256}.replay")
}

pub fn replay_mime_type() -> mime::Mime {
    mime::Mime::from_str("application/vnd.rocketleague.replay")
        .expect("static replay MIME type should parse")
}

pub fn sha256_hex(bytes: &[u8]) -> String {
    hex::encode(Sha256::digest(bytes))
}

#[cfg(test)]
#[path = "lib_tests.rs"]
mod tests;
