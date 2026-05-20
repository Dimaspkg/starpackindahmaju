import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Jasa Coating Plastik Premium',
  description: 'Pelajari lebih lanjut tentang PT. Starpack Indahmaju, spesialis jasa UV coating dan vacuum metallizing untuk plastik dengan pengalaman puluhan tahun.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
