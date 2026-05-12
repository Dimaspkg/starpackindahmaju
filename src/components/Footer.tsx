"use client";

import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Company Branding */}
          <div className={styles.branding}>
            <div className={styles.logoWrapper}>
              <Image 
                src="/logo_starpack.png"
                alt="PT. STARPACK INDAHMAJU Logo" 
                width={200} 
                height={40} 
                className={`${styles.logoImage} logoLight`}
              />
              <Image 
                src="/logo_starpack_white.png"
                alt="PT. STARPACK INDAHMAJU Logo" 
                width={200} 
                height={40} 
                className={`${styles.logoImage} logoDark`}
              />
            </div>
            <p className={styles.description}>
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>{t.footer.quickLinks}</h3>
            <nav className={styles.footerNav}>
              <Link href="/" className={styles.footerLink}>{t.nav.home}</Link>
              <Link href="/#about" className={styles.footerLink}>{t.nav.about}</Link>
              <Link href="/#technology" className={styles.footerLink}>{t.nav.technology}</Link>
              <Link href="/#premium" className={styles.footerLink}>{t.nav.premium}</Link>
              <Link href="/#industry" className={styles.footerLink}>{t.nav.industry}</Link>
              <Link href="/#quality" className={styles.footerLink}>{t.nav.quality}</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className={styles.contactColumn}>
            <h3 className={styles.columnTitle}>{t.footer.contact}</h3>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                <span className={styles.icon}>📍</span>
                {t.footer.address}
              </p>
              <p className={styles.contactItem}>
                <span className={styles.icon}>📞</span>
                <a href={`tel:${t.inquiry.sales.phone}`}>{t.inquiry.sales.phone}</a>
              </p>
              <p className={styles.contactItem}>
                <span className={styles.icon}>✉️</span>
                <a href={`mailto:${t.inquiry.sales.email}`}>{t.inquiry.sales.email}</a>
              </p>
            </div>
          </div>

          {/* Maps */}
          <div className={styles.mapColumn}>
            <div className={styles.mapWrapper}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5494534882832!2d106.91550937499011!3d-6.190988293796628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b36828e22e9%3A0x2a2b557b1158e2ba!2sPT.%20Starpack%20Indah%20Maju!5e0!3m2!1sen!2sid!4v1778560000971!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className={styles.mapIframe}
              ></iframe>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} PT. Starpack Indahmaju. All rights reserved.
          </p>
        </div>
      </div>
      </footer>
    </div>
  );
}
