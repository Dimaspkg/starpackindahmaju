import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industri yang Kami Layani',
  description: 'Solusi pelapisan plastik untuk berbagai industri, termasuk kecantikan, elektronik, otomotif, dan peralatan rumah tangga.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
