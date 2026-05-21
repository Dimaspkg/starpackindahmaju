import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coating Peralatan Rumah Tangga',
  description: 'Solusi pelapisan tahan suhu ekstrem dan aman untuk peralatan rumah tangga dan gaya hidup.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
