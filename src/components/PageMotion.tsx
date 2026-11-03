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

      .sj-scroll-object {
        position: fixed;
        z-index: 2;
        top: 50%;
        right: clamp(22px, 6vw, 100px);
        width: clamp(230px, 26vw, 390px);
        aspect-ratio: 1;
        pointer-events: none;
        opacity: .78;
        perspective: 1200px;
        transform: translate3d(0, -50%, 0);
        mix-blend-mode: screen;
        filter: drop-shadow(0 28px 36px rgba(0,0,0,.35));
      }
      .sj-scroll-object__body {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        transform:
          perspective(1200px)
          rotateX(calc(56deg + var(--sj-object-tilt-x, 0deg)))
          rotateY(var(--sj-object-tilt-y, 0deg))
          rotateZ(var(--sj-object-scroll-rotation, 0deg))
          translateY(var(--sj-object-scroll-y, 0px))
          scale(var(--sj-object-scroll-scale, 1));
        transition: transform 150ms cubic-bezier(.2,.7,.2,1);
      }
      .sj-scroll-object__float {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        animation: sjObjectFloat 6.5s ease-in-out infinite;
      }
      .sj-scroll-object__base {
        position: absolute;
        inset: 7%;
        border-radius: 50%;
        background:
          radial-gradient(circle at 32% 24%, rgba(255,255,255,.18), transparent 16%),
          radial-gradient(circle at 50% 50%, #34302a 0 34%, #11100e 67%, #050505 100%);
        border: 1px solid rgba(219,188,153,.46);
        box-shadow:
          0 0 0 4px rgba(0,0,0,.78),
          0 0 0 7px rgba(172,139,105,.18),
          inset 0 2px 7px rgba(255,255,255,.18),
          inset 0 -16px 30px rgba(0,0,0,.95),
          0 18px 50px rgba(0,0,0,.6);
        transform: translateZ(4px);
      }
      .sj-scroll-object__ring {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
      }
      .sj-scroll-object__ring--outer {
        inset: 2%;
        border: 8px solid transparent;
        background:
          linear-gradient(#171512,#171512) padding-box,
          conic-gradient(from 15deg, #5b4a3a, #e1c09a, #51483e, #b58e67, #28231e, #ddbd98, #5b4a3a) border-box;
        box-shadow:
          0 0 0 1px rgba(255,225,193,.28),
          inset 0 0 10px rgba(0,0,0,.9),
          0 5px 15px rgba(0,0,0,.6);
        transform: translateZ(22px);
      }
      .sj-scroll-object__ring--middle {
        inset: 13%;
        border: 2px solid rgba(219,187,151,.78);
        box-shadow:
          0 0 0 5px rgba(0,0,0,.72),
          inset 0 0 0 2px rgba(255,255,255,.07),
          0 0 22px rgba(185,145,105,.2);
        transform: translateZ(39px);
      }
      .sj-scroll-object__ring--inner {
        inset: 22%;
        border: 1px solid rgba(255,232,207,.6);
        box-shadow: inset 0 0 10px rgba(255,255,255,.12), 0 0 13px rgba(0,0,0,.85);
        transform: translateZ(51px);
        animation: sjObjectRing 26s linear infinite;
      }
      .sj-scroll-object__iris {
        position: absolute;
        inset: 25%;
        border-radius: 50%;
        border: 1px solid rgba(206,170,135,.68);
        background:
          conic-gradient(from 8deg,
            #1b1916 0deg 28deg, #8a6c4e 29deg 39deg,
            #171512 40deg 72deg, #c09b71 73deg 83deg,
            #171512 84deg 117deg, #75583d 118deg 130deg,
            #171512 131deg 162deg, #b58b62 163deg 174deg,
            #171512 175deg 207deg, #8a694b 208deg 220deg,
            #171512 221deg 252deg, #c09b71 253deg 264deg,
            #171512 265deg 296deg, #75583d 297deg 309deg,
            #171512 310deg 359deg);
        box-shadow: inset 0 0 24px #000, 0 0 18px rgba(0,0,0,.85);
        transform: translateZ(58px);
      }
      .sj-scroll-object__iris::before {
        content: "";
        position: absolute;
        inset: 14%;
        border: 1px solid rgba(244,218,188,.32);
        border-radius: 50%;
        background: conic-gradient(from 35deg, rgba(255,255,255,.15), transparent 24%, rgba(0,0,0,.72) 50%, transparent 76%, rgba(255,255,255,.1));
        box-shadow: inset 0 0 18px #000;
      }
      .sj-scroll-object__lens {
        position: absolute;
        inset: 35%;
        border-radius: 50%;
        border: 1px solid rgba(237,216,190,.88);
        background:
          radial-gradient(circle at 34% 27%, rgba(255,255,255,.82), rgba(255,255,255,.14) 6%, transparent 20%),
          radial-gradient(circle at 63% 68%, rgba(150,111,75,.26), transparent 43%),
          radial-gradient(circle at 50% 50%, #202627 0, #0a0c0d 58%, #020303 100%);
        box-shadow:
          inset 0 0 0 4px rgba(0,0,0,.74),
          inset 0 0 27px rgba(177,143,110,.2),
          0 0 18px rgba(0,0,0,.94);
        transform: translateZ(72px);
      }
      .sj-scroll-object__lens::after {
        content: "";
        position: absolute;
        inset: 10%;
        border-top: 1px solid rgba(255,255,255,.5);
        border-radius: 50%;
        transform: rotate(-28deg);
      }
      .sj-scroll-object__orbit {
        position: absolute;
        inset: -5% -12%;
        border: 1px solid rgba(216,187,154,.24);
        border-radius: 50%;
        transform-style: preserve-3d;
      }
      .sj-scroll-object__orbit--one {
        transform: rotateX(75deg) rotateZ(-24deg) translateZ(12px);
      }
      .sj-scroll-object__orbit--two {
        inset: -12% -3%;
        border-color: rgba(255,255,255,.14);
        transform: rotateX(69deg) rotateZ(34deg) translateZ(-9px);
      }
      .sj-scroll-object__index {
        position: absolute;
        top: 5%;
        left: 50%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #e1c09a;
        box-shadow: 0 0 13px rgba(225,192,154,.9);
        transform: translateX(-50%) translateZ(65px);
      }
      @keyframes sjObjectFloat {
        0%,100% { transform: translateY(-7px); }
        50% { transform: translateY(8px); }
      }
      @keyframes sjObjectRing {
        from { transform: translateZ(51px) rotateZ(0deg); }
        to { transform: translateZ(51px) rotateZ(360deg); }
      }
      @media (max-width: 700px) {
        .sj-scroll-object {
          width: 145px;
          right: -22px;
          opacity: .28;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .sj-scroll-object, .sj-scroll-object * {
          animation: none !important;
          transition: none !important;
        }
      }
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

    const homeForObject = document.querySelector(".home");
    let scrollObject: HTMLDivElement | null = null;

    if (homeForObject) {
      scrollObject = document.createElement("div");
      scrollObject.className = "sj-scroll-object";
      scrollObject.setAttribute("aria-hidden", "true");
      scrollObject.innerHTML = `
        <div class="sj-scroll-object__body">
          <div class="sj-scroll-object__float">
            <div class="sj-scroll-object__base"></div>
            <div class="sj-scroll-object__ring sj-scroll-object__ring--outer"></div>
            <div class="sj-scroll-object__ring sj-scroll-object__ring--middle"></div>
            <div class="sj-scroll-object__ring sj-scroll-object__ring--inner"></div>
            <div class="sj-scroll-object__iris"></div>
            <div class="sj-scroll-object__lens"></div>
            <div class="sj-scroll-object__orbit sj-scroll-object__orbit--one"></div>
            <div class="sj-scroll-object__orbit sj-scroll-object__orbit--two"></div>
            <div class="sj-scroll-object__index"></div>
          </div>
        </div>
      `;
      document.body.appendChild(scrollObject);
    }


    let scrollFrame = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value));

    const updateScrollDepth = () => {
      scrollFrame = 0;
      const scrollY = window.scrollY;

      if (scrollObject) {
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const progress = clamp(scrollY / maxScroll, 0, 1);
        const rotation = 24 + progress * 540;
        const lift = Math.sin(progress * Math.PI * 2) * 30;
        const scale = 0.92 + Math.sin(progress * Math.PI) * 0.12;

        scrollObject.style.setProperty("--sj-object-scroll-rotation", `${rotation.toFixed(2)}deg`);
        scrollObject.style.setProperty("--sj-object-scroll-y", `${lift.toFixed(2)}px`);
        scrollObject.style.setProperty("--sj-object-scroll-scale", scale.toFixed(3));
      }

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

    const onObjectPointerMove = (event: PointerEvent) => {
      if (!scrollObject || event.pointerType === "touch" || window.innerWidth <= 700) return;

      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      scrollObject.style.setProperty("--sj-object-tilt-x", `${(-y * 11).toFixed(2)}deg`);
      scrollObject.style.setProperty("--sj-object-tilt-y", `${(x * 13).toFixed(2)}deg`);
    };

    const onObjectPointerLeave = () => {
      scrollObject?.style.setProperty("--sj-object-tilt-x", "0deg");
      scrollObject?.style.setProperty("--sj-object-tilt-y", "0deg");
    };

    window.addEventListener("pointermove", onObjectPointerMove, { passive: true });
    window.addEventListener("pointerleave", onObjectPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollDepth();

    return () => {
      window.removeEventListener("pointermove", onObjectPointerMove);
      window.removeEventListener("pointerleave", onObjectPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      [
        "--sj-object-scroll-rotation",
        "--sj-object-scroll-y",
        "--sj-object-scroll-scale",
        "--sj-object-tilt-x",
        "--sj-object-tilt-y"
      ].forEach((property) => scrollObject?.style.removeProperty(property));
      scrollObject?.remove();
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