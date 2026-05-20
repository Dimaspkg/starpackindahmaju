"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './IndustrySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function IndustrySection() {
  const { t, language } = useLanguage();

  return (
    <section className={styles.industryContainer} id="industry">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.industry.title}</h2>
        <p className={styles.description}>{t.industry.description}</p>
      </div>

      <div className={styles.grid}>
        {t.industry.items.map((item: any, index: number) => (
          <div 
            key={index} 
            className={`${styles.card} ${index === 5 ? styles.highlight : ''} reveal fadeUp delay${index % 5}`}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.industryImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footerActions}>
        <Link href="/industries" className={styles.viewMoreBtn}>
          {language === 'id' ? 'Lihat Semua Industri yang Kami Layani' : language === 'jp' ? '対応業界の一覧を見る' : language === 'zh' ? '查看我们服务的全部行业' : 'View All Industries We Serve'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
