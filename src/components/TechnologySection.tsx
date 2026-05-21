"use client";

import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './TechnologySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function TechnologySection() {
  const { t, language } = useLanguage();

  return (
    <section className={styles.techContainer} id="technology">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.tech.title}</h2>
        <p className={styles.description}>{t.tech.description}</p>
      </div>

      <div className={styles.categoriesList}>
        {t.tech.categories.map((cat: any, index: number) => (
          <div key={index} className={`${styles.categoryCard} reveal fadeUp delay${index}`}>
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
          <div key={index} className={`${styles.galleryCard} reveal fadeUp delay${index}`}>
            <div className={styles.imageWrapper}>
              <Image 
                src={item.image} 
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

      <div className={styles.footerActions}>
        <LocalizedLink href="/technology" className={styles.viewMoreBtn}>
          {language === 'id' ? 'Lihat Detail Mesin & Teknologi Kami' : language === 'jp' ? '機械とテクノロジーの詳細を見る' : language === 'zh' ? '查看我们的设备与技术详情' : 'View Our Machinery & Technology Details'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.5rem' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </LocalizedLink>
      </div>
    </section>
  );
}
