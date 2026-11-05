import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionaries, isLocale, locales } from "@/lib/content";
import "@fontsource/alexandria/500.css";
import "@fontsource/alexandria/600.css";
import "@fontsource/alexandria/700.css";
import "@fontsource/alexandria/800.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "../globals.css";


export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = dictionaries[lang];
  return {
    metadataBase: new URL("https://zetrix-website.vercel.app"),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: "/en", ar: "/ar" } },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/steel-1.jpg"],
      locale: lang === "ar" ? "ar_SA" : "en_US",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const isAr = lang === "ar";

  return (
    <html
      lang={lang}
      dir={isAr ? "rtl" : "ltr"}
      style={
        {
          "--font-body": isAr
            ? "'IBM Plex Sans Arabic', 'Manrope', system-ui, sans-serif"
            : "'Manrope', system-ui, sans-serif",
          "--font-display": isAr
            ? "'Alexandria', 'Outfit', system-ui, sans-serif"
            : "'Outfit', system-ui, sans-serif",
        } as React.CSSProperties
      }
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
