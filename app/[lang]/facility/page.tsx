import PageHero from "@/components/PageHero";
import { CtaSection, FacilitySection, TourSection } from "@/components/Sections";
import { pageMetadata, resolve, type PageParams } from "@/lib/page";

export const generateMetadata = pageMetadata("facility");

export default async function FacilityPage(props: PageParams) {
  const { t, lang } = await resolve(props);
  return (
    <main>
      <PageHero
        title={t.pages.facility.title}
        text={t.pages.facility.text}
        image="/images/facility-front.jpg"
        homeHref={`/${lang}`}
        homeLabel={t.pages.home}
      />
      <TourSection t={t} lang={lang} />
      <FacilitySection t={t} lang={lang} />
      <CtaSection t={t} lang={lang} />
    </main>
  );
}
