"use client";

import Image from 'next/image';
import styles from './EffectsSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function EffectsSection() {
  const { t } = useLanguage();

  return (
    <section className={styles.effectsContainer} id="premium">
      <div className={styles.content}>
        <div className={styles.tag}>{t.effects.tag}</div>
        <h2 className={styles.title}>{t.effects.title}</h2>
        <p className={styles.description}>
          {t.effects.description}
        </p>

        <div className={styles.grid}>
          {t.effects.items.map((item: any, index: number) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={`/images/effects/effect${index + 1}.png`}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
      </div>
    </section>
  );
}
