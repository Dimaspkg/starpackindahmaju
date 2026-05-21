"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from './LocalizedLink';
import styles from './EffectsSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function EffectsSection() {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.clientWidth;
        const gap = parseFloat(getComputedStyle(carouselRef.current).gap) || 40;
        carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.clientWidth;
        const gap = parseFloat(getComputedStyle(carouselRef.current).gap) || 40;
        carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout;

    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        const card = container.firstElementChild as HTMLElement;
        if (card) {
          const cardWidth = card.clientWidth;
          const gap = parseFloat(getComputedStyle(container).gap) || 40;
          const scrollAmount = cardWidth + gap;
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScrollLeft - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
          }
        }
      }, 4000); // Auto-scroll every 4 seconds
    };

    startAutoScroll();

    // Pause on hover
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startAutoScroll();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className={styles.effectsContainer} id="premium">
      <div className={`${styles.header} reveal`}>
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

      <div className={`${styles.carouselContainer} reveal delay1`} ref={carouselRef}>
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

      <div className={`${styles.actionContainer} reveal delay2`}>
        <LocalizedLink href="/technology/uv-coating" className={styles.primaryBtn}>
          {t.hero.buttons.explore || "Explore Coating Effects"}
        </LocalizedLink>
      </div>
    </section>
  );
}
