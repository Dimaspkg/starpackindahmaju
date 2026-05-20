"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './qualityPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function QualityCertificationPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && t.quality) {
      document.title = `${t.quality.title} | PT. STARPACK INDAHMAJU`;
    }
  }, [mounted, t]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!mounted || !t.quality) return null;

  const ctaTitle = language === 'id'
    ? 'Ingin Mendapatkan Dokumen Spesifikasi Mutu Lengkap Kami?'
    : language === 'jp'
      ? '詳細な品質仕様書が必要ですか？'
      : language === 'zh'
        ? '需要获取我们完整的质量规格文件吗？'
        : 'Need Our Complete Quality Specifications?';

  const ctaDesc = language === 'id'
    ? 'Hubungi perwakilan penjaminan mutu kami untuk mendapatkan rincian laporan pengujian laboratorium atau informasi sertifikasi ISO kami secara detail.'
    : language === 'jp'
      ? '試験報告書の詳細やISO認証情報について確認されたい場合は、品質管理部門の担当者にお問い合わせください。'
      : language === 'zh'
        ? '请联系我们的质量保证代表，获取详细的实验室检测报告或ISO认证资质信息。'
        : 'Contact our QA representative to request detailed laboratory test reports or specific ISO qualification data.';

  const ctaBtnText = language === 'id'
    ? 'Hubungi Tim QA'
    : language === 'jp'
      ? '品質保証チームに問い合わせる'
      : language === 'zh'
        ? '联系质检团队'
        : 'Contact QA Team';

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.title}>{t.quality.title}</h1>
          <p className={styles.description}>{t.quality.description}</p>
        </header>

        {/* Quality Core Content */}
        <section className={styles.mainContent}>
          <div className={styles.leftCol}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/ISO_Certification.png" 
                alt="ISO 9001:2015 Certificate PT. Starpack Indahmaju"
                width={400}
                height={550}
                className={styles.qualityImage}
                priority
              />
            </div>
          </div>

          <div className={styles.rightCol}>
            <h2 className={styles.subTitle}>{t.quality.commitment.title}</h2>
            
            <div className={styles.accordion}>
              {t.quality.commitment.items.map((item: any, index: number) => (
                <div 
                  key={index} 
                  className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
                >
                  <button 
                    className={styles.accordionHeader} 
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className={styles.triangle}>►</span>
                    {item.title}
                  </button>
                  <div className={styles.accordionContent}>
                    <p className={styles.itemDesc}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testing Capabilities Box */}
            <div className={styles.capabilitiesBox}>
              <h2 className={styles.capabilitiesTitle}>{t.quality.capabilities.title}</h2>
              <ul className={styles.capabilitiesList}>
                {t.quality.capabilities.items.map((item: string, index: number) => (
                  <li key={index} className={styles.capabilityItem}>
                    <span className={styles.bullet}>✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
