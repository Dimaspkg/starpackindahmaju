import React from 'react';
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
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>{title}</h2>
        <p className={styles.ctaDesc}>{description}</p>
      </div>
      <div className={styles.ctaButtons}>
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
