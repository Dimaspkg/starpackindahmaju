import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hubungi Kami - Konsultasi Jasa Coating Plastik | PT. STARPACK INDAH MAJU',
  description: 'Hubungi tim ahli PT. Starpack Indah Maju di Jakarta untuk mendiskusikan kebutuhan harga dan spesifikasi UV coating & vacuum metallizing produk Anda.',
  keywords: 'Kontak Starpack, Alamat Pabrik Coating Jakarta, Harga UV Coating Plastik, Jasa Vacuum Metallizing',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
