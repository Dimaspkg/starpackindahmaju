"use client";

import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './InsightsSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function InsightsSection() {
  const { t } = useLanguage();

  // Fallback to empty values if translation is not loaded yet
  if (!t.insights) return null;

  return (
    <section className={styles.insightsSection} id="insights">
      <div className={`${styles.header} reveal fadeUp`}>
        <h2 className={styles.title}>{t.insights.title}</h2>
        <p className={styles.description}>{t.insights.description}</p>
      </div>

      <div className={styles.grid}>
        {t.insights.items.map((item: any, index: number) => (
          <LocalizedLink 
            key={item.slug} 
            href={`/insights/${item.slug}`}
            className={`${styles.card} reveal fadeUp delay${index + 1}`}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.articleImage}
                priority={index === 0}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.meta}>
                <span className={styles.category}>{item.category}</span>
                <span className={styles.date}>{item.date}</span>
              </div>
              <h3 className={styles.articleTitle}>{item.title}</h3>
              <p className={styles.articleDesc}>{item.desc}</p>
              <div className={styles.readMore}>
                {t.insights.read_more}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrow}>
                  <path d="M6 12l4-4-4-4" />
                </svg>
              </div>
            </div>
          </LocalizedLink>
        ))}
      </div>

      <div className={`${styles.footerActions} reveal fadeUp delay3`}>
        <LocalizedLink href="/insights" className={styles.viewAllBtn}>
          {t.insights.view_all}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </LocalizedLink>
      </div>
    </section>
  );
}
