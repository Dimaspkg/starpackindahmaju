"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AutomotivePage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Automotive | PT STARPACK INDAH MAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industry',
    title: language === 'id' ? 'Otomotif' : language === 'jp' ? '自動車' : language === 'zh' ? '汽车' : 'Automotive',
    desc: language === 'id' 
      ? 'Komponen interior dan eksterior otomotif yang dilapisi dengan presisi untuk memenuhi standar keamanan, durabilitas, dan estetika premium yang paling ketat.'
      : language === 'jp'
        ? '最も厳しい安全性、耐久性、プレミアムな美学の基準を満たすように正確にコーティングされた自動車の内外装部品。'
        : language === 'zh'
          ? '经过精密涂装的汽车内饰和外饰部件，符合最严格的安全性、耐用性和高级美学标准。'
          : 'Automotive interior and exterior components coated with precision to meet the strictest safety, durability, and premium aesthetic standards.',
    
    sectionTitle: language === 'id' ? 'Keunggulan Material' : language === 'jp' ? '素材の利点' : language === 'zh' ? '材料优势' : 'Material Advantages',
    sectionDesc: language === 'id' ? 'Pelapisan kami meningkatkan kinerja dan tampilan plastik kelas otomotif agar sesuai dengan hasil akhir logam dan serat karbon murni.' : language === 'jp' ? '当社のコーティングは、自動車グレードのプラスチックの性能と外観を向上させ、純粋な金属やカーボンファイバーの仕上げに匹敵するようにします。' : language === 'zh' ? '我们的涂层提升了汽车级塑料的性能和外观，使其媲美纯金属和碳纤维饰面。' : 'Our coatings enhance the performance and appearance of automotive-grade plastics to match pure metal and carbon fiber finishes.',
    
    features: [
      {
        title: language === 'id' ? 'Daya Tahan Cuaca Ekstrem' : language === 'jp' ? '極端な天候への耐性' : language === 'zh' ? '耐极端天气' : 'Extreme Weather Durability',
        desc: language === 'id' ? 'Perlindungan maksimal terhadap paparan sinar UV, hujan asam, dan fluktuasi suhu.' : language === 'jp' ? '紫外線、酸性雨、温度変動に対する最大限の保護。' : language === 'zh' ? '最大程度地防止紫外线照射、酸雨和温度波动。' : 'Maximum protection against UV exposure, acid rain, and temperature fluctuations.'
      },
      {
        title: language === 'id' ? 'Anti Gores Tingkat Lanjut' : language === 'jp' ? '高度な傷防止' : language === 'zh' ? '高级防刮' : 'Advanced Anti-Scratch',
        desc: language === 'id' ? 'Menjaga kemulusan panel interior dari goresan kunci atau debu.' : language === 'jp' ? '鍵やほこりによる傷から内装パネルの滑らかさを保ちます。' : language === 'zh' ? '保持内饰面板免受钥匙或灰尘刮擦，保持光滑。' : 'Maintains interior panel smoothness against key scratches and abrasive dust.'
      },
      {
        title: language === 'id' ? 'Penyesuaian Efek Krom' : language === 'jp' ? 'クローム効果のカスタマイズ' : language === 'zh' ? '镀铬效果定制' : 'Chrome Effect Customization',
        desc: language === 'id' ? 'Finishing metalik reflektif tanpa bobot berat dari logam asli.' : language === 'jp' ? '本物の金属の重さを持たない反射性のメタリック仕上げ。' : language === 'zh' ? '没有真金属重量的反光金属饰面。' : 'Reflective metallic finishes without the heavy weight of actual solid metal.'
      }
    ],

    ctaTitle: language === 'id' ? 'Mulai Proyek Otomotif Anda' : language === 'jp' ? '自動車プロジェクトを開始する' : language === 'zh' ? '启动您的汽车项目' : 'Initiate Your Automotive Project',
    ctaDesc: language === 'id' ? 'Tingkatkan kualitas komponen plastik otomotif Anda bersama spesialis kami.' : language === 'jp' ? '当社のスペシャリストと一緒に自動車用プラスチック部品の品質を向上させましょう。' : language === 'zh' ? '与我们的专家一起提升您汽车塑料部件的质量。' : 'Elevate the quality of your automotive plastic components with our specialists.',
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
              src="/images/Automotive/Automotive.png"
              alt="Automotive Coating"
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
