import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PolicyTabs from "@/components/PolicyTabs";
import {
  ArrowIcon,
  BadgeIcon,
  CheckIcon,
  ClockIcon,
  GearIcon,
  GlobeIcon,
  HandshakeIcon,
  HeadsetIcon,
  HeartIcon,
  HomeIcon,
  LeafIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  RecycleIcon,
  ShieldIcon,
  SparkIcon,
  StarIcon,
  TargetIcon,
  TruckIcon,
  UsersIcon,
  WrenchIcon,
} from "@/components/Icons";
import { contact, dictionaries, isLocale } from "@/lib/content";

const valueIcons = [ShieldIcon, StarIcon, HandshakeIcon, TargetIcon, SparkIcon];
const whyIcons = [GearIcon, UsersIcon, ClockIcon, BadgeIcon];
const supportIcons = [TruckIcon, WrenchIcon, ShieldIcon, HeadsetIcon];
const sustainIcons = [RecycleIcon, LeafIcon, HomeIcon, HeartIcon];

function Heading({
  eyebrow,
  title,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-500">{eyebrow}</p>
      <h2
        className={`mt-3 text-3xl font-extrabold leading-tight sm:text-4xl ${
          dark ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      <span className={`mt-5 block h-1 w-16 rounded bg-gold-400 ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dictionaries[lang];

  return (
    <>
      <Header t={t.nav} lang={lang} />

      <main id="top">
        {/* Hero */}
        <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950">
          <Image
            src="/images/weld-2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="hero-overlay absolute inset-0 -z-10" />
          <div className="grid-lines absolute inset-0 -z-10" />

          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-sm font-semibold text-gold-300">
                <span className="h-2 w-2 rounded-full bg-gold-400" />
                {t.hero.eyebrow}
              </p>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                <span className="text-gold-gradient">{t.hero.title}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{t.hero.text}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-300"
                >
                  {t.hero.primary}
                  <ArrowIcon className="h-5 w-5 rtl:rotate-180" />
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-400"
                >
                  {t.hero.secondary}
                </a>
              </div>
              <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
                {t.hero.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckIcon className="h-4 w-4 text-gold-400" />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-gold-400/20 blur-3xl" />
                <Image
                  src="/images/logo.jpg"
                  alt="ZETRIX Metal Industries logo"
                  width={380}
                  height={440}
                  className="relative rounded-3xl shadow-2xl ring-1 ring-gold-400/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Heading eyebrow={t.about.eyebrow} title={t.about.title} />
              <p className="mt-8 text-lg leading-relaxed text-steel-600">{t.about.text}</p>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {[t.about.vision, t.about.mission].map((b, i) => (
                  <div key={b.title} className="rounded-2xl border border-steel-100 bg-steel-50 p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-gold-400">
                        {i === 0 ? <TargetIcon className="h-5 w-5" /> : <SparkIcon className="h-5 w-5" />}
                      </span>
                      <h3 className="text-lg font-bold">{b.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-steel-600">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 self-center">
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl">
                <Image src="/images/steel-1.jpg" alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/laser-1.jpg" alt="" fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src="/images/alu-2.jpg" alt="" fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-steel-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.values.eyebrow} title={t.values.title} center />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {t.values.items.map((v, i) => {
                const Icon = valueIcons[i];
                return (
                  <div
                    key={v.title}
                    className="group rounded-2xl border border-steel-100 bg-white p-6 transition-shadow hover:shadow-xl"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-400 group-hover:text-navy-950">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-steel-600">{v.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="relative overflow-hidden bg-navy-900 py-24">
          <div className="grid-lines absolute inset-0" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.why.eyebrow} title={t.why.title} dark />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.why.items.map((w, i) => {
                const Icon = whyIcons[i];
                return (
                  <div key={w.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                    <div className="flex items-center justify-between">
                      <Icon className="h-9 w-9 text-gold-400" />
                      <span className="text-4xl font-extrabold text-white/10">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-white">{w.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{w.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.services.eyebrow} title={t.services.title} />
            <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {t.services.items.map((s) => (
                <article
                  key={s.id}
                  id={s.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-steel-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                    <h3 className="absolute bottom-4 start-5 end-5 text-xl font-bold text-white">{s.title}</h3>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-semibold text-navy-800">{s.short}</p>
                    <p className="mt-3 text-sm leading-relaxed text-steel-600">{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-steel-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.process.eyebrow} title={t.process.title} center />
            <ol className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
              <span className="absolute inset-x-[8%] top-8 hidden h-0.5 bg-gradient-to-r from-gold-400/20 via-gold-400 to-gold-400/20 lg:block" />
              {t.process.steps.map((step, i) => (
                <li key={step} className="relative flex flex-col items-center text-center">
                  <span className="relative grid h-16 w-16 place-items-center rounded-full border-4 border-steel-50 bg-navy-900 text-xl font-extrabold text-gold-400 shadow-lg">
                    0{i + 1}
                  </span>
                  <p className="mt-4 font-bold text-navy-900">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Capabilities */}
        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Heading eyebrow={t.capabilities.eyebrow} title={t.capabilities.title} />
              <p className="mt-8 text-lg text-steel-600">{t.capabilities.text}</p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {t.capabilities.items.map((c) => (
                  <li key={c} className="flex items-center gap-3 rounded-xl border border-steel-100 bg-steel-50 px-4 py-3.5 font-medium">
                    <GearIcon className="h-5 w-5 shrink-0 text-gold-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
              <div className="relative -mx-8 -mt-8 mb-8 aspect-[16/8] overflow-hidden rounded-t-2xl sm:-mx-10 sm:-mt-10">
                <Image src="/images/laser-3.jpg" alt="" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gold-gradient">{t.capabilities.materialsTitle}</h3>
              <ul className="mt-6 space-y-4">
                {t.capabilities.materials.map((m) => (
                  <li key={m} className="flex gap-3 text-white/80">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section id="policies" className="relative overflow-hidden bg-navy-950 py-24">
          <div className="grid-lines absolute inset-0" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.policies.eyebrow} title={t.policies.title} dark />
            <div className="mt-12">
              <PolicyTabs tabs={t.policies.tabs} />
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.team.eyebrow} title={t.team.title} />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.team.groups.map((g) => (
                <div key={g.title} className="rounded-2xl border-t-4 border-gold-400 bg-steel-50 p-6">
                  <UsersIcon className="h-8 w-8 text-navy-700" />
                  <h3 className="mt-4 text-lg font-bold">{g.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-600">{g.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-14 rounded-2xl border border-steel-100 p-8">
              <p className="text-center text-sm font-bold uppercase tracking-[0.15em] text-steel-400">
                {t.team.departmentsTitle}
              </p>
              <ul className="mt-6 flex flex-wrap justify-center gap-3">
                {t.team.departments.map((d) => (
                  <li key={d} className="rounded-full bg-navy-900 px-5 py-2 text-sm font-semibold text-white">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="bg-steel-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.projects.eyebrow} title={t.projects.title} />
            <div className="mt-14 grid gap-7 md:grid-cols-3">
              {t.projects.items.map((p) => (
                <figure key={p.title} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm text-white/75">{p.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership & clients */}
        <section className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
            <div>
              <Heading eyebrow={t.partnership.eyebrow} title={t.partnership.title} />
              <p className="mt-8 text-lg leading-relaxed text-steel-600">{t.partnership.text}</p>
              <ul className="mt-8 space-y-4">
                {t.partnership.points.map((p) => (
                  <li key={p} className="flex gap-3 font-medium">
                    <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-center rounded-2xl bg-navy-900 p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-white">{t.partnership.clientsTitle}</h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {t.partnership.clients.map((c) => (
                  <li key={c} className="rounded-xl border border-gold-400/30 bg-white/[0.04] px-4 py-5 text-center font-semibold text-gold-300">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="bg-steel-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.roadmap.eyebrow} title={t.roadmap.title} center />
            <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.roadmap.steps.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl bg-white p-7 shadow-sm">
                  <span className="text-sm font-bold text-gold-500">0{i + 1}</span>
                  <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-steel-600">{s.text}</p>
                  <span className="absolute inset-x-7 bottom-0 h-1 rounded-t bg-gradient-to-r from-navy-700 to-gold-400" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Support */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Heading eyebrow={t.support.eyebrow} title={t.support.title} />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.support.items.map((s, i) => {
                const Icon = supportIcons[i];
                return (
                  <div key={s.title} className="flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-gold-500">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-steel-600">{s.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* People & community */}
        <section className="relative overflow-hidden bg-navy-900 py-24">
          <div className="grid-lines absolute inset-0" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Heading eyebrow={t.people.eyebrow} title={t.people.title} dark />
              <ul className="mt-10 space-y-5">
                {t.people.training.map((item) => (
                  <li key={item} className="flex gap-3 text-white/80">
                    <BadgeIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.people.sustainability.map((s, i) => {
                const Icon = sustainIcons[i];
                return (
                  <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <Icon className="h-8 w-8 text-gold-400" />
                    <h3 className="mt-4 font-bold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="relative isolate overflow-hidden py-28">
          <Image src="/images/laser-2.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-navy-950/85" />
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-xl leading-relaxed text-white/85 sm:text-2xl">{t.closing.text}</p>
            <p className="text-gold-gradient mt-8 text-3xl font-extrabold sm:text-4xl">
              ZETRIX. {t.closing.tagline}
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Heading eyebrow={t.contactSection.eyebrow} title={t.contactSection.title} />
              <p className="mt-8 text-lg text-steel-600">{t.contactSection.text}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-navy-700"
                >
                  <MailIcon className="h-5 w-5" />
                  {t.contactSection.emailCta}
                </a>
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-gold-300"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {t.contactSection.callCta}
                </a>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: PhoneIcon, label: t.contactSection.phone, value: contact.phone, href: contact.phoneHref, ltr: true },
                { icon: MailIcon, label: t.contactSection.email, value: contact.email, href: `mailto:${contact.email}`, ltr: true },
                { icon: GlobeIcon, label: t.contactSection.website, value: contact.website, href: `https://${contact.website}`, ltr: true },
                { icon: PinIcon, label: t.contactSection.address, value: t.contactSection.addressValue },
              ].map(({ icon: Icon, label, value, href, ltr }) => (
                <li key={label} className="rounded-2xl border border-steel-100 bg-steel-50 p-6">
                  <Icon className="h-7 w-7 text-gold-500" />
                  <p className="mt-4 text-sm text-steel-400">{label}</p>
                  {href ? (
                    <a href={href} dir={ltr ? "ltr" : undefined} className="mt-1 block break-words font-bold text-navy-900 hover:text-gold-500">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 font-bold text-navy-900">{value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-navy-950 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpg" alt="" width={32} height={37} className="h-8 w-auto rounded" />
            <span className="font-semibold text-white/80">{t.hero.eyebrow}</span>
          </div>
          <p>
            © {new Date().getFullYear()} ZETRIX. {t.footer.rights}
          </p>
        </div>
      </footer>
    </>
  );
}
