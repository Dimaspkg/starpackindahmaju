"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function FootwearPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Footwear | PT STARPACK INDAH MAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industry',
    title: language === 'id' ? 'Alas Kaki & Sepatu' : language === 'jp' ? 'フットウェア・シューズ' : language === 'zh' ? '鞋类与运动器材' : 'Footwear',
    desc: language === 'id' 
      ? 'Meningkatkan desain alas kaki dengan lapisan metalik berdaya tahan tinggi dan lapisan pelindung yang tahan terhadap gesekan, kelenturan, dan tekanan lingkungan.'
      : language === 'jp'
        ? '耐摩耗性、柔軟性、環境ストレスに優れた高耐久性メタリックフィニッシュと保護コーティングで、フットウェアのデザイン性を向上させます。'
        : language === 'zh'
          ? '通过高耐用性的金属饰面和防护涂层提升鞋类设计，抵抗磨损、弯曲和环境压力。'
          : 'Elevating footwear design with high-durability metallic finishes and protective coatings that resist wear, flexing, and environmental stress.',
    
    sectionTitle: language === 'id' ? 'Keunggulan Pelapisan Alas Kaki' : language === 'jp' ? 'フットウェアコーティングの優位性' : language === 'zh' ? '鞋类电镀与涂装优势' : 'Footwear Coating Excellence',
    sectionDesc: language === 'id' 
      ? 'Komponen alas kaki memerlukan ketahanan ekstrem sekaligus tampilan visual yang menawan. Lapisan UV dan vacuum metallizing kami memberikan estetika premium yang tahan lama untuk penggunaan aktif sehari-hari.' 
      : language === 'jp' 
        ? 'フットウェアのコンポーネントには、見た目の美しさと極限の耐久性の両立が求められます。当社のUVおよび真空蒸着コーティングは、毎日のアクティブな使用に耐える高品質な美観を提供します。' 
        : language === 'zh' 
          ? '鞋类部件在追求视觉吸引力的同时，也需要极高的耐用性。我们的 UV 涂装和真空镀膜技术能够提供耐磨损的优质美感，经受住日常运动的考验。' 
          : 'Footwear components require extreme durability alongside visual appeal. Our UV and vacuum metallizing coatings deliver premium aesthetics that withstand active daily use.',
    
    features: [
      {
        title: language === 'id' ? 'Kelenturan Maksimal' : language === 'jp' ? '優れた屈曲耐性' : language === 'zh' ? '极致的屈曲弹性' : 'Extreme Flex Resistance',
        desc: language === 'id' ? 'Formula coating elastis menyesuaikan secara dinamis dengan tekukan sepatu tanpa mengalami retak atau lepas.' : language === 'jp' ? '弾性コーティング配合により、シューズの屈曲に追従し、ひび割れや剥がれを防ぎます。' : language === 'zh' ? '弹性涂层配方可随鞋面弯曲动态调整，不易开裂或脱落。' : 'Elastic coating formula behaves dynamically with shoe flex, resisting cracking or peeling.'
      },
      {
        title: language === 'id' ? 'Tahan Gesekan & Goresan' : language === 'jp' ? '耐摩耗性＆防傷' : language === 'zh' ? '防刮与耐磨损' : 'Scuff & Scratch Resistance',
        desc: language === 'id' ? 'Lapisan pelindung atas (topcoat) melindungi logo dan aksen TPU dari benturan dan gesekan eksternal.' : language === 'jp' ? '高品質なトップコートが、ロゴやTPUアクセントを外部の擦れや傷から守ります。' : language === 'zh' ? '优质的顶面保护漆可保护标志和 TPU 装饰免受外部刮擦和磨损。' : 'Superior protective topcoat shields logos and TPU accents from everyday friction and minor impacts.'
      },
      {
        title: language === 'id' ? 'Branding Metalik Presisi' : language === 'jp' ? '高精度メタリックブランディング' : language === 'zh' ? '精准的金属感品牌呈现' : 'Vibrant Metallic Branding',
        desc: language === 'id' ? 'Vacuum metallizing berkualitas tinggi menghasilkan logo dan bagian dekoratif dengan efek chrome mengkilap yang presisi.' : language === 'jp' ? '高品質の真空蒸着により、ロゴや装飾部分に光沢感のある精密なクローム効果をもたらします。' : language === 'zh' ? '高水准的真空电镀为品牌标志与装饰配件带来光彩夺目的精密镜面效果。' : 'High-quality vacuum metallizing delivers eye-catching logos and decorative accents with a precise chrome-like finish.'
      }
    ],

    ctaTitle: language === 'id' ? 'Mulai Proyek Footwear Anda' : language === 'jp' ? 'フットウェアプロジェクトを開始する' : language === 'zh' ? '启动您的鞋类项目' : 'Start Your Footwear Project',
    ctaDesc: language === 'id' ? 'Konsultasikan kebutuhan pelapisan dan vacuum metallizing premium untuk komponen sepatu dan logo Anda.' : language === 'jp' ? 'フットウェアの部品やロゴのプレミアムコーティングおよび真空蒸着についてご相談ください。' : language === 'zh' ? '讨论针对您鞋类部件及标志的高级涂层与真空镀膜定制方案。' : 'Discuss premium coating and vacuum metallizing specifications for your footwear components and logos.',
    ctaBtn: language === 'id' ? 'Hubungi Spesialis Kami' : language === 'jp' ? 'スペシャリストに相談する' : language === 'zh' ? '联系我们的专家' : 'Submit Project Inquiry'
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
          
          <div className={styles.imageWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', backgroundColor: '#111' }}>
            <Image
              src="/images/industry/footwear.svg"
              alt="Nike Logo Footwear Industry"
              width={500}
              height={178}
              priority
              style={{
                maxWidth: '75%',
                height: 'auto',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
              }}
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
