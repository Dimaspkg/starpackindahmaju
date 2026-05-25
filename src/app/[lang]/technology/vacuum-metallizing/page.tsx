"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
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
      document.title = `${t.tech.categories[1].title} | PT STARPACK INDAHMAJU`;
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

  const heroTag = language === 'id' 
    ? 'Keunggulan Teknologi' 
    : language === 'jp' 
      ? '技術の卓越性' 
      : language === 'zh' 
        ? '技术卓越' 
        : 'Technology Excellence';

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <span className={styles.heroTag}>{heroTag}</span>
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
        <div className={styles.detailGrid}>
          {/* Left Column: Feature Cards */}
          <div className={styles.detailList}>
            {category.items.map((item: string, index: number) => (
              <div 
                key={index} 
                className={`${styles.techCard} ${styles.detailCard}`}
              >
                <div className={styles.iconWrapper}>
                  {getIcon(index)}
                </div>
                <div>
                  <h3 className={styles.cardTitle}>
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
                  <p className={styles.cardText}>{item}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Premium Double-Frame Visual Container */}
          <div className={styles.detailImageOuter}>
            <div className={styles.detailImageWrapper}>
              <Image
                src="/images/Vacuum_Metallizing/Vacuum-Metallizing.png"
                alt="Vacuum Metallizing Systems Facilities"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 40vw"
                className={styles.detailImage}
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <CTA 
          title={ctaTitle}
          description={ctaDesc}
          btnText={ctaBtnText}
          href="/#inquiry"
        />
      </div>
    </div>
  );
}
