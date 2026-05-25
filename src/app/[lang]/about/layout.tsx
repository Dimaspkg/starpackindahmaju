import { Metadata } from 'next';
import { generateDynamicMetadata } from '@/utils/metadata';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return generateDynamicMetadata(lang, 'about');
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
