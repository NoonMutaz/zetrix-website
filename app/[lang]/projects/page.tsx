import PageHero from "@/components/PageHero";
import { ProjectsSection, PartnershipSection, CtaSection } from "@/components/Sections";
import { pageMetadata, resolve, type PageParams } from "@/lib/page";

export const generateMetadata = pageMetadata("projects");

export default async function ProjectsPage(props: PageParams) {
  const { t, lang } = await resolve(props);
  return (
    <main>
      <PageHero
        title={t.pages.projects.title}
        text={t.pages.projects.text}
        image="/images/prefab-1.jpg"
        homeHref={`/${lang}`}
        homeLabel={t.pages.home}
      />
      <ProjectsSection t={t} lang={lang} />
      <PartnershipSection t={t} lang={lang} />
      <CtaSection t={t} lang={lang} />
    </main>
  );
}
