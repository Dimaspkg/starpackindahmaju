"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from './qualityPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function QualityCertificationPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && t.quality) {
      document.title = `${t.quality.title} | PT. STARPACK INDAH MAJU`;
    }
  }, [mounted, t]);

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
        
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>{t.quality.title}</h1>
          <p className={styles.heroDesc}>{t.quality.description}</p>
        </section>

        {/* ISO Certification Showcase */}
        <section className={styles.isoSection}>
          <div className={styles.isoContent}>
            <h2 className={styles.isoTitle}>{t.quality.commitment.title}</h2>
            <p className={styles.isoText}>
              {language === 'id' 
                ? 'Sertifikasi ISO 9001:2015 kami bukan sekadar lencana, melainkan bukti komitmen tanpa henti PT. Starpack Indah Maju terhadap keunggulan manufaktur. Setiap proses produksi dikontrol dan dilacak secara presisi.' 
                : language === 'jp'
                  ? '当社のISO 9001:2015認証は単なるバッジではなく、PT. Starpack Indah Majuの製造の卓越性に対する絶え間ない取り組みの証です。すべての製造プロセスは正確に管理および追跡されます。'
                  : language === 'zh'
                    ? '我们的 ISO 9001:2015 认证不仅仅是一枚徽章，更是 PT. Starpack Indah Maju 对卓越制造不懈承诺的证明。每个生产过程都受到精确控制和跟踪。'
                    : 'Our ISO 9001:2015 certification is not just a badge, but a testament to PT. Starpack Indah Maju\'s relentless commitment to manufacturing excellence. Every production process is precisely controlled and tracked.'}
            </p>

            {/* Commitment Points List */}
            {t.quality.commitment.items && t.quality.commitment.items.length > 0 && (
              <div className={styles.commitmentList}>
                {t.quality.commitment.items.map((item: any, idx: number) => (
                  <div key={idx} className={styles.commitmentListItem}>
                    <div className={styles.checkIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div>
                      <h4 className={styles.commitmentListTitle}>{item.title}</h4>
                      <p className={styles.commitmentListText}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.isoImageWrapper}>
            <Image 
              src="/images/ISO_Certification.png" 
              alt="ISO 9001:2015 Certificate PT. Starpack Indah Maju"
              width={500}
              height={700}
              className={styles.isoImage}
              priority
            />
          </div>
        </section>

        {/* CTA Banner */}
        <CTA 
          title={ctaTitle}
          description={ctaDesc}
          btnText={ctaBtnText}
          href="/contact"
        />

      </div>
    </div>
  );
}
