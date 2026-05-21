"use client";

import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import Counter from './Counter';

const HERO_IMAGES = [
  '/images/herro/herro1.png',
  '/images/herro/herro2.png',
  '/images/herro/herro3.png',
  '/images/herro/herro4.png',
];

export default function Hero() {
  const { language, t } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let requestRef: number;
    
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
      requestRef = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef);
    };
  }, [isVisible]);

  return (
    <div className={styles.heroContainer}>
      <section id="home" ref={sectionRef} className={styles.heroSection}>
        {/* Left Column: Image Container */}
        <div className={styles.imageColumn}>
          <div ref={bgRef} className={styles.heroBackground}>
            {HERO_IMAGES.map((src, index) => (
              <Image 
                key={src}
                src={src} 
                alt={`Premium Cosmetic Packaging Finishing ${index + 1}`} 
                fill
                priority={index === 0}
                className={`${styles.bgImage} ${index === currentImageIndex ? styles.activeImage : styles.inactiveImage}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Empty spacer area on desktop */}
        <div className={styles.spacerColumn} />

        {/* Overlapping Text Card */}
        <div className={`${styles.overlapCard} reveal fadeUp active`}>
          <span className={styles.companyLabel}>
            PT STARPACK INDAH MAJU
          </span>
          
          <h1 className={styles.heroTitle}>
            {t.hero.title}
          </h1>

          <p className={styles.heroTag}>
            {t.hero.tag}
          </p>

          <p className={styles.heroDescription}>
            {t.hero.description}
          </p>

          <LocalizedLink href="/about" className={styles.storyBtn}>
            {t.hero.story_btn || "Our Story"}
          </LocalizedLink>
        </div>
      </section>

      {/* Stats Band Section below the Hero banner */}
      <div className={styles.statsBandSection}>
        <div className={styles.statsInner}>
          <div className={styles.statsGrid}>
            <div className={`${styles.card} reveal fadeUp active delay1`}>
              <span className={styles.lab}>
                {t.hero.badges.units
                  .replace('100Jt+', '')
                  .replace('100M+', '')
                  .replace('100M', '')
                  .replace('10M+', '')
                  .replace('10Jt+', '')
                  .replace('10M', '')
                  .replace('1億個以上', '')
                  .replace('1億', '')
                  .trim()}
              </span>
              <span className={styles.val}>
                <Counter 
                  target={language === 'jp' ? 1 : 100} 
                  suffix={language === 'id' ? 'Jt+' : language === 'jp' ? '億+' : 'M+'} 
                />
              </span>
            </div>
            <div className={`${styles.card} reveal fadeUp active delay2`}>
              <span className={styles.lab}>{t.hero.badges.clients.replace('500+', '').trim()}</span>
              <span className={styles.val}>
                <Counter target={500} suffix="+" />
              </span>
            </div>
            <div className={`${styles.card} reveal fadeUp active delay3`}>
              <span className={styles.lab}>{t.hero.badges.effects.replace('50+', '').replace('50种类', '').replace('50種類', '').replace('20+', '').trim()}</span>
              <span className={styles.val}>
                <Counter target={50} suffix="+" />
              </span>
            </div>
            <div className={`${styles.card} reveal fadeUp active delay4`}>
              <span className={styles.lab}>{t.inquiry.info.location_val}</span>
              <span className={styles.val}>{t.hero.badges.iso}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
