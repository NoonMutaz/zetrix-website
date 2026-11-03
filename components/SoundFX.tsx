"use client";

import { useEffect, useRef, useState } from "react";
import { SoundOffIcon, SoundOnIcon } from "./Icons";

/**
 * Light UI sound effects, synthesized with the Web Audio API (no audio files).
 * - Soft metallic "ting" when clicking a link or button.
 * - Very quiet tick when hovering buttons and navigation links (mouse only).
 * Visitors can mute it with the floating button; the choice is remembered.
 */

const STORAGE_KEY = "zetrix-sound";
const HOVER_SELECTOR = "header a, a.rounded-full, button";

export default function SoundFX({ labels }: { labels: { soundOn: string; soundOff: string } }) {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastHover = useRef<Element | null>(null);
  const lastHoverTime = useRef(0);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "off") {
        setEnabled(false);
        enabledRef.current = false;
      }
    } catch {}
  }, []);

  useEffect(() => {
    const getCtx = () => {
      if (!ctxRef.current) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return null;
        ctxRef.current = new AC();
      }
      if (ctxRef.current.state === "suspended") ctxRef.current.resume();
      return ctxRef.current;
    };

    const tone = (ctx: AudioContext, freq: number, start: number, dur: number, peak: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.02);
    };

    // Soft metallic ting: a fundamental plus inharmonic partials, like light metal being tapped.
    const playClick = () => {
      if (!enabledRef.current) return;
      const ctx = getCtx();
      if (!ctx) return;
      const t = ctx.currentTime;
      tone(ctx, 1320, t, 0.32, 0.05);
      tone(ctx, 1980 * 1.01, t, 0.22, 0.022);
      tone(ctx, 3560, t, 0.12, 0.01);
    };

    const playHover = () => {
      if (!enabledRef.current || !ctxRef.current) return; // only after the first click unlocks audio
      const ctx = ctxRef.current;
      if (ctx.state !== "running") return;
      tone(ctx, 2400, ctx.currentTime, 0.05, 0.008);
    };

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button");
      if (el && !el.hasAttribute("data-no-sound")) playClick();
    };

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest?.(HOVER_SELECTOR);
      if (!el || el === lastHover.current) return;
      lastHover.current = el;
      const now = performance.now();
      if (now - lastHoverTime.current < 90) return;
      lastHoverTime.current = now;
      playHover();
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(HOVER_SELECTOR);
      if (el && el === lastHover.current && !el.contains(e.relatedTarget as Node | null)) {
        lastHover.current = null;
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    // expose for the toggle button
    (window as unknown as { __zetrixTing?: () => void }).__zetrixTing = playClick;
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    enabledRef.current = next;
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    if (next) (window as unknown as { __zetrixTing?: () => void }).__zetrixTing?.();
  };

  const label = enabled ? labels.soundOff : labels.soundOn;

  return (
    <button
      type="button"
      data-no-sound
      onClick={toggle}
      aria-label={label}
      aria-pressed={enabled}
      title={label}
      className="fixed bottom-5 start-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-gold-400/40 bg-navy-950/90 text-gold-400 shadow-lg backdrop-blur transition-colors hover:bg-navy-800"
    >
      {enabled ? <SoundOnIcon className="h-5 w-5" /> : <SoundOffIcon className="h-5 w-5" />}
    </button>
  );
}
