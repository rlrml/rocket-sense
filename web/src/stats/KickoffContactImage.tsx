import { capturePlayerImagesFromParsed } from "@rlrml/player";
import { useEffect, useRef, useState } from "react";
import {
  CONTACT_CAMERA_FOV,
  CONTACT_CAMERA_HEIGHT,
  CONTACT_FRAME_LEAD_FRACTION,
  contactCaptureMoment,
  setContactOverheadCamera,
} from "./contactCamera";
import { PLAYER_ASSET_BASE } from "./playerAssets";
import { preloadReplay } from "./replayModel";

const CONTACT_IMAGE_WIDTH = 720;
const CONTACT_IMAGE_HEIGHT = 450;
const CONTACT_IMAGE_CACHE_VERSION = "v4";
const BATCH_DELAY_MS = 50;
const contactImageCache = new Map<string, Promise<string>>();
const contactImageBatches = new Map<string, ContactImageBatch>();

interface ContactImageRequest {
  frame: number;
  resolve: (dataUrl: string) => void;
  reject: (err: unknown) => void;
}

interface ContactImageBatch {
  replayId: string;
  pixelRatio: number;
  requests: ContactImageRequest[];
  timer: ReturnType<typeof setTimeout>;
}

export interface KickoffContactImageProps {
  replayId: string;
  frame: number | null;
}

export function KickoffContactImage({ replayId, frame }: KickoffContactImageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) {
      setVisible(true);
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1600px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || frame == null) {
      return;
    }
    let cancelled = false;
    setSrc(null);
    setError(null);
    loadContactImage(replayId, frame)
      .then((dataUrl) => {
        if (!cancelled) setSrc(dataUrl);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render contact image");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [frame, replayId, visible]);

  return (
    <div className="kickoff-contact-frame" ref={rootRef}>
      {frame == null ? (
        <div className="kickoff-contact-status">No contact frame</div>
      ) : error ? (
        <div className="kickoff-contact-status">Couldn&apos;t render contact image</div>
      ) : src ? (
        <img src={src} alt="Direct overhead view of kickoff contact" loading="lazy" />
      ) : (
        <div className="kickoff-contact-status">
          {visible ? "Rendering contact image…" : "Queued contact image"}
        </div>
      )}
    </div>
  );
}

function loadContactImage(replayId: string, frame: number): Promise<string> {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const key = [
    CONTACT_IMAGE_CACHE_VERSION,
    replayId,
    frame,
    `${CONTACT_IMAGE_WIDTH}x${CONTACT_IMAGE_HEIGHT}`,
    pixelRatio,
    CONTACT_CAMERA_HEIGHT,
    CONTACT_CAMERA_FOV,
    CONTACT_FRAME_LEAD_FRACTION,
  ].join(":");
  let pending = contactImageCache.get(key);
  if (!pending) {
    pending = enqueueContactImageCapture(replayId, frame, pixelRatio);
    pending.catch(() => contactImageCache.delete(key));
    contactImageCache.set(key, pending);
  }
  return pending;
}

function enqueueContactImageCapture(
  replayId: string,
  frame: number,
  pixelRatio: number,
): Promise<string> {
  const batchKey = `${replayId}:${pixelRatio}`;
  let batch = contactImageBatches.get(batchKey);
  if (!batch) {
    batch = {
      replayId,
      pixelRatio,
      requests: [],
      timer: setTimeout(() => {
        void flushContactImageBatch(batchKey);
      }, BATCH_DELAY_MS),
    };
    contactImageBatches.set(batchKey, batch);
  }

  return new Promise<string>((resolve, reject) => {
    batch.requests.push({ frame, resolve, reject });
  });
}

async function flushContactImageBatch(batchKey: string): Promise<void> {
  const batch = contactImageBatches.get(batchKey);
  if (!batch) return;
  contactImageBatches.delete(batchKey);
  clearTimeout(batch.timer);

  try {
    const parsed = await preloadReplay(batch.replayId);
    const images = await capturePlayerImagesFromParsed(
      parsed,
      batch.requests.map((request) => {
        const capture = contactCaptureMoment(parsed.replay, request.frame);
        return {
          time: capture.time,
          width: CONTACT_IMAGE_WIDTH,
          height: CONTACT_IMAGE_HEIGHT,
          pixelRatio: batch.pixelRatio,
          camera: {
            mode: "custom",
            setup: (player) => {
              setContactOverheadCamera(player, capture.ballPosition);
            },
          },
          settleFrames: 1,
        };
      }),
      {
        playerOptions: {
          assetBase: PLAYER_ASSET_BASE,
          effects: false,
          environment: false,
        },
        readyTimeoutMs: false,
      },
    );
    batch.requests.forEach((request, index) => {
      const image = images[index];
      if (image) {
        request.resolve(image.dataUrl);
      } else {
        request.reject(new Error("Static image batch did not return an image"));
      }
    });
  } catch (err) {
    for (const request of batch.requests) {
      request.reject(err);
    }
  }
}
