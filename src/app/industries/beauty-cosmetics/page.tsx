"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function BeautyCosmeticsPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Beauty & Cosmetics | PT. STARPACK INDAHMAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industry',
    title: language === 'id' ? 'Kecantikan & Kosmetik' : language === 'jp' ? '美容・化粧品' : language === 'zh' ? '美容与化妆品' : 'Beauty & Cosmetics',
    desc: language === 'id' 
      ? 'Meningkatkan nilai merek kemasan kosmetik premium melalui efek pelapisan mewah yang memikat secara visual dan memberikan perlindungan superior.'
      : language === 'jp'
        ? '視覚的に魅了し、優れた保護を提供する豪華なコーティング効果を通じて、プレミアム化粧品パッケージのブランド価値を高めます。'
        : language === 'zh'
          ? '通过视觉上引人入胜并提供卓越保护的豪华涂层效果，提升高端化妆品包装的品牌价值。'
          : 'Elevating the brand value of premium cosmetic packaging through luxurious coating effects that captivate visually and provide superior protection.',
    
    sectionTitle: language === 'id' ? 'Keunggulan Kemasan' : language === 'jp' ? 'パッケージの利点' : language === 'zh' ? '包装优势' : 'Packaging Advantages',
    sectionDesc: language === 'id' ? 'Pelapisan UV dan metallizing vakum kami dirancang khusus untuk memenuhi standar ketat industri kecantikan global.' : language === 'jp' ? '当社のUVコーティングおよび真空蒸着は、世界の美容業界の厳しい基準を満たすように特別に設計されています。' : language === 'zh' ? '我们的UV涂装和真空电镀专为满足全球美容行业的严格标准而设计。' : 'Our UV coating and vacuum metallizing are specifically engineered to meet the rigorous standards of the global beauty industry.',
    
    features: [
      {
        title: language === 'id' ? 'Tahan Bahan Kimia' : language === 'jp' ? '耐薬品性' : language === 'zh' ? '耐化学性' : 'Chemical Resistance',
        desc: language === 'id' ? 'Melindungi dari tumpahan parfum, lotion, dan alkohol.' : language === 'jp' ? '香水、ローション、アルコールのこぼれから保護します。' : language === 'zh' ? '防止香水、乳液和酒精溢出造成损坏。' : 'Protects against perfume, lotion, and alcohol spills.'
      },
      {
        title: language === 'id' ? 'Estetika Mewah' : language === 'jp' ? '豪華な美学' : language === 'zh' ? '奢华美学' : 'Luxurious Aesthetics',
        desc: language === 'id' ? 'Hasil akhir cermin sempurna dan tekstur matte lembut.' : language === 'jp' ? '完璧な鏡面仕上げと柔らかなマットな質感。' : language === 'zh' ? '完美的镜面抛光和柔软的哑光质感。' : 'Flawless mirror finishes and soft-touch matte textures.'
      },
      {
        title: language === 'id' ? 'Daya Tahan Lama' : language === 'jp' ? '長期耐久性' : language === 'zh' ? '持久耐用' : 'Long-Lasting Durability',
        desc: language === 'id' ? 'Anti gores agar kemasan tetap terlihat baru di rak.' : language === 'jp' ? 'パッケージが店頭で新品同様に見えるようにする傷防止。' : language === 'zh' ? '防刮擦，确保包装在货架上保持全新状态。' : 'Anti-scratch properties to keep packaging looking pristine on the shelf.'
      }
    ],

    ctaTitle: language === 'id' ? 'Mulai Proyek Kosmetik Anda' : language === 'jp' ? '化粧品プロジェクトを開始する' : language === 'zh' ? '启动您的化妆品项目' : 'Initiate Your Cosmetic Project',
    ctaDesc: language === 'id' ? 'Konsultasikan visi kemasan produk kecantikan Anda dengan spesialis kami.' : language === 'jp' ? '美容製品パッケージのビジョンについて、当社のスペシャリストにご相談ください。' : language === 'zh' ? '与我们的专家咨询您的美容产品包装愿景。' : 'Consult with our specialists on your beauty product packaging vision.',
    ctaBtn: language === 'id' ? 'Kirim Permintaan Proyek' : language === 'jp' ? 'プロジェクト相談を送信する' : language === 'zh' ? '提交项目咨询' : 'Submit Project Inquiry'
  };

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        
        {/* 1. Hero Section */}
        <section className={styles.hero}>
          <span className={styles.heroTag}>{content.heroTag}</span>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.description}>{content.desc}</p>
        </section>

        {/* 2. Content Section */}
        <section className={styles.contentGrid}>
          <div className={styles.textContent}>
            <div>
              <h2 className={styles.sectionTitle}>{content.sectionTitle}</h2>
              <p className={styles.sectionDesc}>{content.sectionDesc}</p>
            </div>
            <div className={styles.featureList}>
              {content.features.map((feature, idx) => (
                <div key={idx} className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <h3 className={styles.featureText}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.imageWrapper}>
            <Image
              src="/images/Beauty_&_Cosmetics/Beauty_&_Cosmetics.png"
              alt="Beauty & Cosmetics Packaging"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* 3. CTA Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
          <p className={styles.ctaDesc}>{content.ctaDesc}</p>
          <Link href="/contact" className={styles.ctaBtn}>
            {content.ctaBtn}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </section>

      </div>
    </div>
  );
}
