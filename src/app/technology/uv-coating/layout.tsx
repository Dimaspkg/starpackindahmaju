import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jasa UV Coating Plastik Premium',
  description: 'Layanan UV coating khusus untuk kemasan premium, memberikan hasil akhir high gloss atau matte mewah yang tahan gores dan tahan bahan kimia.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
