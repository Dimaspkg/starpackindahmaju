"use client";

import React, { useState, useEffect, useRef } from 'react';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './CTA.module.css';

interface CTAProps {
  title: string;
  description: string;
  btnText: string;
  href?: string;
  secondaryBtnText?: string;
  secondaryHref?: string;
}

export default function CTA({ title, description, btnText, href = "/contact", secondaryBtnText, secondaryHref }: CTAProps) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isIntersecting, setIsIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let isMounted = true;
    let timer: NodeJS.Timeout;

    const typeSpeed = 85;      // Slower typing speed (85ms per letter)
    const deleteSpeed = 40;    // Deleting speed (40ms per letter)
    const pauseDuration = 3000; // Hold the completed text for 3 seconds

    const runTypewriter = async () => {
      while (isMounted) {
        // 1. Typing Phase
        for (let i = 0; i <= title.length; i++) {
          if (!isMounted) return;
          setDisplayedTitle(title.slice(0, i));
          await new Promise((resolve) => { timer = setTimeout(resolve, typeSpeed); });
        }

        // 2. Pause Phase (at full text)
        await new Promise((resolve) => { timer = setTimeout(resolve, pauseDuration); });

        // 3. Deleting Phase
        for (let i = title.length; i >= 0; i--) {
          if (!isMounted) return;
          setDisplayedTitle(title.slice(0, i));
          await new Promise((resolve) => { timer = setTimeout(resolve, deleteSpeed); });
        }

        // 4. Short Pause at the end before typing again
        await new Promise((resolve) => { timer = setTimeout(resolve, 600); });
      }
    };

    runTypewriter();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isIntersecting, title]);

  return (
    <section className={styles.ctaSection}>
      <div className={`${styles.ctaContent} reveal`} ref={containerRef}>
        <h2 className={styles.ctaTitle}>
          {displayedTitle}
          <span className={styles.cursor}>|</span>
        </h2>
        <p className={styles.ctaDesc}>{description}</p>
      </div>
      <div className={`${styles.ctaButtons} reveal delay1`}>
        <LocalizedLink href={href} className={styles.ctaBtn}>
          {btnText}
        </LocalizedLink>
        {secondaryBtnText && secondaryHref && (
          <LocalizedLink href={secondaryHref} className={styles.ctaBtnSecondary}>
            {secondaryBtnText}
          </LocalizedLink>
        )}
      </div>
    </section>
  );
}
