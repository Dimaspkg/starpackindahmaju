"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutSection() {
  const { t, language } = useLanguage();

  return (
    <section className={styles.aboutContainer} id="about">
      <h2 className={styles.mainTitle}>{t.about.title}</h2>
      
      <div className={styles.grid}>
        <div className={styles.textContent}>
          <div className={`${styles.subSection} reveal fadeUp`}>
            <h3 className={styles.subTitle}>{t.about.story.title}</h3>
            <p className={styles.text}>{t.about.story.text}</p>
          </div>

          <div className={`${styles.subSection} reveal fadeUp delay1`}>
            <h3 className={styles.subTitle}>{t.about.mission.title}</h3>
            <p className={styles.text}>{t.about.mission.text}</p>
          </div>

          <div className={`${styles.subSection} reveal fadeUp delay2`}>
            <h3 className={styles.subTitle}>{t.about.values.title}</h3>
            <ul className={styles.valuesList}>
              {t.about.values.items.map((item: any, index: number) => (
                <li key={index} className={styles.valueItem}>
                  <span className={styles.bullet}>►</span>
                  <div className={styles.contentRow}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.colon}>:</span>
                    <span className={styles.itemText}>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="/about" className={styles.readMoreBtn}>
                {language === 'id' ? 'Selengkapnya Tentang Kami' : language === 'jp' ? '当社について詳しく' : language === 'zh' ? '了解更多关于我们' : 'Read More About Us'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className={`${styles.imageArea} reveal fadeRight`}>
          <div className={styles.imageWrapper}>
            <Image 
              src={t.about.image} 
              alt="Starpack Factory" 
              fill
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
