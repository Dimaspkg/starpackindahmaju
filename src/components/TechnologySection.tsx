"use client";

import Image from 'next/image';
import styles from './TechnologySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function TechnologySection() {
  const { t } = useLanguage();

  return (
    <section className={styles.techContainer} id="technology">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.tech.title}</h2>
        <p className={styles.description}>{t.tech.description}</p>
      </div>

      <div className={styles.categoriesList}>
        {t.tech.categories.map((cat: any, index: number) => (
          <div key={index} className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>{cat.title}</h3>
            <ul className={styles.itemList}>
              {cat.items.map((item: string, i: number) => (
                <li key={i} className={styles.listItem}>
                  <span className={styles.dot}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.galleryGrid}>
        {t.tech.gallery.map((item: any, index: number) => (
          <div key={index} className={styles.galleryCard}>
            <div className={styles.imageWrapper}>
              <Image 
                src={`/images/tech/tech${index + 1}.png`} 
                alt={item.title}
                width={400}
                height={250}
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.galleryContent}>
              <h4 className={styles.galleryTitle}>{item.title}</h4>
              <p className={styles.galleryDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
