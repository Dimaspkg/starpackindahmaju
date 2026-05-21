"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './insightsPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function InsightsPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && t.insights) {
      document.title = `${t.insights.title} | PT STARPACK INDAH MAJU`;
    }
  }, [mounted, t]);

  if (!mounted || !t.insights) return null;

  // Extract unique categories dynamically based on selected language
  const categories = ['all', ...Array.from(new Set(t.insights.items.map((item: any) => item.category)))];

  const filteredItems = selectedCategory === 'all' 
    ? t.insights.items 
    : t.insights.items.filter((item: any) => item.category === selectedCategory);

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.insights.title}</h1>
          <p className={styles.description}>{t.insights.description}</p>
        </header>

        {/* Category Filters */}
        <div className={styles.filterContainer}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.filterTab} ${selectedCategory === category ? styles.activeFilter : ''}`}
            >
              {category === 'all' ? (language === 'id' ? 'Semua' : language === 'jp' ? 'すべて' : language === 'zh' ? '全部' : 'All') : category}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        {filteredItems.length > 0 ? (
          <div className={styles.grid}>
            {filteredItems.map((item: any) => (
              <LocalizedLink 
                key={item.slug} 
                href={`/insights/${item.slug}`}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.articleImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{item.category}</span>
                    <span className={styles.date}>{item.date}</span>
                  </div>
                  <h2 className={styles.articleTitle}>{item.title}</h2>
                  <p className={styles.articleDesc}>{item.desc}</p>
                  <div className={styles.readMore}>
                    {t.insights.read_more}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={styles.arrow}>
                      <path d="M6 12l4-4-4-4" />
                    </svg>
                  </div>
                </div>
              </LocalizedLink>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            Tidak ada artikel di kategori ini.
          </div>
        )}
      </div>
    </div>
  );
}
