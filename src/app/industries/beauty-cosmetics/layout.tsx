import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coating Kemasan Kosmetik & Kecantikan',
  description: 'Tingkatkan nilai merek kemasan kosmetik Anda dengan pelapisan UV dan metallizing yang mewah dan tahan lama.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
