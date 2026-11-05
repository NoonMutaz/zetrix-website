import Image from "next/image";
import Link from "next/link";

/** Banner at the top of each inner page: background photo, moving grid, title and breadcrumb. */
export default function PageHero({
  title,
  text,
  image,
  homeHref,
  homeLabel,
}: {
  title: string;
  text: string;
  image: string;
  homeHref: string;
  homeLabel: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-40 sm:pb-24 sm:pt-44">
      <Image src={image} alt="" fill priority sizes="100vw" className="page-hero-img -z-20 object-cover" />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="grid-lines absolute inset-0 -z-10" />
      <div className="hero-glow absolute -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
          <Link href={homeHref} className="transition-colors hover:text-gold-400">
            {homeLabel}
          </Link>
          <span className="text-gold-400">/</span>
          <span className="text-white/85">{title}</span>
        </nav>
        <h1 className="text-gold-gradient mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{text}</p>
        <span className="mt-8 block h-1 w-24 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500" />
      </div>
    </section>
  );
}
