"use client";

import { useRef } from 'react';
import Image from 'next/image';
import LocalizedLink from './LocalizedLink';
import styles from './EffectsSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function EffectsSection() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth > 768 ? 400 : 300;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth > 768 ? 400 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.effectsContainer} id="premium">
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>{t.effects.title}</h2>
          <p className={styles.description}>{t.effects.description}</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.carouselControls}>
            <button onClick={scrollLeft} className={styles.controlBtn} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={scrollRight} className={styles.controlBtn} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.carouselContainer} ref={carouselRef}>
        {t.effects.items.map((item: any, index: number) => (
          <div key={index} className={styles.carouselItem}>
            <div className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.effectImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actionContainer}>
        <LocalizedLink href="/technology/vacuum-metallizing" className={styles.primaryBtn}>
          {t.hero.buttons.explore || "Explore Coating Effects"}
        </LocalizedLink>
      </div>
    </section>
  );
}
