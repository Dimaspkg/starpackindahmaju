"use client";

import Image from 'next/image';
import styles from './AboutSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.aboutContainer} id="about">
      <h2 className={styles.mainTitle}>{t.about.title}</h2>
      
      <div className={styles.grid}>
        <div className={styles.textContent}>
          <div className={styles.subSection}>
            <h3 className={styles.subTitle}>{t.about.story.title}</h3>
            <p className={styles.text}>{t.about.story.text}</p>
          </div>

          <div className={styles.subSection}>
            <h3 className={styles.subTitle}>{t.about.mission.title}</h3>
            <p className={styles.text}>{t.about.mission.text}</p>
          </div>

          <div className={styles.subSection}>
            <h3 className={styles.subTitle}>{t.about.values.title}</h3>
            <ul className={styles.valuesList}>
              {t.about.values.items.map((item: any, index: number) => (
                <li key={index} className={styles.valueItem}>
                  <span className={styles.bullet}>►</span>
                  <span className={styles.itemTitle}>{item.title}:</span>
                  <span className={styles.itemText}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.imageArea}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/images/factory_inside.png" 
              alt="Starpack Factory" 
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
