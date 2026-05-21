import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Providers } from "@/components/Providers";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starpack.co.id';
const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === 'en';
  
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isEn 
        ? "UV Coating & Vacuum Metallizing Plastic Company Indonesia | PT STARPACK INDAH MAJU"
        : "Perusahaan UV Coating & Vacuum Metallizing Plastik Indonesia | PT STARPACK INDAH MAJU",
      template: "%s | PT STARPACK INDAH MAJU"
    },
    description: isEn
      ? "Get the best UV plastic coating & vacuum metallizing plastic coating services in Indonesia. PT Starpack Indah Maju offers premium, consistent, and ISO 9001:2015 certified plastic coating services."
      : "Dapatkan jasa UV plastic coating & vacuum metallizing plastic coating terbaik di Indonesia. PT Starpack Indah Maju menawarkan coating plastic service premium, konsisten, dan bersertifikasi ISO 9001:2015.",
    keywords: isEn ? [
      "Plastic Coating Services",
      "Plastic Coating",
      "Coating Plastic Service",
      "Vacuum Metallizing Plastic Coating Indonesia",
      "Vacuum Metallizing Services",
      "Plastic Chrome Plating Jakarta",
      "Cosmetic Packaging UV Coating",
      "PT Starpack Indah Maju",
      "UV Plastic Coating",
      "Plastic Finishing",
      "Manufacturing Jakarta",
      "ISO 9001:2015",
      "Premium Plastic Coating"
    ] : [
      "Jasa plastik Coating",
      "Coating Plastic",
      "Coating Plastic Service",
      "Vacuum Metallizing Plastic Coating Indonesia",
      "Jasa Vacuum Metallizing",
      "Chrome Plastik Jakarta",
      "UV Coating Kemasan Kosmetik",
      "PT Starpack Indah Maju",
      "UV Plastic Coating",
      "Plastic Finishing",
      "Manufacturing Jakarta",
      "ISO 9001:2015",
      "Premium Plastic Coating"
    ],
    authors: [{ name: "PT STARPACK INDAH MAJU" }],
    creator: "PT STARPACK INDAH MAJU",
    publisher: "PT STARPACK INDAH MAJU",
    verification: {
      google: "ISI_DENGAN_KODE_VERIFIKASI_GOOGLE_ANDA_DISINI",
    },
    alternates: {
      languages: {
        'id': '/id',
        'en': '/en',
        'zh': '/zh',
        'ja': '/jp'
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "id_ID",
      url: `${siteUrl}/${lang}`,
      title: isEn 
        ? "UV Coating & Vacuum Metallizing Plastic Services Indonesia | PT STARPACK INDAH MAJU"
        : "Jasa UV Coating & Vacuum Metallizing Plastik Indonesia | PT STARPACK INDAH MAJU",
      description: isEn
        ? "Premium plastic coating service & vacuum metallizing plastic coating with advanced production control and stable results in Indonesia."
        : "Coating plastic service & vacuum metallizing plastic coating premium dengan kontrol produksi canggih dan hasil stabil di Indonesia.",
      siteName: "PT STARPACK INDAH MAJU",
      images: [
        {
          url: "/images/og-starpack.png",
          width: 1200,
          height: 630,
          alt: "PT STARPACK INDAH MAJU UV Coating Solutions",
        },
        {
          url: "/images/starpackindahmaju.png",
          width: 1200,
          height: 630,
          alt: "PT STARPACK INDAH MAJU UV Coating Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Jasa UV Coating & Vacuum Metallizing Plastik Indonesia | PT STARPACK INDAH MAJU",
      description: "Coating plastic service & vacuum metallizing plastic coating premium dengan kontrol produksi canggih dan hasil stabil di Indonesia.",
      images: ["/images/og-starpack.png", "/images/starpackindahmaju.png"],
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
  };
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
    "name": "PT STARPACK INDAH MAJU",
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
