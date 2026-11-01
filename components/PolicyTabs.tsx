"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/content";
import { CheckIcon } from "./Icons";

export default function PolicyTabs({ tabs }: { tabs: Dictionary["policies"]["tabs"] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.title}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              i === active
                ? "bg-gold-400 text-navy-950"
                : "border border-white/15 text-white/75 hover:border-gold-400 hover:text-gold-400"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className="text-lg text-white/85">{tab.intro}</p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {tab.items.map((item) => (
            <li key={item} className="flex gap-3 text-white/75">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 border-s-2 border-gold-400 ps-4 italic text-gold-300">{tab.closing}</p>
      </div>
    </div>
  );
}
