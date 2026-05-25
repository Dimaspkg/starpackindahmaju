import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Providers } from "@/components/Providers";
import MainLayout from "@/components/MainLayout";
import { generateDynamicMetadata } from "@/utils/metadata";

const inter = Inter({ subsets: ["latin"] });

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starpack.co.id';
const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return generateDynamicMetadata(lang, 'home', {
    authors: [{ name: "PT STARPACK INDAHMAJU" }],
    creator: "PT STARPACK INDAHMAJU",
    publisher: "PT STARPACK INDAHMAJU",
    verification: {
      google: "ISI_DENGAN_KODE_VERIFIKASI_GOOGLE_ANDA_DISINI",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      "geo.region": "ID-JK",
      "geo.placename": "Jakarta",
      "geo.position": "-6.190754;106.918095",
      "ICBM": "-6.190754, 106.918095",
    },
  });
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { lang } = await params;
  const isEn = lang === 'en';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PT STARPACK INDAHMAJU",
    "image": `${siteUrl}/images/starpackindahmaju.png`,
    "description": isEn 
      ? "ISO 9001:2015 certified UV Coating & Vacuum Metallizing Plastic Company in Indonesia."
      : "Perusahaan UV Coating & Vacuum Metallizing Plastik berstandar ISO 9001:2015 di Indonesia.",
    "url": `${siteUrl}/${lang}`,
    "telephone": "+622154376174", // Placeholder phone
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kw. Industri Pulogadung, 3, Jl. Pulogadung No.6B, RW.3, Rw. Terate, Kec. Cakung",
      "addressLocality": isEn ? "East Jakarta City" : "Kota Jakarta Timur",
      "addressRegion": isEn ? "Jakarta Special Capital Region" : "Daerah Khusus Ibukota Jakarta",
      "postalCode": "13920",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.190754,
      "longitude": 106.918095
    },
    "priceRange": "$$"
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <LanguageProvider initialLang={lang as any}>
          <Providers>
            <ScrollReveal />
            <MainLayout>
              {children}
            </MainLayout>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
