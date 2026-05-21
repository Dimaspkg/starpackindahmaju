import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan Industri - Coating Plastik Kosmetik & Otomotif | PT. STARPACK INDAHMAJU',
  description: 'Solusi UV Coating dan Vacuum Metallizing untuk berbagai industri: Kecantikan, Otomotif, Elektronik, dan Peralatan Rumah Tangga dengan kualitas premium.',
  keywords: 'Coating Plastik Kosmetik, Coating Otomotif, Vacuum Metallizing Elektronik, Jasa Coating Jakarta',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
