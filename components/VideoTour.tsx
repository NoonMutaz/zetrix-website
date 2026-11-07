"use client";

import { useRef, useState } from "react";

/**
 * Facility virtual-tour video. Loads only when the visitor presses play, and pauses the
 * site's background music while it plays (the video has its own soundtrack).
 */
export default function VideoTour({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const music = (on: boolean) => window.dispatchEvent(new CustomEvent("zetrix-music", { detail: on }));

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold-400/30 bg-navy-950 shadow-[0_40px_80px_-30px_rgba(14,29,58,0.6)]">
      <video
        ref={ref}
        className="aspect-video w-full"
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        onPlay={() => music(false)}
        onPause={() => music(true)}
        onEnded={() => music(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!started && (
        <button
          type="button"
          data-no-sound
          onClick={start}
          aria-label={label}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-navy-950/25 transition-colors hover:bg-navy-950/10"
        >
          <span className="relative grid h-24 w-24 place-items-center rounded-full bg-gold-400 text-navy-950 shadow-[0_0_0_12px_rgba(226,185,86,0.25)] transition-transform group-hover:scale-110">
            <span className="wa-ping absolute inset-0 rounded-full bg-gold-400" aria-hidden />
            <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-10 w-10 translate-x-0.5" aria-hidden>
              <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
            </svg>
          </span>
          <span className="rounded-full bg-navy-950/70 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
            {label}
          </span>
        </button>
      )}
    </div>
  );
}
