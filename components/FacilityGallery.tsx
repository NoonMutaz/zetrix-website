"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowIcon, CloseIcon } from "./Icons";

type Item = { src: string; caption: string };

// bento layout: first image large, the rest fill around it
const spans = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "",
  "",
  "md:col-span-4",
];

export default function FacilityGallery({
  items,
  labels,
}: {
  items: Item[];
  labels: { close: string; prev: string; next: string };
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const rtl = document.documentElement.dir === "rtl";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 md:grid-cols-4 lg:auto-rows-[240px]">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-2xl text-start ${spans[i] ?? ""}`}
          >
            <Image
              src={it.src}
              alt={it.caption}
              fill
              sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 100vw"}
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${i === items.length - 1 ? "object-[50%_72%]" : ""}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-4 start-5 end-5 flex items-center gap-2 font-bold text-white">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gold-400" />
              {it.caption}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[open].caption}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur"
          onClick={close}
        >
          <button
            type="button"
            aria-label={labels.close}
            onClick={close}
            className="absolute end-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white hover:border-gold-400 hover:text-gold-400"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          <figure className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
              <Image src={items[open].src} alt={items[open].caption} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center font-semibold text-gold-300">
              {items[open].caption}
              <span className="ms-3 inline-block text-sm text-white/50" dir="ltr">
                {`${open + 1} / ${items.length}`}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label={labels.prev}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute start-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-navy-950"
          >
            <ArrowIcon className="h-6 w-6 rotate-180 rtl:rotate-0" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute end-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-navy-950"
          >
            <ArrowIcon className="h-6 w-6 rtl:rotate-180" />
          </button>
        </div>
      )}
    </>
  );
}
