import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import type { Metadata } from 'next';
import { generateDynamicMetadata } from '@/utils/metadata';
import id from "@/locales/id.json";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";
import jp from "@/locales/jp.json";
import InsightsListClient from './InsightsListClient';

const translations = { id, en, zh, jp };

type PageProps = {
  params: Promise<{ lang: string }>;
};

// Generate Server-Side SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return generateDynamicMetadata(lang, 'insights');
}

export default async function InsightsPage({ params }: PageProps) {
  const { lang } = await params;
  const normalizedLang = lang === 'ja' ? 'jp' : lang; // handle ja vs jp mapping
  const t = translations[normalizedLang as keyof typeof translations] || translations.id;

  // Fetch published articles from database
  let dbPosts: any[] = [];
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, slug, category, title, description, image, status, created_at FROM posts WHERE status = 'published' ORDER BY created_at DESC"
    );
    // Serialize MySQL rows to plain JS objects for Next.js Server Component
    dbPosts = rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      category: row.category,
      title: row.title,
      description: row.description,
      image: row.image,
      status: row.status,
      created_at: row.created_at.toISOString() // convert date to string representation
    }));
  } catch (error) {
    console.error('Error fetching insights from database, falling back to static locales:', error);
    // Fallback to static articles from locales file if DB query fails
    if (t.insights?.items) {
      dbPosts = t.insights.items.map((item: any, idx: number) => ({
        id: idx + 1,
        slug: item.slug,
        category: item.category,
        title: item.title,
        description: item.desc,
        image: item.image,
        status: 'published',
        created_at: new Date().toISOString()
      }));
    }
  }

  return (
    <div className="pageContainer">
      <InsightsListClient
        posts={dbPosts}
        lang={lang}
        tInsights={t.insights || { title: 'Insights', description: '', read_more: 'Read More' }}
      />
    </div>
  );
}
