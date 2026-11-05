import PageHero from "@/components/PageHero";
import { ServicesSection, ProcessSection, CapabilitiesSection, SupportSection, CtaSection } from "@/components/Sections";
import { pageMetadata, resolve, type PageParams } from "@/lib/page";

export const generateMetadata = pageMetadata("services");

export default async function ServicesPage(props: PageParams) {
  const { t, lang } = await resolve(props);
  return (
    <main>
      <PageHero
        title={t.pages.services.title}
        text={t.pages.services.text}
        image="/images/laser-3.jpg"
        homeHref={`/${lang}`}
        homeLabel={t.pages.home}
      />
      <ServicesSection t={t} lang={lang} />
      <ProcessSection t={t} lang={lang} />
      <CapabilitiesSection t={t} lang={lang} />
      <SupportSection t={t} lang={lang} />
      <CtaSection t={t} lang={lang} />
    </main>
  );
}
