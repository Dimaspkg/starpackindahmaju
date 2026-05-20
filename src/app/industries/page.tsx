"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './industriesPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function IndustriesPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && t.industry) {
      document.title = `${t.industry.title} | PT. STARPACK INDAHMAJU`;
    }
  }, [mounted, t]);

  if (!mounted || !t.industry) return null;

  const ctaTitle = language === 'id'
    ? 'Miliki Spesifikasi Khusus untuk Industri Anda?'
    : language === 'jp'
      ? '特定の業界仕様をお持ちですか？'
      : language === 'zh'
        ? '针对您的行业有特定要求吗？'
        : 'Have Specific Industry Requirements?';

  const ctaDesc = language === 'id'
    ? 'Hubungi spesialis finishing kami hari ini. Kami siap melayani kustomisasi pelapisan plastik dan vacuum metallizing untuk segala jenis bentuk & spesifikasi industri.'
    : language === 'jp'
      ? '当社の仕上げスペシャリストにお気軽にお問い合わせください。あらゆる形状や業界の仕様に合わせたプラスチックコーティングや真空蒸着のカスタマイズに対応いたします。'
      : language === 'zh'
        ? '请立即联系 planetary coating 专家。我们随时准备为各类工业形状与规格定制塑料涂层与真空电镀工艺。'
        : 'Get in touch with our coating specialists today. We are ready to customize plastic coating and vacuum metallizing solutions for all shapes & industrial requirements.';

  const ctaBtnText = language === 'id'
    ? 'Konsultasi Sekarang'
    : language === 'jp'
      ? '今すぐ相談する'
      : language === 'zh'
        ? '立即咨询'
        : 'Consult Now';

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.title}>{t.industry.title}</h1>
          <p className={styles.description}>{t.industry.description}</p>
        </header>

        {/* Industries Grid */}
        <section className={styles.grid}>
          {t.industry.items.map((item: any, index: number) => {
            const isLastItem = index === t.industry.items.length - 1;
            return (
              <div 
                key={index} 
                className={`${styles.card} ${isLastItem ? styles.highlight : ''}`}
              >
                <div className={styles.imageWrapper}>
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* bottom CTA Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>{ctaTitle}</h2>
          <p className={styles.ctaDesc}>{ctaDesc}</p>
          <Link href="/#inquiry" className={styles.ctaBtn}>
            {ctaBtnText}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
