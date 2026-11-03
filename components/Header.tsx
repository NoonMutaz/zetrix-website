"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/content";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Header({ t, lang }: { t: Dictionary["nav"]; lang: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: t.about },
    { href: "#facility", label: t.facility },
    { href: "#services", label: t.services },
    { href: "#process", label: t.process },
    { href: "#policies", label: t.policies },
    { href: "#projects", label: t.projects },
    { href: "#contact", label: t.contact },
  ];
  const other = lang === "en" ? "ar" : "en";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-navy-950/95 shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.jpg"
            alt="ZETRIX"
            width={44}
            height={51}
            className="h-11 w-auto rounded-md"
            priority
          />
          <span className="text-gold-gradient text-xl font-extrabold tracking-[0.18em]">
            ZETRIX
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-gold-400"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={`/${other}`}
            className="rounded-full border border-white/25 px-3 py-1.5 text-sm text-white transition-colors hover:border-gold-400 hover:text-gold-400"
          >
            {t.switchLang}
          </Link>
          <a
            href="#contact"
            className="hidden rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-300 sm:inline-block"
          >
            {t.cta}
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-white lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-white/10 px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base text-white/85 hover:text-gold-400"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-gold-400 px-5 py-3 text-center font-semibold text-navy-950"
            >
              {t.cta}
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
