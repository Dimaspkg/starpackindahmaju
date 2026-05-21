"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function ElectronicsPage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Electronics | PT STARPACK INDAH MAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri' : language === 'jp' ? '産業' : language === 'zh' ? '行业' : 'Industry',
    title: language === 'id' ? 'Elektronik Konsumen' : language === 'jp' ? '家電製品' : language === 'zh' ? '消费电子' : 'Consumer Electronics',
    desc: language === 'id' 
      ? 'Memberikan perlindungan anti gores tingkat lanjut dan sentuhan metalik premium untuk perangkat elektronik yang sering digunakan, tanpa mengorbankan fungsionalitas.'
      : language === 'jp'
        ? '機能性を損なうことなく、頻繁に使用される電子デバイスに高度な傷防止保護とプレミアムなメタリックの質感を提供します。'
        : language === 'zh'
          ? '在不影响功能的情况下，为经常使用的电子设备提供先进的防刮擦保护和高级金属触感。'
          : 'Providing advanced anti-scratch protection and premium metallic touches for frequently handled electronic devices, without compromising functionality.',
    
    sectionTitle: language === 'id' ? 'Keunggulan Perangkat' : language === 'jp' ? 'デバイスの利点' : language === 'zh' ? '设备优势' : 'Device Advantages',
    sectionDesc: language === 'id' ? 'Pelapisan kami memastikan perangkat elektronik konsumen terlihat elegan sekaligus menahan keausan penggunaan sehari-hari.' : language === 'jp' ? '当社のコーティングにより、家電製品はエレガントに見えながら、日常の過酷な使用にも耐えることができます。' : language === 'zh' ? '我们的涂层确保消费电子产品外观优雅，同时经得起日常使用的磨损。' : 'Our coatings ensure consumer electronics look elegant while withstanding the rigors of everyday use.',
    
    features: [
      {
        title: language === 'id' ? 'Isolasi Listrik' : language === 'jp' ? '電気絶縁' : language === 'zh' ? '电绝缘' : 'Electrical Insulation',
        desc: language === 'id' ? 'Pelapisan non-konduktif yang aman untuk housing perangkat elektronik.' : language === 'jp' ? '電子デバイスのハウジングに安全な非導電性コーティング。' : language === 'zh' ? '安全的非导电涂层，适用于电子设备外壳。' : 'Safe, non-conductive coatings for electronic device housings.'
      },
      {
        title: language === 'id' ? 'Tahan Aus Ekstrem' : language === 'jp' ? '極度の耐摩耗性' : language === 'zh' ? '极度耐磨' : 'Extreme Wear Resistance',
        desc: language === 'id' ? 'Tahan terhadap sentuhan berulang dan kelembaban jari.' : language === 'jp' ? '繰り返しのタッチや指の湿気に耐性があります。' : language === 'zh' ? '耐反复触摸和手指水分。' : 'Resistant to repeated handling and natural oils.'
      },
      {
        title: language === 'id' ? 'Finishing Metalik' : language === 'jp' ? 'メタリック仕上げ' : language === 'zh' ? '金属饰面' : 'Metallic Finishes',
        desc: language === 'id' ? 'Tampilan aluminium/krom asli menggunakan plastik yang lebih ringan.' : language === 'jp' ? '軽量プラスチックを使用した本物のアルミニウム/クロームの外観。' : language === 'zh' ? '使用更轻的塑料实现逼真的铝/铬外观。' : 'Authentic aluminum/chrome look using lightweight plastic.'
      }
    ],

    ctaTitle: language === 'id' ? 'Mulai Proyek Elektronik Anda' : language === 'jp' ? 'エレクトロニクスプロジェクトを開始する' : language === 'zh' ? '启动您的电子项目' : 'Initiate Your Electronics Project',
    ctaDesc: language === 'id' ? 'Konsultasikan spesifikasi teknis komponen elektronik Anda dengan kami.' : language === 'jp' ? '電子部品の技術仕様についてはご相談ください。' : language === 'zh' ? '请咨询我们关于您电子元件的技术规格。' : 'Consult with us regarding the technical specifications of your electronic components.',
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
              src="/images/Electronics/Electronics.png"
              alt="Consumer Electronics Coating"
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
