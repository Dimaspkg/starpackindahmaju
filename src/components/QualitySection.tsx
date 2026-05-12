"use client";

import Image from 'next/image';
import styles from './QualitySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function QualitySection() {
  const { t } = useLanguage();

  return (
    <section className={styles.qualityContainer} id="quality">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.quality.title}</h2>
        <p className={styles.description}>{t.quality.description}</p>
      </div>

      <div className={styles.mainContent}>
        <div className={`${styles.leftCol} reveal fadeLeft`}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/images/quality/quality-main.png" 
              alt="Quality Control"
              width={500}
              height={400}
              className={styles.qualityImage}
            />
          </div>
        </div>

        <div className={`${styles.rightCol} reveal fadeRight`}>
          <h3 className={styles.subTitle}>{t.quality.commitment.title}</h3>
          
          <div className={styles.commitmentList}>
            {t.quality.commitment.items.map((item: any, index: number) => (
              <div key={index} className={styles.commitmentItem}>
                <span className={styles.triangle}>►</span>
                <div className={styles.itemText}>
                  <span className={styles.itemTitle}>{item.title}:</span>
                  <span className={styles.itemDesc}> {item.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={`${styles.capabilitiesBox} reveal fadeUp`}>
            <h4 className={styles.capabilitiesTitle}>{t.quality.capabilities.title}</h4>
            <ul className={styles.capabilitiesList}>
              {t.quality.capabilities.items.map((item: string, index: number) => (
                <li key={index} className={styles.capabilityItem}>
                  <span className={styles.bullet}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
