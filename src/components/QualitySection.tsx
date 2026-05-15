"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './QualitySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function QualitySection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
              src="/images/ISO_Certification.png" 
              alt="ISO 9001:2015 Certification"
              width={500}
              height={600}
              className={styles.qualityImage}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className={`${styles.rightCol} reveal fadeRight`}>
          <h3 className={styles.subTitle}>{t.quality.commitment.title}</h3>
          
          <div className={styles.accordion}>
            {t.quality.commitment.items.map((item: any, index: number) => (
              <div 
                key={index} 
                className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}
              >
                <button 
                  className={styles.accordionHeader} 
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={styles.triangle}>►</span>
                  <span className={styles.itemTitle}>{item.title}</span>
                </button>
                <div className={styles.accordionContent}>
                  <p className={styles.itemDesc}>{item.text}</p>
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
