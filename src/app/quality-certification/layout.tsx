import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sertifikasi Mutu | ISO 9001:2015',
  description: 'Fasilitas dan proses produksi PT. Starpack Indahmaju yang tersertifikasi ISO 9001:2015, menjamin kualitas konsisten di setiap batch.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
