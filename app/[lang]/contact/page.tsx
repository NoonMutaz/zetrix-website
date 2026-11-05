import PageHero from "@/components/PageHero";
import { ContactSection } from "@/components/Sections";
import { pageMetadata, resolve, type PageParams } from "@/lib/page";

export const generateMetadata = pageMetadata("contact");

export default async function ContactPage(props: PageParams) {
  const { t, lang } = await resolve(props);
  return (
    <main>
      <PageHero
        title={t.pages.contact.title}
        text={t.pages.contact.text}
        image="/images/facility-site.jpg"
        homeHref={`/${lang}`}
        homeLabel={t.pages.home}
      />
      <ContactSection t={t} lang={lang} />
    </main>
  );
}
