import PageHero from "@/components/PageHero";
import { PoliciesSection, ValuesSection, CtaSection } from "@/components/Sections";
import { pageMetadata, resolve, type PageParams } from "@/lib/page";

export const generateMetadata = pageMetadata("policies");

export default async function PoliciesPage(props: PageParams) {
  const { t, lang } = await resolve(props);
  return (
    <main>
      <PageHero
        title={t.pages.policies.title}
        text={t.pages.policies.text}
        image="/images/weld-3.jpg"
        homeHref={`/${lang}`}
        homeLabel={t.pages.home}
      />
      <PoliciesSection t={t} lang={lang} />
      <ValuesSection t={t} lang={lang} />
      <CtaSection t={t} lang={lang} />
    </main>
  );
}
