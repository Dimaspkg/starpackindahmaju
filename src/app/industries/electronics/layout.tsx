import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coating Perangkat Elektronik Konsumen',
  description: 'Pelapisan anti gores dan sentuhan metalik premium untuk perangkat elektronik yang sering digunakan.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
