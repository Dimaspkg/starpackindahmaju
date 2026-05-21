"use client";

import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageDropdown from './LanguageDropdown';

export default function Sidebar() {
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (pathname === '/about') {
      setActiveSection('about');
    } else if (pathname === '/technology') {
      setActiveSection('technology');
    } else if (pathname === '/industries') {
      setActiveSection('industry');
    } else if (pathname === '/quality-certification') {
      setActiveSection('quality');
    } else if (pathname === '/contact') {
      setActiveSection('contact');
    } else if (pathname === '/insights' || pathname.startsWith('/insights/')) {
      setActiveSection('insights');
    } else if (pathname === '/') {
      setActiveSection('home');
    }
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (pathname !== '/') return;

      const currentScrollY = window.scrollY;
      
      // Auto-hide header logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);

      // Active section tracking
      const sections = ['home', 'about', 'technology', 'premium', 'industry', 'quality', 'customers', 'insights', 'inquiry'];
      const scrollPos = currentScrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, pathname]);

  if (!mounted) return null;

  const navItems = [
    { id: 'home', label: t.nav.home, href: '/' },
    { id: 'about', label: t.nav.about, href: pathname === '/' ? '/#about' : '/about' },
    { id: 'technology', label: t.nav.technology, href: pathname === '/' ? '/#technology' : '/technology' },
    { id: 'premium', label: t.nav.premium, href: '/#premium' },
    { id: 'industry', label: t.nav.industry, href: pathname === '/' ? '/#industry' : '/industries' },
    { id: 'quality', label: t.nav.quality, href: pathname === '/' ? '/#quality' : '/quality-certification' },
    { id: 'customers', label: t.nav.customers, href: '/#customers' },
    { id: 'insights', label: t.nav.insights, href: '/#insights' },
    { id: 'inquiry', label: t.nav.inquiry, href: '/#inquiry' },
    { id: 'contact', label: t.nav.contact ?? 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className={`${styles.mobileHeader} ${!showHeader ? styles.headerHidden : ''}`}>
        <div className={styles.logoSmall}>
          <Image src="/logo_starpack.png" alt="Logo" width={120} height={20} style={{ objectFit: 'contain' }} className="logoLight" />
          <Image src="/logo_starpack_white.png" alt="Logo" width={120} height={20} style={{ objectFit: 'contain' }} className="logoDark" />
        </div>
        <div className={styles.mobileActions}>
          <LanguageDropdown />
          <ThemeToggle />
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} className={styles.menuBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.topSection}>
          <div className={styles.logoContainer}>
            <Image 
              src="/logo_starpack.png" 
              alt="PT. STARPACK INDAH MAJU" 
              width={200} 
              height={40} 
              className={`${styles.logo} logoLight`}
              priority
            />
            <Image 
              src="/logo_starpack_white.png" 
              alt="PT. STARPACK INDAH MAJU" 
              width={200} 
              height={40} 
              className={`${styles.logo} logoDark`}
              priority
            />
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <LocalizedLink 
                key={item.id}
                href={item.href}
                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </LocalizedLink>
            ))}
          </nav>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.langSwitch}>
            {['id', 'en', 'zh', 'jp'].map((lang) => (
              <button 
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={`${styles.langBtn} ${language === lang ? styles.langActive : ''}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <div className={styles.copyright}>
            © 2026 PT. Starpack Indah Maju
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileOpen && <div className={styles.overlay} onClick={() => setIsMobileOpen(false)} />}
    </>
  );
}
