import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peta Situs (Sitemap)',
  description: 'Navigasi lengkap seluruh halaman dan layanan PT Starpack Indah Maju.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
