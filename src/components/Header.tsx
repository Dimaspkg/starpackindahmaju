"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useLanguage } from '@/context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageDropdown from './LanguageDropdown';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine active section from pathname
  useEffect(() => {
    if (!pathname) return;
    
    // Strip language prefix (e.g. /id, /en, /zh, /jp) to match paths correctly
    const cleanPath = pathname.replace(/^\/(id|en|zh|jp)/, '') || '/';

    if (cleanPath === '/about') setActiveSection('about');
    else if (cleanPath === '/technology' || cleanPath.startsWith('/technology/')) setActiveSection('technology');
    else if (cleanPath === '/industries' || cleanPath.startsWith('/industries/')) setActiveSection('industry');
    else if (cleanPath === '/quality-certification') setActiveSection('quality');
    else if (cleanPath === '/insights' || cleanPath.startsWith('/insights/')) setActiveSection('insights');
    else if (cleanPath === '/contact') setActiveSection('contact');
    else if (cleanPath === '/') setActiveSection('home');
    else setActiveSection('');
  }, [pathname]);

  // Scroll behavior
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY && currentY > 80) setHidden(true);
      else setHidden(false);
      setLastScrollY(currentY);

      // Scroll-spy removed: active state is now strictly route-based
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  const cleanPath = pathname ? pathname.replace(/^\/(id|en|zh|jp)/, '') || '/' : '/';
  const isHome = cleanPath === '/';

  const navItems = [
    { id: 'home',       label: t.nav.home,       href: '/' },
    { id: 'about',      label: t.nav.about,      href: '/about' },
    { 
      id: 'technology', 
      label: t.nav.technology, 
      href: '/technology',
      subItems: [
        { 
          label: language === 'jp' ? 'UVコーティング' : language === 'zh' ? 'UV涂装' : 'UV Coating', 
          href: '/technology/uv-coating',
          description: language === 'id' 
            ? 'Pelapisan semprot presisi tinggi dengan pengerasan sinar UV instan untuk hasil akhir tahan gores.'
            : language === 'jp'
              ? '高精度なスプレー塗工と瞬間UV硬化により、耐久性と耐擦傷性に優れた仕上がりを実現。'
              : language === 'zh'
                ? '高精度喷涂工艺与瞬间UV固化，打造卓越耐磨的保护涂层。'
                : 'High-precision spray coating with instant UV curing for extremely durable, scratch-resistant finishes.'
        },
        { 
          label: language === 'jp' ? '真空蒸着' : language === 'zh' ? '真空电镀' : 'Vacuum Metallizing', 
          href: '/technology/vacuum-metallizing',
          description: language === 'id' 
            ? 'Deposisi logam dalam ruang hampa udara untuk menciptakan efek cermin krom, emas, dan perak yang mewah.'
            : language === 'jp'
              ? '真空チャンバー内での金属堆積により、鏡面のようなシルバー、ゴールド、クロームの質感を付与。'
              : language === 'zh'
                ? '真空腔体金属沉积工艺，打造如镜面般的金、银、铬豪华金属质感。'
                : 'Advanced vacuum chamber metal deposition for luxurious mirror-like silver, gold, and chrome finishes.'
        }
      ]
    },
    { 
      id: 'industry',   
      label: t.nav.industry,   
      href: '/industries',
      subItems: [
        { 
          label: language === 'id' ? 'Kecantikan & Kosmetik' : language === 'jp' ? '美容・化粧品' : language === 'zh' ? '美容与化妆品' : 'Beauty & Cosmetics',
          href: '/industries/beauty-cosmetics',
          description: language === 'id' ? 'Pelapisan mewah untuk kemasan kosmetik premium.' : language === 'jp' ? 'プレミアム化粧品パッケージ用の豪華なコーティング。' : language === 'zh' ? '用于高级化妆品包装的豪华涂层。' : 'Luxurious coatings for premium cosmetic packaging.'
        },
        { 
          label: language === 'id' ? 'Elektronik Konsumen' : language === 'jp' ? '家電製品' : language === 'zh' ? '消费电子' : 'Consumer Electronics',
          href: '/industries/electronics',
          description: language === 'id' ? 'Perlindungan anti gores elegan untuk perangkat elektronik.' : language === 'jp' ? '電子デバイス向けのエレガントな傷防止保護。' : language === 'zh' ? '电子设备的优雅防刮保护。' : 'Elegant anti-scratch protection for electronic devices.'
        },
        { 
          label: language === 'id' ? 'Fashion & Aksesoris' : language === 'jp' ? 'ファッション＆アクセサリー' : language === 'zh' ? '时尚与配饰' : 'Fashion & Accessories',
          href: '/industries/fashion-accessories',
          description: language === 'id' ? 'Sentuhan estetika mengkilap dan bebas kusam.' : language === 'jp' ? '光沢のある色褪せない美的なタッチ。' : language === 'zh' ? '光泽且不褪色的美学触感。' : 'Glossy, tarnish-free aesthetic touches.'
        },
        { 
          label: language === 'id' ? 'Peralatan Rumah' : language === 'jp' ? 'ホーム＆ライフスタイル' : language === 'zh' ? '家居与生活方式' : 'Home & Lifestyle',
          href: '/industries/home-lifestyle',
          description: language === 'id' ? 'Lapisan tahan suhu dan goresan untuk perlengkapan rumah.' : language === 'jp' ? '家庭用品向けの耐熱・耐傷コーティング。' : language === 'zh' ? '家用电器的耐温防刮涂层。' : 'Temperature and scratch-resistant coatings for household items.'
        },
        { 
          label: language === 'id' ? 'Otomotif' : language === 'jp' ? '自動車' : language === 'zh' ? '汽车' : 'Automotive',
          href: '/industries/automotive',
          description: language === 'id' ? 'Pelapisan komponen plastik dengan standar keamanan tinggi.' : language === 'jp' ? '高い安全基準を満たすプラスチック部品のコーティング。' : language === 'zh' ? '符合高安全标准的塑料部件涂层。' : 'Plastic component coatings meeting strict safety standards.'
        },
        { 
          label: language === 'id' ? 'Dan Banyak Lagi' : language === 'jp' ? 'その他多数' : language === 'zh' ? '以及更多' : 'Many More',
          href: '/industries/many-more',
          description: language === 'id' ? 'Solusi pelapisan kustom untuk berbagai sektor lainnya.' : language === 'jp' ? '他のさまざまな分野向けのカスタムコーティングソリューション。' : language === 'zh' ? '适用于各种其他领域的定制涂层解决方案。' : 'Custom coating solutions for a variety of other sectors.'
        }
      ]
    },
    { id: 'quality',    label: t.nav.quality,    href: '/quality-certification' },
    { id: 'insights',   label: t.nav.insights,   href: '/insights' },
  ];

  const langs: { code: string; label: string }[] = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'zh', label: 'ZH' },
    { code: 'jp', label: 'JP' },
  ];

  return (
    <>
      <header
        className={[
          styles.header,
          scrolled ? styles.scrolled : '',
          hidden ? styles.hidden : '',
        ].join(' ')}
        id="site-header"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <LocalizedLink href="/" className={styles.logo} aria-label="PT STARPACK INDAH MAJU - Home">
            <Image
              src="/logo_starpack.png"
              alt="Starpack"
              width={170}
              height={40}
              className="logoLight"
              priority
              style={{ objectFit: 'contain' }}
            />
            <Image
              src="/logo_starpack_white.png"
              alt="Starpack"
              width={170}
              height={40}
              className="logoDark"
              priority
              style={{ objectFit: 'contain' }}
            />
          </LocalizedLink>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <div key={item.id} className={styles.navDropdownContainer}>
                    <LocalizedLink
                      href={item.href}
                      className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''} ${styles.hasSub}`}
                    >
                      {item.label}
                      <svg className={styles.chevron} width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </LocalizedLink>
                    <div className={styles.megaMenuPanel}>
                      <div className={styles.megaMenuInner}>
                        <div className={styles.megaMenuGrid}>
                          {item.subItems.map((sub, i) => (
                            <LocalizedLink key={i} href={sub.href} className={styles.megaMenuItem}>
                              <h3 className={styles.megaMenuTitle}>{sub.label}</h3>
                              <p className={styles.megaMenuDesc}>{sub.description}</p>
                            </LocalizedLink>
                          ))}
                        </div>
                        <div className={styles.megaMenuBottom}>
                          <LocalizedLink href={item.href} className={styles.viewAllTechLink}>
                            {item.id === 'technology' 
                              ? (language === 'id' ? 'Lihat Semua Teknologi' : language === 'jp' ? 'すべての技術を見る' : language === 'zh' ? '查看所有技术' : 'View All Technologies')
                              : (language === 'id' ? 'Lihat Semua Industri' : language === 'jp' ? 'すべての産業を見る' : language === 'zh' ? '查看所有行业' : 'View All Industries')
                            }
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '6px' }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </LocalizedLink>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <LocalizedLink
                  key={item.id}
                  href={item.href}
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                >
                  {item.label}
                </LocalizedLink>
              );
            })}
            <LocalizedLink
              href="/contact"
              className={`${styles.navLink} ${styles.ctaBtn} ${activeSection === 'contact' ? styles.active : ''}`}
            >
              {t.nav.contact ?? 'Contact'}
            </LocalizedLink>
          </nav>

          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.desktopControlsOnly}>
              {/* Language Dropdown with Globe Icon */}
              <LanguageDropdown />

              <ThemeToggle />
            </div>

            {/* Mobile menu toggle */}
            <button
              className={`${styles.mobileToggle} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav
        className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => {
          if (item.subItems) {
            return (
              <div key={item.id} className={styles.mobileDropdownContainer}>
                <LocalizedLink
                  href={item.href}
                  className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </LocalizedLink>
                <div className={styles.mobileSubMenu}>
                  {item.subItems.map((sub, i) => (
                    <LocalizedLink
                      key={i}
                      href={sub.href}
                      className={styles.mobileSubNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </LocalizedLink>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <LocalizedLink
              key={item.id}
              href={item.href}
              className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </LocalizedLink>
          );
        })}
        <div className={styles.mobileDivider} />
        <LocalizedLink
          href="/contact"
          className={`${styles.mobileNavLink} ${activeSection === 'contact' ? styles.active : ''}`}
          onClick={() => setMobileOpen(false)}
          style={{ color: 'var(--primary)', fontWeight: 700 }}
        >
          {t.nav.contact ?? 'Contact'}
        </LocalizedLink>
        <div className={styles.mobileDivider} />
        <div className={styles.mobileControls}>
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLanguage(l.code as any); setMobileOpen(false); }}
              style={{
                padding: '0.4rem 0.7rem',
                fontSize: '0.8rem',
                fontWeight: language === l.code ? 700 : 500,
                color: language === l.code ? '#ffffff' : 'var(--muted-text)',
                background: language === l.code ? 'var(--primary)' : 'transparent',
                borderRadius: '4px',
                border: '1px solid var(--card-border)',
                cursor: 'pointer',
              }}
            >
              {l.label}
            </button>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      {/* Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 998,
            background: 'rgba(0,0,0,0.5)',
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
