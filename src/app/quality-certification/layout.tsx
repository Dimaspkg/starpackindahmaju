import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sertifikasi ISO 9001:2015 & Jaminan Mutu | PT. STARPACK INDAHMAJU',
  description: 'Pabrik jasa UV Coating dan Vacuum Metallizing bersertifikat ISO 9001:2015. Jaminan kualitas konsisten, zero defect, dan quality control ketat di setiap batch produksi.',
  keywords: 'ISO 9001:2015 Coating, Pabrik Coating Sertifikat ISO, Jaminan Mutu Plastik Coating',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
