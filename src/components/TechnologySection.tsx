"use client";

import styles from './TechnologySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function TechnologySection() {
  const { t } = useLanguage();

  return (
    <section className={styles.techContainer}>
      <div className={styles.content}>
        <div className={styles.tag}>{t.tech.tag}</div>
        <h2 className={styles.title}>{t.tech.title}</h2>
        <p className={styles.description}>
          {t.tech.description}
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t.tech.strength.title}</h3>
            <div className={styles.itemList}>
              {t.tech.strength.items.map((item: any, index: number) => (
                <div key={index} className={styles.item}>
                  <div className={styles.itemBadge}>{item.id}</div>
                  <div className={styles.itemContent}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t.tech.highlights.title}</h3>
            <div className={styles.itemList}>
              {t.tech.highlights.items.map((item: any, index: number) => (
                <div key={index} className={styles.item}>
                  <div className={styles.itemBadge}>{item.id}</div>
                  <div className={styles.itemContent}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
