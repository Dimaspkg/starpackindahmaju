"use client";

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './articleDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { t, language } = useLanguage();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find article matching slug
  const article = t.insights?.items.find((item: any) => item.slug === slug);

  useEffect(() => {
    if (mounted && article) {
      document.title = `${article.title} | PT. STARPACK INDAH MAJU`;
    } else if (mounted && !article) {
      document.title = `Article Not Found | PT. STARPACK INDAH MAJU`;
    }
  }, [mounted, article]);

  if (!mounted) return null;

  if (!article) {
    return (
      <div className="pageContainer">
        <div className={styles.notFoundContainer}>
          <h1 className={styles.notFoundTitle}>
            {language === 'id' ? 'Artikel Tidak Ditemukan' : language === 'jp' ? '記事が見つかりません' : language === 'zh' ? '未找到文章' : 'Article Not Found'}
          </h1>
          <p className={styles.notFoundText}>
            {language === 'id' ? 'Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.' : language === 'jp' ? '申し訳ありませんが、お探しの記事は存在しないか削除されました。' : language === 'zh' ? '抱歉，您查找的文章不存在或已被删除。' : 'Sorry, the article you are looking for is not available or has been removed.'}
          </p>
          <LocalizedLink href="/insights" className={styles.ctaBtn}>
            {t.insights?.back || 'Back to Insights'}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  // Localized texts for CTA
  const ctaTitle = language === 'id' 
    ? 'Tertarik dengan Solusi Pelapisan Kami?' 
    : language === 'jp' 
      ? '当社のコーティング技術にご興味がありますか？' 
      : language === 'zh' 
        ? '对我们的涂层解决方案感兴趣吗？' 
        : 'Interested in Our Coating Solutions?';

  const ctaDesc = language === 'id'
    ? 'Konsultasikan kebutuhan kemasan plastik produk Anda dengan tim ahli kami untuk hasil finishing premium yang stabil.'
    : language === 'jp'
      ? 'お客様の製品向けに、安定したプレミアム仕上げを実現するためのご相談を専門チームがお受けします。'
      : language === 'zh'
        ? '请与我们的专家团队咨询，为您的塑料产品包装打造出稳定且优质的饰面效果。'
        : 'Consult your plastic packaging needs with our expert team for consistent, premium finishing results.';

  const ctaBtnText = language === 'id'
    ? 'Minta Penawaran Sekarang'
    : language === 'jp'
      ? '今すぐ見積もりを依頼'
      : language === 'zh'
        ? '立即请求报价'
        : 'Request a Quote Now';

  return (
    <div className="pageContainer">
      <article className={styles.container}>
        <header className={styles.header}>
          <LocalizedLink href="/insights" className={styles.backLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t.insights.back}
          </LocalizedLink>
          
          <div className={styles.meta}>
            <span className={styles.category}>{article.category}</span>
            <span className={styles.date}>{article.date}</span>
          </div>
          
          <h1 className={styles.title}>{article.title}</h1>
        </header>

        <div className={styles.imageWrapper}>
          <Image 
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className={styles.articleImage}
          />
        </div>

        <section className={styles.contentBody}>
          {article.content.map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
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
