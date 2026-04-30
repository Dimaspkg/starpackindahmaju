"use client";

import styles from './AboutSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.aboutContainer} id="about">
      <div className={styles.content}>

        <div className={styles.tag}>{t.about.tag}</div>
        <h2 className={styles.title}>{t.about.title}</h2>
        <p className={styles.description}>
          {t.about.description}
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t.about.focus.title}</h3>
            <p className={styles.cardText}>{t.about.focus.text}</p>
            <ul className={styles.list}>
              {t.about.focus.items.map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <span className={styles.dot}></span>
                  <span className={styles.itemText}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t.about.glance.title}</h3>
            <ul className={styles.list}>
              {t.about.glance.items.map((item, index) => (
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
