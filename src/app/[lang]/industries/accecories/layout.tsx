import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coating Aksesoris (Accessories)',
  description: 'Solusi pelapisan dekoratif presisi tinggi untuk gantungan kunci, gesper sabuk, dan perhiasan mewah.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
