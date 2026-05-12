"use client";

import Image from 'next/image';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className={styles.heroSection}>
      <div className={styles.textContainer}>
        <h2 className={styles.companyName}>PT. Starpack Indahmaju</h2>
        <h1 className={styles.headline}>
          {t.hero.title}
        </h1>
        <p className={styles.subHeadline}>{t.hero.tag}</p>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.imageBox}>
          <Image 
            src="/images/uv_coating.png" 
            alt="Product finishing" 
            width={400}
            height={280}
            className={styles.img}
            priority
          />
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.card}>
          <span className={styles.val}>10M+</span>
          <span className={styles.lab}>{t.hero.badges.units.replace('10M+', '').trim()}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.val}>500+</span>
          <span className={styles.lab}>{t.hero.badges.clients.replace('500+', '').trim()}</span>
        </div>
        <div className={styles.card}>
          <span className={styles.val}>Since 1996</span>
          <span className={styles.lab}>Jakarta, Indonesia</span>
        </div>
      </div>

      <div className={styles.descBox}>
        <p>{t.hero.description}</p>
      </div>
    </section>
  );
}
