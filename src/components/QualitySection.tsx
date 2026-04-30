"use client";

import styles from './QualitySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function QualitySection() {
  const { t } = useLanguage();

  return (
    <section className={styles.qualityContainer}>
      <div className={styles.content}>
        <div className={styles.tag}>{t.quality.tag}</div>
        <h2 className={styles.title}>{t.quality.title}</h2>
        <p className={styles.description}>
          {t.quality.description}
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t.quality.iso.title}</h3>
            <p className={styles.cardText}>{t.quality.iso.text}</p>
            <ul className={styles.list}>
              {t.quality.iso.items.map((item: string, index: number) => (
                <li key={index} className={styles.listItem}>
                  <span className={styles.dot}></span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t.quality.standards.title}</h3>
            <ul className={styles.list}>
              {t.quality.standards.items.map((item: string, index: number) => (
                <li key={index} className={styles.listItem}>
                  <span className={styles.dot}></span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
