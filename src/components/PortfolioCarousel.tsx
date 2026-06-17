"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import LocalizedLink from '@/components/LocalizedLink';
import styles from './PortfolioCarousel.module.css';

// Fallback list of logos in case the API is loading or fails
const FALLBACK_LOGOS = [
  "1758525205664.jpg",
  "1758525218296.webp",
  "1758526189938.jpg",
  "1758526207997.png",
  "1758526222238.png",
  "1758526236239.jpg"
];

export default function PortfolioCarousel() {
  const { language } = useLanguage();
  const [logos, setLogos] = useState<string[]>(FALLBACK_LOGOS);

  useEffect(() => {
    // Dynamically fetch all portfolio logos from the server API
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLogos(data);
        }
      })
      .catch(err => console.error("Error fetching portfolio logos:", err));
  }, []);

  const title = language === 'id'
    ? 'Dipercaya oleh Berbagai Brand Terkemuka'
    : language === 'jp'
      ? '主要ブランドからの信頼'
      : language === 'zh'
        ? '深受知名品牌信赖'
        : 'Trusted by Leading Brands';

  const btnText = language === 'id'
    ? 'Lihat Semua Mitra →'
    : language === 'jp'
      ? 'すべてのパートナーを表示 →'
      : language === 'zh'
        ? '查看所有合作伙伴 →'
        : 'View All Partners →';

  // Duplicate the list 3 times to ensure a seamless infinite scrolling marquee
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Title Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* Marquee Track Link */}
        <LocalizedLink href="/portfolio" className={styles.marqueeLink} aria-label={title}>
          <div className={styles.marquee}>
            <div className={styles.track}>
              {duplicatedLogos.map((logo, idx) => (
                <div key={`${logo}-${idx}`} className={styles.logoItem}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={`/images/portofolio/${logo}`}
                      alt={`Portfolio Brand Logo ${idx + 1}`}
                      fill
                      sizes="120px"
                      className={styles.logoImage}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LocalizedLink>

        {/* View All Button */}
        <div className={styles.footer}>
          <LocalizedLink href="/portfolio" className={styles.viewAllBtn}>
            {btnText}
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
}
