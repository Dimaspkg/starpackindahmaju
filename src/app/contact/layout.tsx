import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hubungi Kami | Konsultasi Jasa Coating',
  description: 'Hubungi tim ahli PT. Starpack Indahmaju untuk mendiskusikan kebutuhan UV coating dan vacuum metallizing produk Anda.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
