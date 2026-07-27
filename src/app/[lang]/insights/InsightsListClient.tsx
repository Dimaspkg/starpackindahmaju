"use client";

import { useState } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './insightsPage.module.css';

interface Post {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  status: 'draft' | 'published';
  created_at: string;
}

interface InsightsListClientProps {
  posts: Post[];
  lang: string;
  tInsights: any;
}

export default function InsightsListClient({ posts, lang, tInsights }: InsightsListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories dynamically based on actual posts
  const categories = ['all', ...Array.from(new Set(posts.map((item) => item.category)))];

  const filteredItems = selectedCategory === 'all' 
    ? posts 
    : posts.filter((item) => item.category === selectedCategory);

  const getLabelAll = () => {
    switch (lang) {
      case 'id': return 'Semua';
      case 'jp': return 'すべて';
      case 'zh': return '全部';
      default: return 'All';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{tInsights.title}</h1>
        <p className={styles.description}>{tInsights.description}</p>
      </header>

      {/* Category Filters */}
      <div className={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`${styles.filterTab} ${selectedCategory === category ? styles.activeFilter : ''}`}
          >
            {category === 'all' ? getLabelAll() : category}
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      {filteredItems.length > 0 ? (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <LocalizedLink 
              key={item.slug} 
              href={`/insights/${item.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={item.image || '/images/default_insight.png'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.articleImage}
                  priority={false}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.category}>{item.category}</span>
                  <span className={styles.date}>
                    {new Date(item.created_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className={styles.articleTitle}>{item.title}</h2>
                <p className={styles.articleDesc}>{item.description}</p>
                <div className={styles.readMore}>
                  {tInsights.read_more}
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
          {lang === 'id' ? 'Tidak ada artikel di kategori ini.' : 'No articles in this category.'}
        </div>
      )}
    </div>
  );
}
