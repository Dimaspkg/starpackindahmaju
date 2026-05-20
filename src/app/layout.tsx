import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { Providers } from "@/components/Providers";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starpack.co.id';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Perusahaan UV Coating & Vacuum Metallizing Plastik Indonesia | PT. STARPACK INDAHMAJU",
    template: "%s | PT. STARPACK INDAHMAJU"
  },
  description: "Dapatkan jasa UV plastic coating & vacuum metallizing plastic coating terbaik di Indonesia. PT. Starpack Indahmaju menawarkan coating plastic service premium, konsisten, dan bersertifikasi ISO 9001:2015.",
  keywords: [
    "Jasa plastik Coating",
    "Coating Plastic",
    "Coating Plastic Service",
    "Vacuum Metallizing Plastic Coating Indonesia",
    "Jasa Vacuum Metallizing",
    "Chrome Plastik Jakarta",
    "UV Coating Kemasan Kosmetik",
    "PT Starpack Indahmaju",
    "UV Plastic Coating",
    "Plastic Finishing",
    "Manufacturing Jakarta",
    "ISO 9001:2015",
    "Premium Plastic Coating"
  ],
  authors: [{ name: "PT. STARPACK INDAHMAJU" }],
  creator: "PT. STARPACK INDAHMAJU",
  publisher: "PT. STARPACK INDAHMAJU",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: "Jasa UV Coating & Vacuum Metallizing Plastik Indonesia | PT. STARPACK INDAHMAJU",
    description: "Coating plastic service & vacuum metallizing plastic coating premium dengan kontrol produksi canggih dan hasil stabil di Indonesia.",
    siteName: "PT. STARPACK INDAHMAJU",
    images: [
      {
        url: "/images/og-starpack.png",
        width: 1200,
        height: 630,
        alt: "PT. STARPACK INDAHMAJU UV Coating Solutions",
      },
      {
        url: "/images/starpackindahmaju.png",
        width: 1200,
        height: 630,
        alt: "PT. STARPACK INDAHMAJU UV Coating Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa UV Coating & Vacuum Metallizing Plastik Indonesia | PT. STARPACK INDAHMAJU",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
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

        <LanguageProvider>
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
