"use client";

import Image from 'next/image';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <div className={styles.tag}>{t.hero.tag}</div>
        <h1 className={styles.title}>
          {t.hero.title}
        </h1>
        <p className={styles.description}>
          {t.hero.description}
        </p>
        
        <div className={styles.badges}>
          <span className={styles.badge}>{t.hero.badges.iso}</span>
          <span className={styles.badge}>{t.hero.badges.units}</span>
          <span className={styles.badge}>{t.hero.badges.clients}</span>
        </div>

        <div className={styles.actions}>
          <button className={`${styles.button} ${styles.primaryBtn}`}>{t.hero.buttons.quote}</button>
          <button className={`${styles.button} ${styles.secondaryBtn}`}>{t.hero.buttons.explore}</button>
        </div>
      </div>

      <div className={styles.heroVisual}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/uv_coating_hero_1777522954617.png" 
            alt="Coating production" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.heroImage}
            priority
          />
          <div className={styles.overlayCards}>
            <div className={styles.floatingCard}>
              <h4>{t.hero.cards.uv}</h4>
              <p>{t.hero.cards.uv_desc}</p>
            </div>
            <div className={styles.floatingCard}>
              <h4>{t.hero.cards.stable}</h4>
              <p>{t.hero.cards.stable_desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
