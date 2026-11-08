"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import styles from "./RecentWorks.module.css";

type RecentVideo = {
  id: string;
  title: string;
  vimeoId: string;
  vimeoHash: string;
  thumbnail: string;
};

// Three standalone homepage features. Vimeo privacy hashes are required for unlisted videos.
const recentVideos: RecentVideo[] = [
  {
    id: "recent-1",
    title: "PROJECT 01",
    vimeoId: "1244853693",
    vimeoHash: "11e27f0db2",
    thumbnail: "https://i.vimeocdn.com/video/2223758480-234c5fb16e67245e3256d6996070ccb560351982d915ef4530700ae84abbaf10-d_1280?region=us",
  },
  {
    id: "recent-2",
    title: "PROJECT 02",
    vimeoId: "1244853654",
    vimeoHash: "bf1d3d2ca7",
    thumbnail: "https://i.vimeocdn.com/video/2223757950-c7bca2c32850537464f8e931d004a25fd4d6bdfa9869cb7b83f7d1b23f1f9bb5-d_1280?region=us",
  },
  {
    id: "recent-3",
    title: "PROJECT 03",
    vimeoId: "1244853656",
    vimeoHash: "ba386d8bff",
    thumbnail: "https://i.vimeocdn.com/video/2223758799-ab1d693ed9cf93b7b303c78cde3c22119c2843e4ab6b20f17abbf8b455a3b785-d_1280?region=us",
  },
];
function RecentVideoCard({ project, index }: { project: RecentVideo; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = /^\d+$/.test(project.vimeoId) ? project.vimeoId : "";
  const thumbnailStyle = project.thumbnail
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(12,12,11,.12), rgba(12,12,11,.52)), url("${project.thumbnail}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : undefined;

  return (
    <article className={styles.card}>
      <div className={styles.artwork}>
        {isPlaying && videoId ? (
          <iframe
            className={styles.videoPlayer}
            src={`https://player.vimeo.com/video/${videoId}?h=${project.vimeoHash}&autoplay=1&title=0&byline=0&portrait=0&badge=0`}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <div
            className={`${styles.artworkPlaceholder} ${
              index === 1 ? styles.artworkTone2 : index === 2 ? styles.artworkTone3 : ""
            }`}
            style={thumbnailStyle}
          >
            <div className={styles.previewTopline}>
              <span>CRAFTED BY SJ</span>
              <span>{String(index + 1).padStart(2, "0")} / 03</span>
            </div>
            <div className={styles.previewTitle}>
              <span>SELECTED FILM</span>
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
              <Play size={18} fill="currentColor" />
            </button>
            {!videoId && <span className={styles.pendingLabel}>VIDEO TO BE ADDED</span>}
          </div>
        )}
      </div>
      <div className={styles.cardMeta}>
        <div>
          <span>RECENT PROJECT / {String(index + 1).padStart(2, "0")}</span>
          <h3>{project.title}</h3>
        </div>
        <span className={styles.videoStatus}>{videoId ? "PLAY INLINE" : "COMING SOON"}</span>
      </div>
    </article>
  );
}

export default function RecentWorks() {
  return (
    <section className={`section ${styles.recentSection}`} id="recent-works">
      <div className={styles.sectionHeader}>
        <div className={styles.titleBlock}>
          <p className={styles.eyebrow}>03 / SELECTED PROJECTS</p>
          <div className={styles.heading} role="heading" aria-level={2} style={{ display: "block", visibility: "visible", opacity: 1, transform: "none", position: "relative", zIndex: 1 }}>RECENT <span>WORKS.</span></div>
        </div>
        <p className={styles.intro}>
          A selection of recent films, visual stories and creative collaborations.
        </p>
      </div>

      <div className={styles.topline}>
        <span>RECENT VIDEOS</span>
        <span>THREE FEATURED FILMS / PLAY INLINE</span>
      </div>

      <div className={styles.grid}>
        {recentVideos.map((project, index) => (
          <RecentVideoCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className={styles.bottomline}>
        <span>CRAFTED WITH INTENTION</span>
        <span>SELECTED WORK / 2026</span>
      </div>
    </section>
  );
}