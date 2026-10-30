"use client";

import { useEffect } from "react";

export default function LiquidGlass() {
  useEffect(() => {
    const selectors = [
      "header",
      "nav",
      ".resource-item",
      ".contact-links a",
      ".hero-footer",
      ".site-footer",
      "button",
      ".btn",
      ".button"
    ];

    const elements = new Set<HTMLElement>();

    selectors.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        elements.add(element);
      });
    });

    elements.forEach((element) => {
      element.classList.add("liquid-glass");
    });

    let frame = 0;
    let activeElement: HTMLElement | null = null;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const target = event.target as HTMLElement | null;
      const glass = target?.closest<HTMLElement>(".liquid-glass") ?? null;

      if (!glass || !elements.has(glass)) {
        if (activeElement) {
          activeElement.style.setProperty("--glass-x", "50%");
          activeElement.style.setProperty("--glass-y", "50%");
          activeElement = null;
        }
        return;
      }

      activeElement = glass;

      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const rect = glass.getBoundingClientRect();

        if (!rect.width || !rect.height) return;

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        glass.style.setProperty(
          "--glass-x",
          `${Math.max(0, Math.min(100, x))}%`
        );

        glass.style.setProperty(
          "--glass-y",
          `${Math.max(0, Math.min(100, y))}%`
        );
      });
    };

    const handlePointerLeave = () => {
      if (activeElement) {
        activeElement.style.setProperty("--glass-x", "50%");
        activeElement.style.setProperty("--glass-y", "50%");
        activeElement = null;
      }
    };

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true
    });

    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);

      elements.forEach((element) => {
        element.classList.remove("liquid-glass");
        element.style.removeProperty("--glass-x");
        element.style.removeProperty("--glass-y");
      });
    };
  }, []);

  return null;
}