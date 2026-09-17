import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${SITE_URL}/${loc}`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: "%s | AMULET",
    },
    description: t("description"),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      siteName: "AMULET",
      type: "website",
      locale: locale === "hu" ? "hu_HU" : "ro_RO",
      images: [`${SITE_URL}/images/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AMULET",
    legalName: "Birta Impex SRL",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    telephone: "+40741597436",
    email: "amulet@amulet.ro",
    priceRange: "RON 3 - RON 75",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Str. Mărășești nr. 7",
      addressLocality: "Salonta",
      addressRegion: "Bihor",
      postalCode: "415500",
      addressCountry: "RO",
    },
    areaServed: ["Salonta", "Oradea", "Arad"],
    openingHours: "Mo-Fr 08:00-16:30",
    sameAs: [
      "https://www.facebook.com/amuletaqua",
      "https://www.instagram.com/amulet_aqua/",
      "https://x.com/Amulet_aqua",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
            <Footer />
          </CartProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
