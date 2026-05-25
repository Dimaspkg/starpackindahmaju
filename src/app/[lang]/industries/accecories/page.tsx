"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AccecoriesPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Accessories Coating | PT STARPACK INDAHMAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industry',
    title: language === 'id' ? 'Aksesoris' : language === 'jp' ? 'アクセサリー' : language === 'zh' ? '配饰' : 'Accessories',
    desc: language === 'id' 
      ? 'Solusi pelapisan dekoratif presisi tinggi untuk berbagai komponen aksesoris dan elemen visual produk berkualitas tinggi.'
      : language === 'jp'
        ? '高品質な様々なアクセサリー部品や製品のビジュアル要素向けの精密な装飾用コーティングソリューション。'
        : language === 'zh'
          ? '适用于各种配饰部件和高品质产品视觉元素的高精度装饰性金属电镀与涂装解决方案。'
          : 'High-precision decorative metal plating and coating solutions for various accessory components and high-quality product visual elements.',
    
    sectionTitle: language === 'id' ? 'Keunggulan Finis Aksesoris' : language === 'jp' ? 'アクセサリー仕上げの強み' : language === 'zh' ? '配饰涂装与电镀优势' : 'Accessory Finishing Advantages',
    sectionDesc: language === 'id' 
      ? 'Komponen aksesoris memerlukan keindahan visual yang sempurna dan ketahanan gores yang luar biasa untuk pemakaian harian. Pelapisan vakum dan UV kami menjamin daya tahan karat serta kilau emas/krom yang premium.' 
      : language === 'jp' 
        ? 'アクセサリー部品には、日常の使用に耐えうる完璧な美観と卓越した耐傷性が求められます。当社の真空蒸着およびUVコーティングは、プレミアムなゴールド/クロームの輝きと高い防錆性を保証します。' 
        : language === 'zh' 
          ? '配饰部件在日常使用中需要完美无瑕的视觉美感和出色的耐磨损性能。我们的真空镀膜和 UV 涂装工艺可确保高级的金/银/铬色泽，同时具备长效防锈能力。' 
          : 'Accessory components require flawless visual aesthetics and exceptional scratch resistance for daily use. Our vacuum metallizing and UV coatings ensure rust protection and premium gold/chrome lustre.',
    
    features: [
      {
        title: language === 'id' ? 'Efek Kilau Emas & Krom' : language === 'jp' ? 'ゴールド＆クローム効果' : language === 'zh' ? '亮金与铬镜面效果' : 'Gold & Chrome Lustre',
        desc: language === 'id' ? 'Menghasilkan lapisan emas 24K dan krom mengkilap yang elegan dan mulus tanpa bintik.' : language === 'jp' ? '斑点のないエレガントで滑らかな24Kゴールドおよび高光沢クローム層を形成します。' : language === 'zh' ? '实现无瑕且平滑的 24K 仿金与高亮度铬镜面层。' : 'Delivers an elegant, smooth 24K gold and bright chrome mirror finish without blemishes.'
      },
      {
        title: language === 'id' ? 'Proteksi Anti Karat & Oksidasi' : language === 'jp' ? '防錆・酸化防止' : language === 'zh' ? '防生锈与抗氧化' : 'Anti-Rust & Oxidation Protection',
        desc: language === 'id' ? 'Lapisan atas berkualitas menjaga logam tetap berkilau dan melindunginya dari oksidasi akibat keringat atau udara lembap.' : language === 'jp' ? '高品質なコーティング層が金属の輝きを保ち、汗や湿気による酸化を防ぎます。' : language === 'zh' ? '优质的涂层保护膜可保持金属光泽，防止因汗水或潮湿空气导致的金属氧化。' : 'High-quality topcoat layer preserves metal lustre and shields against oxidation from sweat or humidity.'
      },
      {
        title: language === 'id' ? 'Ketahanan Gores Tinggi' : language === 'jp' ? '高耐傷性' : language === 'zh' ? '卓越的耐划伤性' : 'High Scratch Resistance',
        desc: language === 'id' ? 'Topcoat UV khusus mencegah gesekan sehari-hari merusak keindahan visual aksesori Anda.' : language === 'jp' ? '特殊なUVトップコートが、日常の摩擦によるアクセサリーの美観損ねを防ぎます。' : language === 'zh' ? '特殊的 UV 保护清漆可防止日常摩擦损坏配饰外观的质感。' : 'Specialized UV topcoat prevents daily friction from degrading your accessory’s visual finish.'
      }
    ],

    ctaTitle: language === 'id' ? 'Mulai Proyek Aksesoris Anda' : language === 'jp' ? 'アクセサリープロジェクトを開始する' : language === 'zh' ? '启动您的配饰项目' : 'Start Your Accessories Project',
    ctaDesc: language === 'id' ? 'Dapatkan spesifikasi pelapisan terbaik untuk berbagai kebutuhan komponen aksesoris Anda.' : language === 'jp' ? '様々なアクセサリー部品のニーズに最適なコーティング仕様をご提案します。' : language === 'zh' ? '为您的各种配饰部件需求获取最佳的表面电镀与涂装解决方案。' : 'Get the best coating specifications for all your accessory component requirements.',
    ctaBtn: language === 'id' ? 'Konsultasi Sekarang' : language === 'jp' ? '今すぐ相談する' : language === 'zh' ? '立即咨询' : 'Consult Our Specialists'
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
              src="/images/industry/accessories.png"
              alt="Accessories Coating"
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
