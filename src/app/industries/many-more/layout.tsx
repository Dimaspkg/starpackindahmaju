import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan Coating Kustom',
  description: 'Layanan UV coating dan vacuum metallizing kustom untuk berbagai industri dan spesifikasi unik.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
