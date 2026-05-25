"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from './technologyPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function TechnologyPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && t.tech) {
      document.title = `${t.tech.title} | PT STARPACK INDAHMAJU`;
    }
  }, [mounted, t]);

  if (!mounted || !t.tech) return null;

  // Localized gallery heading & CTA strings
  const galleryHeading = language === 'id' 
    ? 'Fasilitas & Mesin Utama Kami' 
    : language === 'jp' 
      ? '主要な設備と機械' 
      : language === 'zh' 
        ? '核心设备与机械' 
        : 'Our Core Machinery & Infrastructure';

  const ctaTitle = language === 'id'
    ? 'Ingin Melihat Kemampuan Produksi Kami Secara Langsung?'
    : language === 'jp'
      ? '当社の生産体制を直接確認されたいですか？'
      : language === 'zh'
        ? '想直接了解我们的生产能力吗？'
        : 'Want to Experience Our Production Capabilities Firsthand?';

  const ctaDesc = language === 'id'
    ? 'Konsultasikan kebutuhan produksi massal kemasan produk Anda atau mintalah contoh hasil finishing untuk verifikasi kualitas.'
    : language === 'jp'
      ? '製品パッケージの大量生産に関するご相談や、品質確認のための仕上がりサンプルの送付依頼はこちらからお受けします。'
      : language === 'zh'
        ? '请与我们咨询产品包装的批量生产需求，或索取打样样品以进行质量检验。'
        : 'Consult your high-volume packaging needs with us or request dynamic finish samples for quality inspection.';

  const ctaBtnText = language === 'id'
    ? 'Hubungi Tim Teknis Kami'
    : language === 'jp'
      ? '技術チームに問い合わせる'
      : language === 'zh'
        ? '联系我们的技术团队'
        : 'Contact Our Technical Team';

  const heroTag = language === 'id' 
    ? 'Teknologi & Fasilitas' 
    : language === 'jp' 
      ? '技術と設備' 
      : language === 'zh' 
        ? '技术与设备' 
        : 'Technology & Facilities';

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <span className={styles.heroTag}>{heroTag}</span>
          <h1 className={styles.title}>{t.tech.title}</h1>
          <p className={styles.description}>{t.tech.description}</p>
        </header>

        {/* Categories Section */}
        <section className={styles.techGrid}>
          {t.tech.categories.map((cat: any, index: number) => {
            const targetUrl = index === 0 ? '/technology/uv-coating' : '/technology/vacuum-metallizing';
            const btnLabel = index === 0 
              ? (language === 'id' ? 'Jelajahi UV Coating' : language === 'jp' ? 'UVコーティングを探索' : language === 'zh' ? '探索UV涂装' : 'Explore UV Coating')
              : (language === 'id' ? 'Jelajahi Vacuum Metallizing' : language === 'jp' ? '真空蒸着を探索' : language === 'zh' ? '探索真空电镀' : 'Explore Vacuum Metallizing');
            
            return (
              <div key={index} className={styles.techCard}>
                <h2 className={styles.techCardTitle}>{cat.title}</h2>
                <ul className={styles.itemList}>
                  {cat.items.map((item: string, i: number) => (
                    <li key={i} className={styles.listItem}>
                      <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className={styles.cardAction}>
                  <LocalizedLink href={targetUrl} className={styles.cardBtn}>
                    {btnLabel}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </LocalizedLink>
                </div>
              </div>
            );
          })}
        </section>

        {/* Machinery Gallery Section */}
        <section className={styles.gallerySection}>
          <h2 className={styles.sectionHeading}>{galleryHeading}</h2>
          <div className={styles.galleryGrid}>
            {t.tech.gallery.map((item: any, index: number) => (
              <div key={index} className={styles.galleryCard}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.galleryImage}
                  />
                </div>
                <div className={styles.galleryContent}>
                  <h3 className={styles.galleryCardTitle}>{item.title}</h3>
                  <p className={styles.galleryDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* bottom CTA Section */}
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
