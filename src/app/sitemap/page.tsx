"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './sitemapPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function SitemapPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Sitemap | PT. STARPACK INDAHMAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    title: language === 'id' ? 'Peta Situs' : language === 'jp' ? 'サイトマップ' : language === 'zh' ? '网站地图' : 'Sitemap',
    desc: language === 'id' ? 'Navigasi lengkap seluruh halaman website PT. Starpack Indahmaju.' : language === 'jp' ? 'PT. Starpack Indahmaju の全ウェブサイトページの完全なナビゲーション。' : language === 'zh' ? 'PT. Starpack Indahmaju 所有网站页面的完整导航。' : 'Complete navigation of all PT. Starpack Indahmaju website pages.',
    
    sections: [
      {
        title: language === 'id' ? 'Perusahaan' : language === 'jp' ? '企業' : language === 'zh' ? '公司' : 'Company',
        links: [
          { label: language === 'id' ? 'Beranda' : language === 'jp' ? 'ホーム' : language === 'zh' ? '首页' : 'Home', href: '/' },
          { label: language === 'id' ? 'Tentang Kami' : language === 'jp' ? '私たちについて' : language === 'zh' ? '关于我们' : 'About Us', href: '/about' },
          { label: language === 'id' ? 'Hubungi Kami' : language === 'jp' ? 'お問い合わせ' : language === 'zh' ? '联系我们' : 'Contact Us', href: '/contact' },
          { label: language === 'id' ? 'Wawasan & Berita' : language === 'jp' ? 'インサイトとニュース' : language === 'zh' ? '见解与新闻' : 'Insights & News', href: '/insights' },
        ]
      },
      {
        title: language === 'id' ? 'Teknologi' : language === 'jp' ? 'テクノロジー' : language === 'zh' ? '技术' : 'Technology',
        links: [
          { label: language === 'id' ? 'Ringkasan Teknologi' : language === 'jp' ? '技術概要' : language === 'zh' ? '技术概述' : 'Technology Overview', href: '/technology' },
          { label: language === 'id' ? 'UV Coating' : language === 'jp' ? 'UVコーティング' : language === 'zh' ? 'UV涂装' : 'UV Coating', href: '/technology/uv-coating' },
          { label: language === 'id' ? 'Vacuum Metallizing' : language === 'jp' ? '真空蒸着' : language === 'zh' ? '真空电镀' : 'Vacuum Metallizing', href: '/technology/vacuum-metallizing' },
          { label: language === 'id' ? 'Sertifikasi Kualitas' : language === 'jp' ? '品質認証' : language === 'zh' ? '质量认证' : 'Quality Certification', href: '/quality-certification' },
        ]
      },
      {
        title: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industries',
        links: [
          { label: language === 'id' ? 'Kecantikan & Kosmetik' : language === 'jp' ? '美容・化粧品' : language === 'zh' ? '美容与化妆品' : 'Beauty & Cosmetics', href: '/industries/beauty-cosmetics' },
          { label: language === 'id' ? 'Elektronik Konsumen' : language === 'jp' ? '家電製品' : language === 'zh' ? '消费电子' : 'Consumer Electronics', href: '/industries/electronics' },
          { label: language === 'id' ? 'Fashion & Aksesoris' : language === 'jp' ? 'ファッション＆アクセサリー' : language === 'zh' ? '时尚与配饰' : 'Fashion & Accessories', href: '/industries/fashion-accessories' },
          { label: language === 'id' ? 'Peralatan Rumah' : language === 'jp' ? 'ホーム＆ライフスタイル' : language === 'zh' ? '家居与生活方式' : 'Home & Lifestyle', href: '/industries/home-lifestyle' },
          { label: language === 'id' ? 'Otomotif' : language === 'jp' ? '自動車' : language === 'zh' ? '汽车' : 'Automotive', href: '/industries/automotive' },
          { label: language === 'id' ? 'Dan Masih Banyak Lagi' : language === 'jp' ? 'その他多数' : language === 'zh' ? '以及更多' : 'And Many More', href: '/industries/many-more' },
        ]
      }
    ]
  };

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.description}>{content.desc}</p>
        </section>

        <section className={styles.grid}>
          {content.sections.map((section, idx) => (
            <div key={idx} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <ul className={styles.linkList}>
                {section.links.map((link, lidx) => (
                  <li key={lidx} className={styles.linkItem}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
