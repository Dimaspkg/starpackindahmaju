"use client";

import React, { useEffect } from 'react';
import LocalizedLink from "@/components/LocalizedLink";
import Image from 'next/image';
import styles from './ErrorPage.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { useUI } from '@/context/UIContext';

export default function NotFound() {
  const { t } = useLanguage();
  const { setIsNotFound } = useUI();

  useEffect(() => {
    setIsNotFound(true);
    return () => {
      setIsNotFound(false);
    };
  }, [setIsNotFound]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image 
            src="/logo_starpack.png" 
            alt="PT STARPACK INDAHMAJU" 
            width={200} 
            height={40} 
            className="logoLight"
            priority
          />
          <Image 
            src="/logo_starpack_white.png" 
            alt="PT STARPACK INDAHMAJU" 
            width={200} 
            height={40} 
            className="logoDark"
            priority
          />
        </div>
        <h2 className={styles.title}>{t.errors['404'].title}</h2>
        <p className={styles.message}>
          {t.errors['404'].message}
        </p>
        <div className={styles.buttonGroup}>
          <LocalizedLink href="/" className={styles.homeBtn}>
            {t.errors.button}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
}
