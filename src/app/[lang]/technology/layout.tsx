import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teknologi UV Coating & Vacuum Metallizing | PT STARPACK INDAH MAJU',
  description: 'Jasa teknologi pelapisan plastik tercanggih di Indonesia: Automatic Spray Painting, UV Curing, dan Vacuum Metallizing untuk hasil premium.',
  keywords: 'Teknologi UV Coating, Mesin Vacuum Metallizing, Automatic Spray Painting, Pabrik Coating Modern',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
