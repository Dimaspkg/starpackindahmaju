import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coating Aksesoris Fashion',
  description: 'Tambahkan kilau elegan dan perlindungan bebas karat pada komponen aksesoris fashion Anda.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
