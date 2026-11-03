"use client";

import { useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";

export default function EditorsCutOpening() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const exitTimer = window.setTimeout(() => setLeaving(true), 2050);
    const removeTimer = window.setTimeout(() => setVisible(false), 2700);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--tilt-x", `${(x * 5).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(-y * 4).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--shift-x", `${(x * 5).toFixed(1)}px`);
    event.currentTarget.style.setProperty("--shift-y", `${(y * 4).toFixed(1)}px`);
  };

  const resetPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--shift-x", "0px");
    event.currentTarget.style.setProperty("--shift-y", "0px");
  };

  if (!visible) return null;

  return (
    <div
      className={`sj-signature-loader${leaving ? " sj-signature-loader--exit" : ""}`}
      role="status"
      aria-label="Crafted By SJ"
      aria-live="polite"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="sj-signature-loader__light" aria-hidden="true" />

      <div className="sj-signature-loader__lockup">
        <span className="sj-signature-loader__eyebrow">
          WELCOME TO MY FRAME OF MIND
        </span>

        <h1 className="sj-signature-loader__wordmark">
          <span className="sj-signature-loader__crafted">CRAFTED</span>
          <span className="sj-signature-loader__by">BY SJ</span>
        </h1>

        <div className="sj-signature-loader__progress" aria-hidden="true">
          <span />
        </div>

        <div className="sj-signature-loader__footer">
          <span>VISUALS · MOTION · DESIGN</span>
          <span>EST. IN THE FRAME</span>
        </div>
      </div>
    </div>
  );
}
