"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function FashionAccessoriesPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Fashion & Accessories | PT STARPACK INDAH MAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industry',
    title: language === 'id' ? 'Fashion & Aksesoris' : language === 'jp' ? 'ファッション＆アクセサリー' : language === 'zh' ? '时尚与配饰' : 'Fashion & Accessories',
    desc: language === 'id' 
      ? 'Menambahkan nilai estetika tinggi pada aksesoris fashion melalui pelapisan yang mengkilap, tahan gores, dan bebas kusam.'
      : language === 'jp'
        ? '光沢があり、傷がつきにくく、変色しないコーティングを通じて、ファッションアクセサリーに高い美的価値を加えます。'
        : language === 'zh'
          ? '通过有光泽、防刮擦且不褪色的涂层，为时尚配饰增添极高的美学价值。'
          : 'Adding high aesthetic value to fashion accessories through glossy, scratch-resistant, and tarnish-free coatings.',
    
    sectionTitle: language === 'id' ? 'Keunggulan Estetika' : language === 'jp' ? '美的利点' : language === 'zh' ? '美学优势' : 'Aesthetic Advantages',
    sectionDesc: language === 'id' ? 'Solusi pelapisan kami memastikan aksesoris fashion menonjol dengan finishing premium yang tahan lama.' : language === 'jp' ? '当社のコーティングソリューションは、ファッションアクセサリーが長持ちするプレミアムな仕上げで際立つことを保証します。' : language === 'zh' ? '我们的涂层解决方案确保时尚配饰以持久的高级饰面脱颖而出。' : 'Our coating solutions ensure fashion accessories stand out with long-lasting premium finishes.',
    
    features: [
      {
        title: language === 'id' ? 'Kilau Tahan Lama' : language === 'jp' ? '長持ちする輝き' : language === 'zh' ? '持久光泽' : 'Long-Lasting Shine',
        desc: language === 'id' ? 'Menjaga tampilan mengkilap meski sering terpapar udara luar.' : language === 'jp' ? '外気に頻繁にさらされても光沢のある外観を維持します。' : language === 'zh' ? '即使经常暴露在室外空气中也能保持光泽。' : 'Maintains a glossy appearance even with frequent exposure to the elements.'
      },
      {
        title: language === 'id' ? 'Anti-Pudar & Karat' : language === 'jp' ? '退色・錆防止' : language === 'zh' ? '防褪色和防锈' : 'Anti-Fade & Tarnish',
        desc: language === 'id' ? 'Melindungi komponen dari oksidasi dan perubahan warna.' : language === 'jp' ? '酸化や変色からコンポーネントを保護します。' : language === 'zh' ? '保护组件免受氧化和变色。' : 'Protects components from oxidation and discoloration.'
      },
      {
        title: language === 'id' ? 'Variasi Efek' : language === 'jp' ? '多様な効果' : language === 'zh' ? '多样的效果' : 'Variety of Effects',
        desc: language === 'id' ? 'Tersedia dalam warna emas, perak, mutiara, dan metalik kustom.' : language === 'jp' ? 'ゴールド、シルバー、パール、カスタムメタリックカラーをご用意。' : language === 'zh' ? '提供金色、银色、珍珠色和定制金属色。' : 'Available in gold, silver, pearl, and custom metallic colors.'
      }
    ],

    ctaTitle: language === 'id' ? 'Mulai Proyek Aksesoris Anda' : language === 'jp' ? 'アクセサリープロジェクトを開始する' : language === 'zh' ? '启动您的配饰项目' : 'Initiate Your Accessories Project',
    ctaDesc: language === 'id' ? 'Tingkatkan kualitas visual produk fashion Anda bersama kami.' : language === 'jp' ? '私たちと一緒にファッション製品の視覚的品質を高めましょう。' : language === 'zh' ? '与我们一起提升您时尚产品的视觉质量。' : 'Elevate the visual quality of your fashion products with us.',
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
              src="/images/Fashion_&_Accessories/Fashion_&_Accessories_v2.png"
              alt="Fashion & Accessories Coating"
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
