"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { PortfolioCategory, PortfolioProject } from "@/lib/portfolio";
import styles from "./PortfolioCategoryVideos.module.css";

function VideoCard({ project, category, index }: { project: PortfolioProject; category: PortfolioCategory; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = /^\d+$/.test(project.vimeoId.trim()) ? project.vimeoId.trim() : "";
  const thumbnailStyle = project.thumbnail.trim()
    ? { backgroundImage: `linear-gradient(135deg, rgba(12,12,11,.18), rgba(12,12,11,.7)), url("${project.thumbnail.trim()}")` }
    : undefined;

  return (
    <article className={styles.videoCard}>
      <div className={styles.videoFrame}>
        {isPlaying && videoId ? (
          <iframe
            className={styles.videoPlayer}
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0`}
            title={`${category.name} — ${project.title}`}
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
              onClick={() => videoId && setIsPlaying(true)}
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
  return (
    <div className={styles.videoGrid}>
      {category.projects.map((project, index) => (
        <VideoCard key={project.id} project={project} category={category} index={index} />
      ))}
    </div>
  );
}