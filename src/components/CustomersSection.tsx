"use client";

import { useState, useEffect } from 'react';
import styles from './CustomersSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface CustomerLogo {
  id: number;
  name: string;
  logo_url: string;
  display_order: number;
}

export default function CustomersSection() {
  const { t } = useLanguage();
  const [logos, setLogos] = useState<CustomerLogo[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle translation fallback safely
  const title = (t as any).customers?.title || "Our Customers";

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch('/api/customers');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setLogos(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch customer logos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  // If loading, show skeleton grids
  if (loading) {
    return (
      <section className={styles.container} id="customers">
        <div className={`${styles.header} reveal fadeUp`}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.line}></div>
        </div>

        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className={styles.logoCard}>
              <div className={styles.skeleton}></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // If no logos are configured, do not render the section
  if (logos.length === 0) return null;

  return (
    <section className={styles.container} id="customers">
      <div className={`${styles.header} reveal fadeUp`}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.line}></div>
      </div>

      <div className={styles.grid}>
        {logos.map((logo, index) => (
          <div 
            key={logo.id} 
            className={`${styles.logoCard} reveal fadeUp`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={logo.logo_url} 
              alt={logo.name} 
              style={{
                maxHeight: '45px',
                maxWidth: '85%',
                objectFit: 'contain',
                filter: 'brightness(0.9) contrast(1.1) grayscale(1)',
                opacity: 0.7,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'none';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(0.9) contrast(1.1) grayscale(1)';
                e.currentTarget.style.opacity = '0.7';
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
