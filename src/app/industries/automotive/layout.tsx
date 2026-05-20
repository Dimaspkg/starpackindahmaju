import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coating Komponen Otomotif',
  description: 'Pelapisan komponen interior dan eksterior otomotif dengan perlindungan cuaca maksimal dan ketahanan gores.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
