"use client";

import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} PT. Starpack Indahmaju. UV Coating Plastik.
        </p>
      </div>
    </footer>
  );
}
