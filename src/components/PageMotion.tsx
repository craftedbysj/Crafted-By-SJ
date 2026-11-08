"use client";

import { useEffect, useState } from "react";

export default function PageMotion() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.add("motion-ready");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealTargets = document.querySelectorAll(
      ".hero-intro, .hero-footer, .section-heading, .section-topline, .resource-item, .work-empty, .about-meta, .contact-links, .site-footer, .detail-page > *"
    );

    if (reducedMotion) {
      revealTargets.forEach((element) => {
        element.classList.add("is-revealed");
      });
      setVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach((element) => {
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });

    const startExit = window.setTimeout(() => {
      setLeaving(true);
    }, 2900);

    const removeLoader = window.setTimeout(() => {
      setVisible(false);
    }, 3800);

    return () => {
      observer.disconnect();
      window.clearTimeout(startExit);
      window.clearTimeout(removeLoader);
    };
  }, []);


  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heroImage = document.querySelector<HTMLElement>(".home .hero-image");
    const sectionHeadings = Array.from(
      document.querySelectorAll<HTMLElement>(".home .section-heading")
    ).map((heading) => ({
      title: heading.querySelector<HTMLElement>(":scope > div"),
      intro: heading.querySelector<HTMLElement>(":scope > .section-intro")
    }));
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".home .resource-item")
    );

    const style = document.createElement("style");
    style.dataset.sjScrollDepth = "true";
    style.textContent = `
      .home .hero-image {
        transform: translate3d(0, var(--sj-hero-depth, 0px), 0) scale(1.035);
        will-change: transform;
      }
      .home .section-heading > div,
      .home .section-heading > .section-intro {
        transform: translate3d(0, var(--sj-section-depth, 0px), 0);
      }
      .home .resource-item.sj-depth-card {
        --sj-card-rx: 0deg;
        --sj-card-ry: 0deg;
        --sj-card-light-x: 50%;
        --sj-card-light-y: 50%;
        position: relative;
        transform: perspective(1000px) rotateX(var(--sj-card-rx)) rotateY(var(--sj-card-ry));
        transform-style: preserve-3d;
        transition: transform 320ms cubic-bezier(.2,.72,.2,1);
      }
      .home .resource-item.sj-depth-card::before {
        content: "";
        position: absolute;
        z-index: 3;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(230px circle at var(--sj-card-light-x) var(--sj-card-light-y), rgba(255,255,255,.13), transparent 70%);
        transition: opacity 180ms ease;
      }
      .home .resource-item.sj-depth-card.sj-pointer-active {
        transition-duration: 70ms;
      }
      .home .resource-item.sj-depth-card.sj-pointer-active::before {
        opacity: 1;
      }
      .home .resource-item.sj-depth-card .resource-visual {
        position: relative;
        z-index: 1;
        transform: translateZ(12px);
        transition: transform 320ms cubic-bezier(.2,.72,.2,1);
      }
      .home .resource-item.sj-depth-card:hover .resource-visual {
        transform: translateZ(17px) translateY(-4px);
      }
      .home .resource-item.sj-depth-card .resource-details {
        position: relative;
        z-index: 1;
        transform: translateZ(5px);
      }
      @media (max-width: 700px) {
        .home .hero-image { will-change: auto; }
        .home .resource-item.sj-depth-card {
          transform: none !important;
          transition: none;
        }
        .home .resource-item.sj-depth-card::before { display: none; }
        .home .resource-item.sj-depth-card .resource-visual,
        .home .resource-item.sj-depth-card .resource-details { transform: none; }
      }
    `;
    document.head.appendChild(style);

    let scrollFrame = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const updateScrollDepth = () => {
      scrollFrame = 0;
      const scrollY = window.scrollY;

      if (heroImage) {
        heroImage.style.setProperty(
          "--sj-hero-depth",
          `${clamp(scrollY * 0.14, 0, 105).toFixed(1)}px`
        );
      }

      const viewportCenter = window.innerHeight * 0.52;
      sectionHeadings.forEach(({ title, intro }) => {
        const target = title ?? intro;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const depth = clamp((viewportCenter - elementCenter) * 0.014, -12, 12);

        title?.style.setProperty("--sj-section-depth", `${depth.toFixed(2)}px`);
        intro?.style.setProperty("--sj-section-depth", `${(-depth * 0.75).toFixed(2)}px`);
      });
    };

    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollDepth);
    };

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      card.classList.add("sj-depth-card");

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch" || window.innerWidth <= 700) return;
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.classList.add("sj-pointer-active");
        card.style.setProperty("--sj-card-rx", `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty("--sj-card-ry", `${(x * 6).toFixed(2)}deg`);
        card.style.setProperty("--sj-card-light-x", `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty("--sj-card-light-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      };

      const onPointerLeave = () => {
        card.classList.remove("sj-pointer-active");
        card.style.setProperty("--sj-card-rx", "0deg");
        card.style.setProperty("--sj-card-ry", "0deg");
        card.style.setProperty("--sj-card-light-x", "50%");
        card.style.setProperty("--sj-card-light-y", "50%");
      };

      card.addEventListener("pointermove", onPointerMove, { passive: true });
      card.addEventListener("pointerleave", onPointerLeave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", onPointerMove);
        card.removeEventListener("pointerleave", onPointerLeave);
        card.classList.remove("sj-depth-card", "sj-pointer-active");
        [
          "--sj-card-rx",
          "--sj-card-ry",
          "--sj-card-light-x",
          "--sj-card-light-y"
        ].forEach((property) => card.style.removeProperty(property));
      });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollDepth();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      heroImage?.style.removeProperty("--sj-hero-depth");
      sectionHeadings.forEach(({ title, intro }) => {
        title?.style.removeProperty("--sj-section-depth");
        intro?.style.removeProperty("--sj-section-depth");
      });
      cleanups.forEach((cleanup) => cleanup());
      style.remove();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`cinematic-loader${leaving ? " cinematic-loader--exit" : ""}`}
      aria-label="Crafted By SJ"
      role="status"
    >
      <div className="cinematic-loader__light" />
      <div className="cinematic-loader__portrait">
        <img
          src="/images/hero-portrait.png"
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="cinematic-loader__shade" />
      <div className="cinematic-loader__grain" />

      <div className="cinematic-loader__content">
        <span className="cinematic-loader__eyebrow">
          INDEPENDENT CREATIVE ARTIST
        </span>

        <h1 className="cinematic-loader__name">
          SOUMOJIT <span>DAS</span>
        </h1>

        <div className="cinematic-loader__bottom">
          <span>VISUALS · MOTION · STORYTELLING</span>
          <span className="cinematic-loader__index">01 — 01</span>
        </div>
      </div>
    </div>
  );
}