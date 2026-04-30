"use client";

import styles from './IndustrySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function IndustrySection() {
  const { t } = useLanguage();

  return (
    <section className={styles.industryContainer}>
      <div className={styles.content}>
        <div className={styles.tag}>{t.industry.tag}</div>
        <h2 className={styles.title}>{t.industry.title}</h2>
        <p className={styles.description}>
          {t.industry.description}
        </p>

        <div className={styles.mainCard}>
          <div className={styles.pillContainer}>
            {t.industry.pills.map((pill: string, index: number) => (
              <span key={index} className={styles.pill}>
                {pill}
              </span>
            ))}
          </div>
          <p className={styles.footerText}>
            {t.industry.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
