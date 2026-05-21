import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coating Alas Kaki & Sepatu (Footwear)',
  description: 'Solusi pelapisan vakum dan pelindung premium untuk komponen sepatu desainer dan elemen branding olahraga.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
