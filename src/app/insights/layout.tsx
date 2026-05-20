import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wawasan & Berita | Update Industri Coating',
  description: 'Berita terbaru, tren, dan wawasan seputar industri pelapisan plastik, UV coating, dan vacuum metallizing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
