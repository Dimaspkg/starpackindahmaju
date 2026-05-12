import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PT. STARPACK INDAHMAJU | UV Plastic Coating Specialist",
    template: "%s | PT. STARPACK INDAHMAJU"
  },
  description: "PT. Starpack Indahmaju specializes in premium UV plastic coating, offering consistent finishing results, advanced production control, and ISO 9001:2015 certified quality for manufacturing teams.",
  keywords: ["UV Plastic Coating", "PT Starpack Indahmaju", "Plastic Finishing", "Manufacturing Jakarta", "UV Coating Indonesia", "ISO 9001:2015", "Premium Plastic Coating"],
  authors: [{ name: "PT. STARPACK INDAHMAJU" }],
  creator: "PT. STARPACK INDAHMAJU",
  publisher: "PT. STARPACK INDAHMAJU",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://starpackindahmaju.com",
    title: "PT. STARPACK INDAHMAJU | UV Plastic Coating Specialist",
    description: "Premium finishing for plastic products with advanced production control and stable output.",
    siteName: "PT. STARPACK INDAHMAJU",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT. STARPACK INDAHMAJU | UV Plastic Coating Specialist",
    description: "Premium finishing for plastic products with advanced production control.",
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
    <html lang="id">
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
          <div className="mainContainer">
            <Sidebar />
            <main className="contentWrapper">
              {children}
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
