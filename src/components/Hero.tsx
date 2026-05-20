"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import Counter from './Counter';
 
 export default function Hero() {
   const { language, t } = useLanguage();
   const bgRef = useRef<HTMLDivElement>(null);
   const sectionRef = useRef<HTMLElement>(null);
   const [isVisible, setIsVisible] = useState(false);
 
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
            <Image 
              src={t.hero.image || "/images/herro/premium_hero_cosmetic.png"} 
              alt="Premium Cosmetic Packaging Finishing" 
              fill
              priority
              className={styles.bgImage}
            />
          </div>
        </div>

        {/* Right Column: Empty spacer area on desktop */}
        <div className={styles.spacerColumn} />

        {/* Overlapping Text Card */}
        <div className={`${styles.overlapCard} reveal fadeUp active`}>
          <span className={styles.companyLabel}>
            PT. STARPACK INDAHMAJU
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

          <Link href="/about" className={styles.storyBtn}>
            {t.hero.story_btn || "Our Story"}
          </Link>
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
