"use client";

import Image from 'next/image';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className={styles.heroSection}>
      <header className={styles.header} style={{ position: 'relative', zIndex: 10 }}>
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
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>10M+</div>
          <div className={styles.statLabel}>{t.hero.badges.units.replace('10M+', '').trim()}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>500+</div>
          <div className={styles.statLabel}>{t.hero.badges.clients.replace('500+', '').trim()}</div>
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
