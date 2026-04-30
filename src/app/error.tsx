"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './ErrorPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>500</h1>
        <h2 className={styles.title}>{t.errors.general.title}</h2>
        <p className={styles.message}>
          {t.errors.general.message}
        </p>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => reset()}
            className={styles.retryBtn}
          >
            {t.errors.retry}
          </button>
          <Link href="/" className={styles.homeBtn}>
            {t.errors.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
