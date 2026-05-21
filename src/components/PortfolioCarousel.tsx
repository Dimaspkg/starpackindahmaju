"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
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
    ? 'Dipercaya oleh Merek Kosmetik & Kemasan Terkemuka'
    : language === 'jp'
      ? '主要な化粧品・包装ブランドからの信頼'
      : language === 'zh'
        ? '深受知名化妆品及包装品牌信赖'
        : 'Trusted by Leading Cosmetic & Packaging Brands';

  // Duplicate the list 3 times to ensure a seamless infinite scrolling marquee
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
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
      </div>
    </section>
  );
}
