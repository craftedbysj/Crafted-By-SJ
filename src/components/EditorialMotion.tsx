"use client";

import { useEffect } from "react";

const DISCIPLINES = [
  "VIDEO EDITING",
  "MOTION DESIGN",
  "VISUAL ART",
  "CREATIVE DIRECTION",
  "STORYTELLING",
];

function createMarquee(after: Element): HTMLElement {
  const section = document.createElement("section");
  section.className = "editorial-marquee";
  section.setAttribute("aria-label", "Creative disciplines");

  const track = document.createElement("div");
  track.className = "editorial-marquee__track";

  for (let copy = 0; copy < 2; copy += 1) {
    const group = document.createElement("div");
    group.className = "editorial-marquee__group";
    if (copy === 1) group.setAttribute("aria-hidden", "true");

    DISCIPLINES.forEach((discipline) => {
      const word = document.createElement("span");
      word.className = "editorial-marquee__word";
      word.textContent = discipline;
      group.append(word);

      const separator = document.createElement("i");
      separator.className = "editorial-marquee__separator";
      separator.setAttribute("aria-hidden", "true");
      group.append(separator);
    });

    track.append(group);
  }

  section.append(track);
  after.insertAdjacentElement("afterend", section);
  return section;
}

function wrapHeadingLines(heading: HTMLElement) {
  if (heading.dataset.editorialLines === "true") return;

  const sourceNodes = Array.from(heading.childNodes);
  const lines: Node[][] = [[]];

  sourceNodes.forEach((node) => {
    if (node instanceof HTMLBRElement) {
      lines.push([]);
    } else {
      lines[lines.length - 1].push(node);
    }
  });

  const fragment = document.createDocumentFragment();
  lines.forEach((nodes, index) => {
    const line = document.createElement("span");
    line.className = "editorial-heading-line";
    const inner = document.createElement("span");
    inner.className = "editorial-heading-line__inner";
    nodes.forEach((node) => inner.append(node));
    line.append(inner);
    fragment.append(line);
    if (index < lines.length - 1) line.dataset.line = String(index + 1);
  });

  heading.replaceChildren(fragment);
  heading.dataset.editorialLines = "true";
  heading.classList.add("editorial-heading");
}

export default function EditorialMotion() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>(".home");
    if (!home || home.dataset.editorialMotion === "true") return;
    home.dataset.editorialMotion = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heroFooter = home.querySelector(".hero-footer");
    const marquee = heroFooter ? createMarquee(heroFooter) : null;

    const headings = home.querySelectorAll<HTMLElement>(
      ".hero h1, .section h2, .contact-section h2"
    );
    headings.forEach(wrapHeadingLines);

    const revealTargets = home.querySelectorAll<HTMLElement>(
      ".section-heading, .resource-item, .work-empty, .about-meta, .contact-links, .site-footer"
    );
    revealTargets.forEach((target, index) => {
      target.classList.add("editorial-reveal");
      target.style.setProperty("--editorial-stagger", `${(index % 4) * 90}ms`);
    });

    const showHero = () => {
      document.body.classList.add("editorial-motion-ready");
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          home.querySelector(".hero h1")?.classList.add("editorial-heading--visible");
        });
      });
    };

    let openingObserver: MutationObserver | undefined;
    let openingFallback = 0;
    if (reducedMotion) {
      document.body.classList.add("editorial-motion-ready", "editorial-reduced-motion");
      home.querySelectorAll(".editorial-heading").forEach((heading) => {
        heading.classList.add("editorial-heading--visible");
      });
    } else if (document.querySelector(".sj-opening")) {
      openingObserver = new MutationObserver(() => {
        if (!document.querySelector(".sj-opening")) {
          showHero();
          openingObserver?.disconnect();
          window.clearTimeout(openingFallback);
        }
      });
      openingObserver.observe(document.body, { childList: true, subtree: true });
      openingFallback = window.setTimeout(() => {
        showHero();
        openingObserver?.disconnect();
      }, 4300);
    } else {
      showHero();
    }

    let intersectionObserver: IntersectionObserver | undefined;
    if (!reducedMotion && "IntersectionObserver" in window) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            target.classList.add("is-in-view");
            target.querySelectorAll(".editorial-heading").forEach((heading) => {
              heading.classList.add("editorial-heading--visible");
            });
            intersectionObserver?.unobserve(target);
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
      );
      revealTargets.forEach((target) => intersectionObserver?.observe(target));
      const sectionHeadings = home.querySelectorAll<HTMLElement>(".section-heading h2, .contact-section h2");
      sectionHeadings.forEach((heading) => {
        const section = heading.closest(".section-heading, .contact-section");
        if (section) intersectionObserver?.observe(section);
      });
    } else {
      revealTargets.forEach((target) => target.classList.add("is-in-view"));
      home.querySelectorAll(".editorial-heading").forEach((heading) => {
        heading.classList.add("editorial-heading--visible");
      });
    }

    return () => {
      openingObserver?.disconnect();
      window.clearTimeout(openingFallback);
      intersectionObserver?.disconnect();
      marquee?.remove();
      document.body.classList.remove("editorial-motion-ready", "editorial-reduced-motion");
      home.removeAttribute("data-editorial-motion");
    };
  }, []);

  return null;
}
