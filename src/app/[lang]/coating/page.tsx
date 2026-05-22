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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

  // Lock scroll when lightbox is active
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  if (!mounted || !t.effects) return null;

  // Map effects items to categories for filtering
  const getCategory = (title: string) => {
    const tLower = title.toLowerCase();
    if (tLower.includes('matte')) {
      return 'matte';
    }
    if (tLower.includes('gloss') || tLower.includes('silver') || tLower.includes('gold') || tLower.includes('chrome')) {
      return 'glossy';
    }
    return 'specialized'; // holographic, pearl, etc.
  };

  const filteredItems = t.effects.items.map((item: any, idx: number) => ({
    ...item,
    originalIndex: idx, // keep track for lightbox navigation
    category: getCategory(item.title)
  })).filter((item: any) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  // Filter translation labels
  const filterLabels = {
    all: language === 'id' ? 'Semua Efek' : language === 'jp' ? 'すべての効果' : language === 'zh' ? '全部效果' : 'All Effects',
    glossy: language === 'id' ? 'Glossy & Metallic' : language === 'jp' ? '光沢＆メタリック' : language === 'zh' ? '光泽与金属' : 'Glossy & Metallic',
    matte: language === 'id' ? 'Matte Finish' : language === 'jp' ? 'マットフィニッシュ' : language === 'zh' ? '哑光饰面' : 'Matte Finish',
    specialized: language === 'id' ? 'Spesial / Efek Khusus' : language === 'jp' ? '特殊効果' : language === 'zh' ? '特殊效果' : 'Specialized Effects'
  };

  const L = {
    heroTag: language === 'id' ? 'Katalog Finishing' : language === 'jp' ? '仕上げカタログ' : language === 'zh' ? '表面处理目录' : 'Finishing Catalog',
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
        {/* Interactive Filter Tabs */}
        <div className={styles.filters}>
          {Object.entries(filterLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveFilter(key);
                setLightboxIndex(null);
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
              onClick={() => setLightboxIndex(item.originalIndex)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.effectImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeBtn}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                aria-label="Close lightbox"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className={styles.lightboxImageWrapper}>
                <button
                  className={styles.prevBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + t.effects.items.length) % t.effects.items.length : null));
                  }}
                  aria-label="Previous image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <Image
                  src={t.effects.items[lightboxIndex].image}
                  alt={t.effects.items[lightboxIndex].title}
                  fill
                  sizes="(max-width: 768px) 95vw, 80vw"
                  style={{ objectFit: 'contain' }}
                />

                <button
                  className={styles.nextBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % t.effects.items.length : null));
                  }}
                  aria-label="Next image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              <div className={styles.lightboxCaption}>
                <h3 className={styles.lightboxTitle}>{t.effects.items[lightboxIndex].title}</h3>
                <p className={styles.lightboxDesc}>{t.effects.items[lightboxIndex].desc}</p>
              </div>
            </div>
          </div>
        )}

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
