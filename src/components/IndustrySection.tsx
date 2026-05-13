"use client";

import Image from 'next/image';
import styles from './IndustrySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function IndustrySection() {
  const { t } = useLanguage();

  return (
    <section className={styles.industryContainer} id="industry">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.industry.title}</h2>
        <p className={styles.description}>{t.industry.description}</p>
      </div>

      <div className={styles.grid}>
        {t.industry.items.map((item: any, index: number) => (
          <div 
            key={index} 
            className={`${styles.card} ${index === 5 ? styles.highlight : ''} reveal fadeUp delay${index % 5}`}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.industryImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
