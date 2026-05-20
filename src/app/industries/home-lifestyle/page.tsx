"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CTA from '@/components/CTA';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeLifestylePage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Home & Lifestyle | PT. STARPACK INDAHMAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industry',
    title: language === 'id' ? 'Peralatan Rumah & Gaya Hidup' : language === 'jp' ? 'ホーム＆ライフスタイル' : language === 'zh' ? '家居与生活方式' : 'Home & Lifestyle',
    desc: language === 'id' 
      ? 'Menjadikan perlengkapan rumah tangga lebih tangguh dan berkelas dengan perlindungan ekstra terhadap suhu, goresan, dan bahan kimia sehari-hari.'
      : language === 'jp'
        ? '温度、傷、日常の化学物質に対する追加の保護により、家庭用品をより弾力性があり、上品なものにします。'
        : language === 'zh'
          ? '通过对温度、划痕和日常化学品的额外保护，使家居用品更具弹性和档次。'
          : 'Making household appliances more resilient and classy with extra protection against temperature, scratches, and everyday chemicals.',
    
    sectionTitle: language === 'id' ? 'Keunggulan Durabilitas' : language === 'jp' ? '耐久性の利点' : language === 'zh' ? '耐用性优势' : 'Durability Advantages',
    sectionDesc: language === 'id' ? 'Produk rumah tangga memerlukan lapisan yang tak hanya cantik namun sangat fungsional dan aman.' : language === 'jp' ? '家庭用品には、美しいだけでなく高機能で安全なコーティングが必要です。' : language === 'zh' ? '家居用品需要不仅美观而且功能强大且安全的涂层。' : 'Household products require coatings that are not only beautiful but highly functional and safe.',
    
    features: [
      {
        title: language === 'id' ? 'Tahan Suhu Ekstrem' : language === 'jp' ? '極端な温度への耐性' : language === 'zh' ? '耐极端温度' : 'Extreme Temperature Resistance',
        desc: language === 'id' ? 'Tidak mudah retak atau mengelupas saat terkena panas alat rumah tangga.' : language === 'jp' ? '家電の熱にさらされてもひび割れや剥がれが生じにくい。' : language === 'zh' ? '暴露在家用电器的热量下不易开裂或剥落。' : 'Resists cracking or peeling when exposed to appliance heat.'
      },
      {
        title: language === 'id' ? 'Aman untuk Pengguna' : language === 'jp' ? 'ユーザーにとって安全' : language === 'zh' ? '对用户安全' : 'Safe for Users',
        desc: language === 'id' ? 'Bebas toksin setelah dikeringkan sepenuhnya dengan teknologi UV.' : language === 'jp' ? 'UVテクノロジーで完全に乾燥させた後は毒素がありません。' : language === 'zh' ? '使用UV技术完全干燥后无毒。' : 'Toxin-free once fully cured with UV technology.'
      },
      {
        title: language === 'id' ? 'Mudah Dibersihkan' : language === 'jp' ? 'お手入れ簡単' : language === 'zh' ? '易于清洁' : 'Easy to Clean',
        desc: language === 'id' ? 'Permukaan sangat halus sehingga noda sulit menempel.' : language === 'jp' ? '表面が非常に滑らかなため、汚れがつきにくいです。' : language === 'zh' ? '表面非常光滑，因此污渍很难附着。' : 'Extremely smooth surfaces make it hard for stains to stick.'
      }
    ],

    ctaTitle: language === 'id' ? 'Mulai Proyek Home & Lifestyle' : language === 'jp' ? 'ホーム＆ライフスタイルプロジェクトを開始する' : language === 'zh' ? '启动家居与生活方式项目' : 'Initiate Home & Lifestyle Project',
    ctaDesc: language === 'id' ? 'Diskusikan perlindungan premium untuk produk rumah tangga Anda.' : language === 'jp' ? '家庭用品のプレミアムな保護についてご相談ください。' : language === 'zh' ? '讨论针对您家居用品的高级保护。' : 'Discuss premium protection for your household products.',
    ctaBtn: language === 'id' ? 'Kirim Permintaan Proyek' : language === 'jp' ? 'プロジェクト相談を送信する' : language === 'zh' ? '提交项目咨询' : 'Submit Project Inquiry'
  };

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.heroTag}>{content.heroTag}</span>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.description}>{content.desc}</p>
        </section>

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
              src="/images/Home_&_Lifestyle/Home_&_Lifestyle.png"
              alt="Home & Lifestyle Coating"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </section>

        <CTA 
          title={content.ctaTitle}
          description={content.ctaDesc}
          btnText={content.ctaBtn}
          href="/contact"
        />
      </div>
    </div>
  );
}
