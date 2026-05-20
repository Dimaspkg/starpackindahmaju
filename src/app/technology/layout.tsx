import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teknologi Pelapisan | Inovasi Coating',
  description: 'Temukan teknologi pelapisan canggih kami, mulai dari mesin penyemprotan otomatis hingga ruang hampa udara untuk vacuum metallizing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
