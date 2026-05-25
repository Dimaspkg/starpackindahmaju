"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from './coatingPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function CoatingPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mounted && t.effects) {
      document.title = `${t.effects.title} | PT STARPACK INDAH MAJU`;
    }
  }, [mounted, t]);

  if (!mounted || !t.effects) return null;

  const filteredItems = t.effects.items.filter((item: any) => {
    if (activeFilter === 'all') return true;
    return (item.category || 'uv-coating') === activeFilter;
  });

  // Filter translation labels
  const filterLabels = {
    all: language === 'id' ? 'Semua Kategori' : language === 'jp' ? 'すべてのカテゴリー' : language === 'zh' ? '所有类别' : 'All Categories',
    'uv-coating': 'UV Coating',
    'vacuum-metallizing': language === 'id' ? 'Vacuum Metallizing' : language === 'jp' ? '真空蒸着' : language === 'zh' ? '真空电镀' : 'Vacuum Metallizing',
    'combo': language === 'id' ? 'Combo (Metallizing + UV)' : language === 'jp' ? 'コンボ (蒸着 + UV)' : language === 'zh' ? '复合工艺 (电镀 + UV)' : 'Combo (Metallizing + UV)'
  };

  const L = {
    heroTag: language === 'id' ? 'Katalog Finishing' : language === 'jp' ? '仕上げカタログ' : language === 'zh' ? '表面处理目录' : 'Finishing Catalog',
    catalogTitle: language === 'id' ? 'Unduh Katalog Lengkap Kami' : language === 'jp' ? 'カタログ全体のダウンロード' : language === 'zh' ? '下载我们的完整目录' : 'Download Our Full Catalog',
    catalogDesc: language === 'id' 
      ? 'Jelajahi seluruh koleksi 50+ efek coating UV dan metalisasi vakum premium kami.'
      : language === 'jp' 
        ? '50種類以上のプレミアムUVコーティングおよび真空蒸着エフェクトの全ラインナップをご覧ください。'
        : language === 'zh' 
          ? '探索我们完整的50多种优质UV涂装与真空电镀工艺效果。'
          : 'Explore our complete range of 50+ premium UV coating and vacuum metallizing effects.',
    catalogBtn: language === 'id' ? 'Unduh PDF Katalog (3.6 MB)' : language === 'jp' ? 'カタログPDFをダウンロード (3.6 MB)' : language === 'zh' ? '下载目录 PDF (3.6 MB)' : 'Download Catalog PDF (3.6 MB)',
    ctaTitle: language === 'id' ? 'Butuh Finishing Kustom untuk Produk Anda?' : language === 'jp' ? '製品用のカスタム仕上げが必要ですか？' : language === 'zh' ? '需要为您产品进行定制处理？' : 'Need a Custom Finish for Your Product?',
    ctaDesc: language === 'id' 
      ? 'Konsultasikan dengan tim ahli kami untuk merumuskan efek coating khusus yang sesuai dengan kebutuhan branding Anda.'
      : language === 'jp' 
        ? 'ブランディングのニーズに合わせて、独自のカスタムコーティング効果を開発するため、専門チームにご相談ください。'
        : language === 'zh' 
          ? '与我们的专家团队咨询，开发出符合您品牌需求的专属定制涂层效果。'
          : 'Consult with our expert team to develop unique custom coating effects tailored to your brand requirements.',
    ctaBtn: language === 'id' ? 'Hubungi Kami' : language === 'jp' ? 'お問い合わせ' : language === 'zh' ? '联系我们' : 'Contact Us'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Hero Banner Section */}
      <section className={styles.hero}>
        <Image
          src="/images/herro/coatingeffect2.png"
          alt="Coating Effects Background"
          fill
          priority
          className={styles.heroBg}
          style={{
            transform: `translateY(${scrollY * 0.4}px) scale(1.15)`,
            transformOrigin: 'center center',
          }}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroText}>
            <span className={styles.heroTag}>{L.heroTag}</span>
            <div className={styles.heroBottomText}>
              <h1 className={styles.heroTitle}>{t.effects.title}</h1>
              <p className={styles.heroDesc}>{t.effects.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="pageContainer" style={{ paddingTop: '3rem' }}>
        {/* Catalog Download Banner */}
        <div className={styles.catalogBanner}>
          <div className={styles.catalogText}>
            <h2 className={styles.catalogTitle}>{L.catalogTitle}</h2>
            <p className={styles.catalogDesc}>{L.catalogDesc}</p>
          </div>
          <a 
            href="/downloads/Catalog_Uv_Coating.pdf" 
            download="Starpack_Catalog_Uv_Coating.pdf"
            className={styles.downloadBtn}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            {L.catalogBtn}
          </a>
        </div>

        {/* Interactive Filter Tabs */}
        <div className={styles.filters}>
          {Object.entries(filterLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveFilter(key);
              }}
              className={`${styles.filterBtn} ${activeFilter === key ? styles.filterBtnActive : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Effects Grid */}
        <section className={styles.grid}>
          {filteredItems.map((item: any, idx: number) => (
            <div
              key={idx}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.effectImage}
                  />
                ) : (
                  <div className={styles.placeholderImage}>
                    <span>{item.title}</span>
                  </div>
                )}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* CTA section */}
        <CTA
          title={L.ctaTitle}
          description={L.ctaDesc}
          btnText={L.ctaBtn}
          href="/contact"
        />
      </div>
    </div>
  );
}
