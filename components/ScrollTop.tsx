"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./Icons";

/** Centered "back to top" arrow that appears once the visitor scrolls down. */
export default function ScrollTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(window.scrollY > 500);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const r = 25;
  const c = 2 * Math.PI * r;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 left-1/2 z-50 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-[0_8px_30px_rgba(226,185,86,0.45)] transition-all duration-300 hover:bg-gold-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(7,15,32,0.15)" strokeWidth="3" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#070f20"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <ArrowUpIcon className="arrow-bob relative h-6 w-6" />
    </button>
  );
}
