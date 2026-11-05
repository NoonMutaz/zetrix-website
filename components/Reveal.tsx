"use client";

import { useEffect } from "react";

/**
 * Fades and slides each section's content into view as the visitor scrolls.
 * Content stays fully visible if JavaScript is off or the user prefers reduced motion.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("main > section:not(:first-child) > div[class*='max-w']"),
    );
    const root = document.documentElement;
    targets.forEach((el) => {
      // anything already on screen stays visible without animating
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      el.classList.add("reveal");
    });
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
