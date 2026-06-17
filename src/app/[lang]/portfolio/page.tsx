"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CTA from '@/components/CTA';
import styles from './portfolioPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

const TRANSLATIONS = {
  en: {
    subtitle: "Our Portfolio",
    title: "Trusted Brand Partners",
    desc: "Since 1996, PT STARPACK INDAHMAJU has been trusted by leading cosmetics, beauty, automotive, fashion, and packaging brands in Indonesia and globally to deliver top-tier UV coating and vacuum metallizing plastic finishes.",
    ctaTitle: "Ready to Premiumize Your Product?",
    ctaDesc: "Partner with PT STARPACK INDAHMAJU to achieve world-class finishing for your plastic packaging. Contact our specialist team today.",
    ctaBtn: "Contact Us Now",
  },
  id: {
    subtitle: "Portofolio Kami",
    title: "Mitra Brand Terpercaya",
    desc: "Sejak tahun 1996, PT STARPACK INDAHMAJU telah dipercaya oleh berbagai merek kosmetik, kecantikan, otomotif, fashion, dan kemasan terkemuka di Indonesia dan global untuk memberikan finishing UV coating & vacuum metallizing berkualitas tinggi.",
    ctaTitle: "Siap Meningkatkan Kualitas Produk Anda?",
    ctaDesc: "Bekerjasamalah dengan PT STARPACK INDAHMAJU untuk mendapatkan finishing berkelas dunia pada kemasan plastik Anda. Hubungi tim ahli kami sekarang.",
    ctaBtn: "Hubungi Kami Sekarang",
  },
  zh: {
    subtitle: "我们的案例",
    title: "信赖的品牌合作伙伴",
    desc: "自1996年以来，PT STARPACK INDAHMAJU 赢得了印尼和全球领先的化妆品、美容、汽车、时尚和包装品牌的信赖，为他们提供一流的塑料UV喷涂与真空电镀表面加工服务。",
    ctaTitle: "准备好提升您的产品品质了吗？",
    ctaDesc: "与 PT STARPACK INDAHMAJU 合作，为您的塑料包装打造世界一流的涂装效果。立即联系我们的专家团队。",
    ctaBtn: "立即联系我们",
  },
  jp: {
    subtitle: "実績一覧",
    title: "信頼のブランドパートナー",
    desc: "1996年以来、PT STARPACK INDAHMAJUは、インドネシアおよびグローバルの主要な化粧品、美容、自動車、ファッション、包装ブランドから信頼され、最高品質のプラスチックUVコーティングと真空蒸着加工を提供してきました。",
    ctaTitle: "製品の価値を高める準備はできていますか？",
    ctaDesc: "PT STARPACK INDAHMAJU と提携し、プラスチック容器に世界クラスの仕上げを実現しましょう。今すぐ専門チームにお問い合わせください。",
    ctaBtn: "今すぐ問い合わせる",
  }
};

export default function PortfolioPage() {
  const { language } = useLanguage();
  const [logos, setLogos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const currentT = TRANSLATIONS[language] || TRANSLATIONS.id;

  useEffect(() => {
    setMounted(true);
    
    // Fetch all logo images from the portfolio API
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLogos(data);
        }
      })
      .catch(err => console.error("Error loading portfolio logos:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (mounted) {
      const metaTitle = language === 'en'
        ? "Our Client Portfolio - Brand Partners"
        : language === 'zh'
          ? "客户案例与品牌合作伙伴"
          : language === 'jp'
            ? "実績・クライアント紹介"
            : "Portofolio Klien Kami - Mitra Brand";
      document.title = `${metaTitle} | PT STARPACK INDAHMAJU`;
    }
  }, [mounted, language]);

  if (!mounted) return null;

  return (
    <div className={styles.body}>
      {/* ===== HEADER ===== */}
      <header className={styles.header}>
        <span className={styles.subtitle}>{currentT.subtitle}</span>
        <h1 className={styles.title}>{currentT.title}</h1>
        <p className={styles.desc}>{currentT.desc}</p>
      </header>

      {/* ===== LOGOS GRID ===== */}
      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 24 }).map((_, idx) => (
            <div key={idx} className={styles.logoCard}>
              <div className={styles.skeleton}></div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {logos.map((logo, idx) => (
            <div key={`${logo}-${idx}`} className={styles.logoCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={`/images/portofolio/${logo}`}
                  alt={`Partner Brand Logo ${idx + 1}`}
                  fill
                  sizes="(max-width: 480px) 120px, 160px"
                  className={styles.logoImg}
                  priority={idx < 12}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== CTA ===== */}
      <CTA
        title={currentT.ctaTitle}
        description={currentT.ctaDesc}
        btnText={currentT.ctaBtn}
        href="/contact"
      />
    </div>
  );
}
