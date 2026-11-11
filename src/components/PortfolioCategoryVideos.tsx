"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { PortfolioCategory, PortfolioProject } from "@/lib/portfolio";
import styles from "./PortfolioCategoryVideos.module.css";

type VimeoPlayerInstance = {
  on: (event: "ended", callback: () => void) => void;
  off: (event: "ended", callback: () => void) => void;
  destroy: () => Promise<void>;
};

declare global {
  interface Window {
    Vimeo?: {
      Player: new (iframe: HTMLIFrameElement) => VimeoPlayerInstance;
    };
  }
}

let vimeoSdkPromise: Promise<void> | null = null;

function loadVimeoSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Vimeo Player SDK is only available in the browser."));
  }

  if (window.Vimeo?.Player) return Promise.resolve();
  if (vimeoSdkPromise) return vimeoSdkPromise;

  vimeoSdkPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>("script[data-vimeo-player-sdk]");
    const script = existingScript ?? document.createElement("script");

    const onLoad = () => {
      if (window.Vimeo?.Player) resolve();
      else reject(new Error("Vimeo Player SDK loaded but did not initialize."));
    };
    const onError = () => reject(new Error("Could not load Vimeo Player SDK."));

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existingScript) {
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      script.dataset.vimeoPlayerSdk = "true";
      document.head.appendChild(script);
    } else if (window.Vimeo?.Player) {
      resolve();
    }
  }).catch((error) => {
    vimeoSdkPromise = null;
    throw error;
  });

  return vimeoSdkPromise;
}

function VideoCard({
  project,
  category,
  index,
  isPlaying,
  onPlay,
  onEnded,
}: {
  project: PortfolioProject;
  category: PortfolioCategory;
  index: number;
  isPlaying: boolean;
  onPlay: () => void;
  onEnded: () => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const onEndedRef = useRef(onEnded);
  const videoId = /^\d+$/.test(project.vimeoId.trim()) ? project.vimeoId.trim() : "";
  const ratioParts = (project.aspectRatio ?? "16 / 9").split("/");
  const ratioWidth = Number(ratioParts[0]?.trim());
  const ratioHeight = Number(ratioParts[1]?.trim());
  const isPortrait =
    Number.isFinite(ratioWidth) &&
    Number.isFinite(ratioHeight) &&
    ratioWidth > 0 &&
    ratioHeight > 0 &&
    ratioWidth < ratioHeight;
  const [resolvedThumbnail, setResolvedThumbnail] = useState(project.thumbnail.trim());

  // Fetch Vimeo's current thumbnail for cards without a manually supplied image.
  // Use the full unlisted URL when a privacy hash exists.
  useEffect(() => {
    let cancelled = false;
    const savedThumbnail = project.thumbnail.trim();
    setResolvedThumbnail(savedThumbnail);

    if (savedThumbnail || !videoId) {
      return () => {
        cancelled = true;
      };
    }

    const videoPageUrl = project.vimeoHash
      ? `https://vimeo.com/${videoId}/${project.vimeoHash}`
      : `https://vimeo.com/${videoId}`;
    const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoPageUrl)}&width=1280`;

    fetch(oembedUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Vimeo thumbnail request failed (${response.status}).`);
        }
        return response.json() as Promise<{ thumbnail_url?: string }>;
      })
      .then((data) => {
        if (!cancelled && typeof data.thumbnail_url === "string") {
          setResolvedThumbnail(data.thumbnail_url);
        }
      })
      .catch((error: unknown) => {
        console.error(`Could not load the Vimeo thumbnail for ${project.title}:`, error);
      });

    return () => {
      cancelled = true;
    };
  }, [videoId, project.vimeoHash, project.thumbnail, project.title]);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    if (!isPlaying || !videoId || !iframeRef.current) return;

    let disposed = false;
    let player: VimeoPlayerInstance | null = null;
    const handleEnded = () => onEndedRef.current();

    void loadVimeoSdk()
      .then(() => {
        const VimeoPlayer = window.Vimeo?.Player;
        if (disposed || !iframeRef.current || !VimeoPlayer) return;
        player = new VimeoPlayer(iframeRef.current);
        player.on("ended", handleEnded);
      })
      .catch((error: unknown) => {
        console.error("Vimeo player could not be initialized:", error);
      });

    return () => {
      disposed = true;
      if (player) {
        player.off("ended", handleEnded);
        void player.destroy().catch(() => undefined);
      }
    };
  }, [isPlaying, videoId]);

  const thumbnailStyle = resolvedThumbnail
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(12,12,11,.18), rgba(12,12,11,.7)), url("${resolvedThumbnail}")`,
      }
    : undefined;

  return (
    <article className={styles.videoCard}>
      <div className={`${styles.videoFrame} ${isPortrait ? styles.videoFramePortrait : ""}`} style={{ aspectRatio: project.aspectRatio ?? "16 / 9" }}>
        {isPlaying && videoId ? (
          <iframe
            ref={iframeRef}
            className={styles.videoPlayer}
            src={`https://player.vimeo.com/video/${videoId}?${project.vimeoHash ? `h=${project.vimeoHash}&` : ""}autoplay=1&title=0&byline=0&portrait=0&badge=0&api=1`}
            title={`${category.name} Ã¢â‚¬â€ ${project.title}`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div className={styles.videoPreview} style={thumbnailStyle}>
            <div className={styles.previewTopline}>
              <span>CRAFTED BY SJ</span>
              <span>{String(index + 1).padStart(2, "0")} / {String(category.projects.length).padStart(2, "0")}</span>
            </div>
            <div className={styles.previewTitle}>
              <span>{category.name.toUpperCase()}</span>
              <strong>{project.title}</strong>
            </div>
            <button
              type="button"
              className={styles.playButton}
              onClick={onPlay}
              disabled={!videoId}
              aria-label={videoId ? `Play ${project.title}` : `${project.title} Vimeo video has not been added yet`}
              title={videoId ? "Play video" : "Add a Vimeo ID in src/lib/portfolio.ts to enable playback"}
            >
              <Play size={17} fill="currentColor" />
            </button>
            {!videoId && <span className={styles.pendingLabel}>VIMEO VIDEO TO BE ADDED</span>}
          </div>
        )}
      </div>
      <div className={styles.videoMeta}>
        <span>{project.title}</span>
        <span>VIDEO {String(index + 1).padStart(2, "0")}</span>
      </div>
    </article>
  );
}

export default function PortfolioCategoryVideos({ category }: { category: PortfolioCategory }) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  return (
    <div className={styles.videoGrid}>
      {category.projects.map((project, index) => (
        <VideoCard
          key={project.id}
          project={project}
          category={category}
          index={index}
          isPlaying={activeProjectId === project.id}
          onPlay={() => setActiveProjectId(project.id)}
          onEnded={() => setActiveProjectId(null)}
        />
      ))}
    </div>
  );
}


