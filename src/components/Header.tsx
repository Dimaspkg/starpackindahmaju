"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [mounted, setMounted] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {

    const isCurrentlyDark = 
      theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const languages: { code: 'en' | 'id' | 'zh' | 'jp'; label: string }[] = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: 'CN' },
    { code: 'jp', label: 'JP' },
  ];

  return (
    <div className={`${styles.headerWrapper} ${isScrolled ? styles.headerScrolled : ''}`}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image 
            src={mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
              ? "/logo_starpack_white.png" 
              : "/logo_starpack.png"}
            alt="PT. STARPACK INDAHMAJU Logo" 
            width={400} 
            height={20} 
            className={styles.logoImage}
          />
        </div>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>{t.nav.home}</Link>
          <Link href="/#about" className={styles.navLink}>{t.nav.about}</Link>
          <Link href="/#technology" className={styles.navLink}>{t.nav.technology}</Link>
          <Link href="/#premium" className={styles.navLink}>{t.nav.premium}</Link>
          <Link href="/#industry" className={styles.navLink}>{t.nav.industry}</Link>
          <Link href="/#quality" className={styles.navLink}>{t.nav.quality}</Link>
          <Link href="/#inquiry" className={styles.navLink}>{t.nav.inquiry}</Link>
        </nav>

        <div className={styles.langSwitch}>
          {mounted && (
            <button className={styles.langButton} onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          )}
          
          <div className={styles.langDropdownWrapper}>
            <button className={styles.langButton} onClick={() => setIsLangOpen(!isLangOpen)}>
              {language.toUpperCase()}
            </button>
            {isLangOpen && (
              <div className={styles.langDropdown}>
                {languages.map((lang) => (
                  <button 
                    key={lang.code} 
                    className={styles.langOption} 
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle mobile menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={styles.mobileNavOverlay}>
            <nav className={styles.mobileNav}>
              <Link href="/" className={styles.mobileNavLink} onClick={toggleMenu}>{t.nav.home}</Link>
              <Link href="/#about" className={styles.mobileNavLink} onClick={toggleMenu}>{t.nav.about}</Link>
              <Link href="/#technology" className={styles.mobileNavLink} onClick={toggleMenu}>{t.nav.technology}</Link>
              <Link href="/#premium" className={styles.mobileNavLink} onClick={toggleMenu}>{t.nav.premium}</Link>
              <Link href="/#industry" className={styles.mobileNavLink} onClick={toggleMenu}>{t.nav.industry}</Link>
              <Link href="/#quality" className={styles.mobileNavLink} onClick={toggleMenu}>{t.nav.quality}</Link>
              <Link href="/#inquiry" className={styles.mobileNavLink} onClick={toggleMenu}>{t.nav.inquiry}</Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );

}
