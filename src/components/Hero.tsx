"use client";

import Image from 'next/image';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const { t } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestRef: number;
    
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      requestRef = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <section id="home" className={styles.heroSection}>
      <div 
        ref={bgRef}
        className={styles.heroBackground}
      >
        <Image 
          src="/images/uv_coating.png" 
          alt="Product finishing background" 
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.heroContent}>
        <div className={`${styles.textContainer} reveal fadeUp active`}>
          <h2 className={styles.companyName}>PT. Starpack Indahmaju</h2>
          <h1 className={styles.headline}>
            {t.hero.title}
          </h1>
          <p className={styles.subHeadline}>{t.hero.tag}</p>
        </div>

        <div className={styles.statsContainer}>
          <div className={`${styles.card} reveal fadeUp active delay1`}>
            <span className={styles.val}>10M+</span>
            <span className={styles.lab}>{t.hero.badges.units.replace('10M+', '').trim()}</span>
          </div>
          <div className={`${styles.card} reveal fadeUp active delay2`}>
            <span className={styles.val}>500+</span>
            <span className={styles.lab}>{t.hero.badges.clients.replace('500+', '').trim()}</span>
          </div>
          <div className={`${styles.card} reveal fadeUp active delay3`}>
            <span className={styles.val}>Since 1996</span>
            <span className={styles.lab}>Jakarta, Indonesia</span>
          </div>
        </div>

        <div className={styles.descBox}>
          <p>{t.hero.description}</p>
        </div>
      </div>
    </section>
  );
}
