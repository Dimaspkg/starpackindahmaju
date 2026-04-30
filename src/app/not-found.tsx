"use client";

import Link from 'next/link';
import styles from './ErrorPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>{t.errors['404'].title}</h2>
        <p className={styles.message}>
          {t.errors['404'].message}
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/" className={styles.homeBtn}>
            {t.errors.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
