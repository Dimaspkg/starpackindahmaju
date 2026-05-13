"use client";

import Image from 'next/image';
import styles from './EffectsSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function EffectsSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.effectsContainer} id="premium">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.effects.title}</h2>
        <p className={styles.description}>{t.effects.description}</p>
      </div>

      <div className={styles.grid}>
        {t.effects.items.map((item: any, index: number) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image 
                src={`/images/effects/effect${index + 1}.png?v=2`}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.effectImage}
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
