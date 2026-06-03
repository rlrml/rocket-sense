use serde::{
    de::{self, SeqAccess, Visitor},
    Deserializer,
};
use std::fmt;
use url::form_urlencoded;
use uuid::Uuid;

use super::replays::ApiError;
use chrono::{DateTime, Utc};

pub(crate) struct QueryParams {
    pairs: Vec<(String, String)>,
}

impl QueryParams {
    pub(crate) fn from_raw(raw_query: Option<&str>) -> Self {
        let pairs = raw_query
            .into_iter()
            .flat_map(|query| form_urlencoded::parse(query.as_bytes()))
            .map(|(key, value)| (normalize_key(&key), value.into_owned()))
            .collect();

        Self { pairs }
    }

    pub(crate) fn first(&self, aliases: &[&str]) -> Option<String> {
        self.values(aliases).into_iter().next()
    }

    pub(crate) fn values(&self, aliases: &[&str]) -> Vec<String> {
        self.pairs
            .iter()
            .filter(|(key, _)| aliases.iter().any(|alias| key == &normalize_key(alias)))
            .map(|(_, value)| value.clone())
            .collect()
    }
}

pub(crate) fn deserialize_string_vec<'de, D>(deserializer: D) -> Result<Vec<String>, D::Error>
where
    D: Deserializer<'de>,
{
    deserializer.deserialize_any(StringVecVisitor)
}

pub(crate) fn deserialize_uuid_vec<'de, D>(deserializer: D) -> Result<Vec<Uuid>, D::Error>
where
    D: Deserializer<'de>,
{
    deserializer.deserialize_any(UuidVecVisitor)
}

struct StringVecVisitor;

impl<'de> Visitor<'de> for StringVecVisitor {
    type Value = Vec<String>;

    fn expecting(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("a string or a sequence of strings")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(vec![value.to_owned()])
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        Ok(vec![value])
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: SeqAccess<'de>,
    {
        let mut values = Vec::new();
        while let Some(value) = seq.next_element::<String>()? {
            values.push(value);
        }
        Ok(values)
    }
}

struct UuidVecVisitor;

impl<'de> Visitor<'de> for UuidVecVisitor {
    type Value = Vec<Uuid>;

    fn expecting(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str("a UUID string or a sequence of UUID strings")
    }

    fn visit_str<E>(self, value: &str) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        parse_uuid(value).map(|value| vec![value])
    }

    fn visit_string<E>(self, value: String) -> Result<Self::Value, E>
    where
        E: de::Error,
    {
        parse_uuid(&value).map(|value| vec![value])
    }

    fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
    where
        A: SeqAccess<'de>,
    {
        let mut values = Vec::new();
        while let Some(value) = seq.next_element::<String>()? {
            values.push(parse_uuid(&value)?);
        }
        Ok(values)
    }
}

fn parse_uuid<E>(value: &str) -> Result<Uuid, E>
where
    E: de::Error,
{
    Uuid::parse_str(value).map_err(|_| E::custom("expected UUID"))
}

pub(crate) fn parse_uuid_values(name: &str, values: Vec<String>) -> Result<Vec<Uuid>, ApiError> {
    values
        .into_iter()
        .map(|value| {
            Uuid::parse_str(value.trim())
                .map_err(|_| ApiError::bad_request(format!("{name} must be a UUID")))
        })
        .collect()
}

pub(crate) fn parse_bool_filter(name: &str, value: &str) -> Result<bool, ApiError> {
    value
        .trim()
        .parse::<bool>()
        .map_err(|_| ApiError::bad_request(format!("{name} must be true or false")))
}

pub(crate) fn parse_u32_filter(name: &str, value: &str) -> Result<u32, ApiError> {
    value
        .trim()
        .parse::<u32>()
        .map_err(|_| ApiError::bad_request(format!("{name} must be an unsigned integer")))
}

pub(crate) fn parse_datetime_filter(name: &str, value: &str) -> Result<DateTime<Utc>, ApiError> {
    DateTime::parse_from_rfc3339(value.trim())
        .map(|date| date.with_timezone(&Utc))
        .map_err(|_| ApiError::bad_request(format!("{name} must be an RFC3339 timestamp")))
}

fn normalize_key(key: &str) -> String {
    key.strip_suffix("[]").unwrap_or(key).to_owned()
}
