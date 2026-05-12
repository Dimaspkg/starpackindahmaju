"use client";

import Image from 'next/image';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className={styles.heroSection}>
      <header className={styles.header}>
        <h2 className={styles.companyName}>PT. Starpack Indahmaju</h2>
        <h1 className={styles.headline}>
          {t.hero.title}
        </h1>
        <p className={styles.subHeadline}>{t.hero.tag}</p>
      </header>

      <div className={styles.visualContainer}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/uv_coating.png" 
            alt="UV Coating Production" 
            width={1200}
            height={600}
            className={styles.mainImage}
            priority
          />
          <div className={styles.imageOverlay} />
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{t.hero.badges.units.split(' ')[0]}</div>
          <div className={styles.statLabel}>{t.hero.badges.units}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{t.hero.badges.clients.split(' ')[0]}</div>
          <div className={styles.statLabel}>{t.hero.badges.clients}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>Since 1996</div>
          <div className={styles.statLabel}>Jakarta, Indonesia</div>
        </div>
      </div>

      <div className={styles.description}>
        <p>{t.hero.description}</p>
      </div>
    </section>
  );
}
