"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function EditorsCutOpening() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const exitTimer = window.setTimeout(() => setLeaving(true), 2650);
    const removeTimer = window.setTimeout(() => setVisible(false), 3350);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`sj-opening${leaving ? " sj-opening--exit" : ""}`}
      role="status"
      aria-label="Crafted By SJ — opening sequence"
      aria-live="polite"
    >
      <div className="sj-opening__ambient" aria-hidden="true" />
      <div className="sj-opening__grain" aria-hidden="true" />

      <header className="sj-opening__topline">
        <div className="sj-opening__signature">SJ<span>—</span></div>
        <span className="sj-opening__top-label">INDEPENDENT CREATIVE PRACTICE</span>
        <span className="sj-opening__serial">PORTFOLIO / NO. 001</span>
      </header>

      <main className="sj-opening__stage">
        <section className="sj-opening__copy">
          <p className="sj-opening__eyebrow">
            CREATIVE DIRECTION <i /> VIDEO EDITING <i /> MOTION DESIGN
          </p>
          <h1 className="sj-opening__headline">
            EVERY FRAME
            <br />
            HAS A <em>PURPOSE.</em>
          </h1>
          <p className="sj-opening__thought">
            Ideas shaped into images.
            <br />
            Images shaped into feeling.
          </p>
          <div className="sj-opening__credit">
            <span>AN INTRODUCTION TO</span>
            <strong>SOUMOJIT DAS</strong>
          </div>
        </section>

        <figure className="sj-opening__portrait">
          <div className="sj-opening__portrait-matte">
            <Image
              src="/images/hero-portrait.png"
              alt=""
              fill
              priority
              sizes="(max-width: 700px) 64vw, 39vw"
              className="sj-opening__portrait-image"
            />
          </div>
          <div className="sj-opening__portrait-outline" aria-hidden="true" />
          <span className="sj-opening__portrait-index">FIG. 001 / SJ</span>
          <span className="sj-opening__portrait-side">CRAFTED BEYOND THE FRAME</span>
          <figcaption className="sj-opening__portrait-caption">
            <span>THE CREATIVE</span>
            <span>BEHIND THE CUT</span>
          </figcaption>
        </figure>
      </main>

      <footer className="sj-opening__edit">
        <div className="sj-opening__edit-meta">
          <span>SEQUENCE 001</span>
          <span>PICTURE / SOUND</span>
          <span>PREPARING YOUR VIEW</span>
        </div>
        <div className="sj-opening__timeline">
          <div className="sj-opening__track-labels" aria-hidden="true">
            <span>V1</span>
            <span>A1</span>
          </div>
          <div className="sj-opening__tracks">
            <div className="sj-opening__track sj-opening__track--picture">
              <span className="sj-opening__clip sj-opening__clip--one">SOURCE</span>
              <span className="sj-opening__clip sj-opening__clip--two">SELECTED FRAME</span>
              <span className="sj-opening__clip sj-opening__clip--three">FINAL CUT</span>
            </div>
            <div className="sj-opening__track sj-opening__track--sound">
              <span className="sj-opening__waveform" />
            </div>
            <span className="sj-opening__playhead" aria-hidden="true" />
          </div>
        </div>
        <div className="sj-opening__edit-bottom">
          <span>CRAFTED BY SJ</span>
          <span>VISUALS / MOTION / STORYTELLING</span>
          <span>01 — 01</span>
        </div>
      </footer>
    </div>
  );
}
