"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../technologyPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function VacuumMetallizingPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && t.tech) {
      document.title = `${t.tech.categories[1].title} | PT. STARPACK INDAHMAJU`;
    }
  }, [mounted, t]);

  if (!mounted || !t.tech) return null;

  const category = t.tech.categories[1];

  // Specific custom SVG icons for each point in Vacuum Metallizing
  const getIcon = (index: number) => {
    switch (index) {
      case 0: // Vacuum chamber
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
          </svg>
        );
      case 1: // Aluminum & chrome Sputtering
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M12 8v8" />
          </svg>
        );
      case 2: // Protective base/top coat
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
        );
      case 3: // Process control
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 17v-5M12 17V9M15 17v-3" />
          </svg>
        );
      case 4: // Superior adhesion & durability
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
    }
  };

  const ctaTitle = language === 'id'
    ? 'Ingin Mewujudkan Efek Logam Premium pada Produk Anda?'
    : language === 'jp'
      ? '製品にプレミアムな金属光沢を与えませんか？'
      : language === 'zh'
        ? '想在您的产品上实现高端金属质感吗？'
        : 'Ready to Achieve Premium Metallic Finishes?';

  const ctaDesc = language === 'id'
    ? 'Konsultasikan kebutuhan vacuum metallizing aluminium atau finishing krom Anda dengan ahli produksi kami sekarang. Sampel gratis tersedia berdasarkan permintaan.'
    : language === 'jp'
      ? 'アルミニウム真空蒸着やクローム仕上げの量产ニーズについて、当社の生産スペシャリストにぜひご相談ください。無料サンプル juga 承っております。'
      : language === 'zh'
        ? '立即与我们的生产专家咨询您的铝真空电镀或铬涂装需求。我们可根据要求提供免费样品。'
        : 'Consult your aluminum vacuum deposition or custom chrome finishing needs with our engineering experts today. Free physical samples are available on request.';

  const ctaBtnText = language === 'id'
    ? 'Hubungi Tim Metallizing'
    : language === 'jp'
      ? '蒸着技術チームに連絡'
      : language === 'zh'
        ? '联系真空电镀团队'
        : 'Contact Metallizing Team';

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.title}>{category.title}</h1>
          <p className={styles.description}>
            {language === 'id' 
              ? 'Teknologi vacuum metallizing kami memberikan efek mengkilap metalik mewah seperti cermin perak, emas, dan krom pada kemasan plastik Anda, didukung oleh adhesi tingkat industri yang luar biasa.'
              : language === 'jp'
                ? '当社の真空蒸着技術は、プラスチック製品の表面にシルバー、ゴールド、クロームのような鏡面反射を持つ高級感溢れる金属光沢を与え、極めて強固な密着性を実現します。'
                : language === 'zh'
                  ? '我们的真空电镀技术可为您的塑料产品表面赋予如镜面般的银色、金色或铬色高端金属质感，并确保工业级的高强附着力。'
                  : 'Our high-performance vacuum metallizing technologies apply rich, mirror-like chrome, silver, and gold metallic finishes to your plastic packagings, reinforced with exceptional industrial-grade adhesion.'}
          </p>
        </header>

        {/* Categories Detail Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', marginBottom: '6rem' }}>
          {/* Left Column: Feature Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {category.items.map((item: string, index: number) => (
              <div 
                key={index} 
                className={styles.techCard} 
                style={{ padding: '2rem 2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}
              >
                <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getIcon(index)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--foreground)', marginBottom: '0.25rem' }}>
                    {index === 0 
                      ? (language === 'id' ? 'Ruang Vakum Industri' : language === 'jp' ? '工業用真空チャンバー' : language === 'zh' ? '工业级真空腔体' : 'Industrial Vacuum Chambers')
                      : index === 1
                        ? (language === 'id' ? 'Deposisi Logam Presisi' : language === 'jp' ? '高精度アルミ・クローム蒸着' : language === 'zh' ? '高精铝与铬金属沉积' : 'Precision Metal Deposition')
                        : index === 2
                          ? (language === 'id' ? 'Sistem Pelapisan Multi-Lapis' : language === 'jp' ? 'マルチレイヤーコーティング' : language === 'zh' ? '多层复合涂装系统' : 'Multi-Layer Coatings')
                          : index === 3
                            ? (language === 'id' ? 'Kontrol Proses Canggih' : language === 'jp' ? '高度なプロセス制御' : language === 'zh' ? '数字化过程控制' : 'Advanced Process Controls')
                            : (language === 'id' ? 'Daya Rekat & Ketahanan Unggul' : language === 'jp' ? '優れた密着性と耐久性' : language === 'zh' ? '卓越粘附力与耐久性' : 'Superior Adhesion & Durability')}
                  </h3>
                  <p style={{ color: 'var(--muted-text)', fontSize: '0.95rem', lineHeight: '1.4' }}>{item}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Premium Double-Frame Visual Container */}
          <div style={{ position: 'relative', minHeight: '400px' }}>
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%', 
              minHeight: '450px',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              overflow: 'hidden'
            }}>
              <Image
                src="/images/Vacuum_Metallizing/Vacuum-Metallizing.png"
                alt="Vacuum Metallizing Systems Facilities"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 40vw"
                style={{ objectFit: 'cover', transition: 'transform 2.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
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

      {/* CSS adjustments to ensure 100% desktop/mobile responsiveness */}
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          div[style*="minHeight"] {
            min-height: 300px !important;
          }
        }
      `}</style>
    </div>
  );
}
