import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jasa Vacuum Metallizing (Chrome Plastik)',
  description: 'Deposisi logam dalam ruang hampa untuk menciptakan efek cermin emas, perak, dan krom pada komponen plastik dengan daya tahan tinggi.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
