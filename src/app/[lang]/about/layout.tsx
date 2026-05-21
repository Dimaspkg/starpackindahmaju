import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami - Perusahaan UV Coating & Vacuum Metallizing | PT. STARPACK INDAHMAJU',
  description: 'Sejarah, misi, dan nilai-nilai PT. Starpack Indahmaju. Kami adalah spesialis UV Coating dan Vacuum Metallizing bersertifikasi ISO 9001:2015 di Indonesia.',
  keywords: 'Tentang Starpack, Perusahaan Coating Plastik, Pabrik UV Coating Jakarta, Vacuum Metallizing Indonesia',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
