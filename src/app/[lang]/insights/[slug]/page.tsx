import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import LocalizedLink from "@/components/LocalizedLink";
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import type { Metadata } from 'next';
import id from "@/locales/id.json";
import en from "@/locales/en.json";
import zh from "@/locales/zh.json";
import jp from "@/locales/jp.json";
import styles from './articleDetail.module.css';

const translations = { id, en, zh, jp };

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// Fetch helper with fallback to static JSON locales
async function getPost(slug: string, lang: string) {
  const normalizedLang = lang === 'ja' ? 'jp' : lang;
  const t = translations[normalizedLang as keyof typeof translations] || translations.id;

  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM posts WHERE slug = ? AND status = 'published'",
      [slug]
    );

    if (rows.length > 0) {
      const dbPost = rows[0];
      return {
        slug: dbPost.slug,
        category: dbPost.category,
        title: dbPost.title,
        description: dbPost.description,
        content: dbPost.content.split('\n\n'),
        image: dbPost.image,
        author: dbPost.author || 'Admin',
        created_at: dbPost.created_at
      };
    }
  } catch (error) {
    console.error('Error fetching post from DB:', error);
  }

  // Fallback to static articles
  const staticArticle = t.insights?.items.find((item: any) => item.slug === slug);
  if (staticArticle) {
    return {
      slug: staticArticle.slug,
      category: staticArticle.category,
      title: staticArticle.title,
      description: staticArticle.desc,
      content: staticArticle.content,
      image: staticArticle.image,
      author: (staticArticle as any).author || 'Admin',
      created_at: new Date()
    };
  }

  return null;
}

// Generate dynamic SEO metadata on the Server-side
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);

  if (!post) {
    return {
      title: 'Article Not Found | PT STARPACK INDAHMAJU'
    };
  }

  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://starpack.co.id';
  const siteUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

  return {
    title: `${post.title} | PT STARPACK INDAHMAJU`,
    description: post.description,
    openGraph: {
      title: `${post.title} | PT STARPACK INDAHMAJU`,
      description: post.description,
      type: 'article',
      url: `${siteUrl}/${lang}/insights/${post.slug}`,
      images: [
        {
          url: post.image,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | PT STARPACK INDAHMAJU`,
      description: post.description,
      images: [post.image]
    }
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const post = await getPost(slug, lang);

  if (!post) {
    notFound();
  }

  const normalizedLang = lang === 'ja' ? 'jp' : lang;
  const t = translations[normalizedLang as keyof typeof translations] || translations.id;

  // Localized texts for CTA
  const ctaTitle = lang === 'id' 
    ? 'Tertarik dengan Solusi Pelapisan Kami?' 
    : lang === 'jp' 
      ? '当社のコーティング技術にご興味がありますか？' 
      : lang === 'zh' 
        ? '对我们的涂层解决方案感兴趣吗？' 
        : 'Interested in Our Coating Solutions?';

  const ctaDesc = lang === 'id'
    ? 'Konsultasikan kebutuhan kemasan plastik produk Anda dengan tim ahli kami untuk hasil finishing premium yang stabil.'
    : lang === 'jp'
      ? 'お客様の製品向けに、安定したプレミアム仕上げを実現するためのご相談を専門チームがお受けします。'
      : lang === 'zh'
        ? '请与我们的专家团队咨询，为您的塑料产品包装打造出稳定且优质的饰面效果。'
        : 'Consult your plastic packaging needs with our expert team for consistent, premium finishing results.';

  const ctaBtnText = lang === 'id'
    ? 'Minta Penawaran Sekarang'
    : lang === 'jp'
      ? '今すぐ見積もりを依頼'
      : lang === 'zh'
        ? '立即请求报价'
        : 'Request a Quote Now';

  const dateFormatted = new Date(post.created_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pageContainer">
      <article className={styles.container}>
        <header className={styles.header}>
          <LocalizedLink href="/insights" className={styles.backLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t.insights?.back || 'Back to Insights'}
          </LocalizedLink>
          
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{dateFormatted}</span>
            <span className={styles.author}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', marginBottom: '2px' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              {post.author}
            </span>
          </div>
          
          <h1 className={styles.title}>{post.title}</h1>
        </header>

        <div className={styles.imageWrapper}>
          <Image 
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className={styles.articleImage}
          />
        </div>

        <section className={styles.contentBody}>
          {post.content.map((paragraph: string, idx: number) => (
            <div key={idx} style={{ marginBottom: '1.25rem', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </section>

        {/* Dynamic CTA Section inside Article */}
        <section className={styles.ctaBanner}>
          <h2 className={styles.ctaTitle}>{ctaTitle}</h2>
          <p className={styles.ctaDesc}>{ctaDesc}</p>
          <LocalizedLink href="/#inquiry" className={styles.ctaBtn}>
            {ctaBtnText}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </LocalizedLink>
        </section>
      </article>
    </div>
  );
}
