"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from './uvCoating.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function UvCoatingPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && t.tech) {
      document.title = `${t.tech.categories[0].title} | PT. STARPACK INDAHMAJU`;
    }
  }, [mounted, t]);

  if (!mounted || !t.tech) return null;

  const category = t.tech.categories[0];

  // Specific custom SVG icons for each point in UV Coating
  const getIcon = (index: number) => {
    switch (index) {
      case 0: // Curing lamps
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        );
      case 1: // Spray nozzles
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <path d="M3 22h18M12 2v16M8 6h8M6 10h12M4 14h16" />
          </svg>
        );
      case 2: // Monitoring
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <path d="M6 10h4v2H6z" />
          </svg>
        );
      case 3: // Eco friendly
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.3a7 7 0 0 1-9 8.7z" />
            <path d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
        );
      case 4: // Speed cycle
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
    }
  };

  const labels = {
    heroTag: language === 'id' ? 'Keunggulan Teknologi' : language === 'jp' ? '技術の卓越性' : language === 'zh' ? '技术卓越' : 'Technology Excellence',
    effectsTitle: language === 'id' ? 'Galeri Efek Pelapisan' : language === 'jp' ? 'コーティング効果のショーケース' : language === 'zh' ? '涂装效果展示' : 'Coating Effects Showcase',
    qualityTitle: language === 'id' ? 'Pemantauan Kualitas Ketat' : language === 'jp' ? '厳格な品質監視' : language === 'zh' ? '严格的质量监控' : 'Rigorous Quality Monitoring',
    qualityDesc: language === 'id' ? 'Setiap batch melewati pemeriksaan otomatis dan manual yang ketat untuk menjamin konsistensi absolut.' : language === 'jp' ? 'すべてのバッチは、絶対的な一貫性を保証するために、厳格な自動および手動検査を受けます。' : language === 'zh' ? '每批次均经过严格的自动和手动检查，以保证绝对的一致性。' : 'Every batch undergoes stringent automated and manual inspection to guarantee absolute consistency.',
    ctaTitle: language === 'id' ? 'Mulai Proyek Anda' : language === 'jp' ? 'プロジェクトを開始する' : language === 'zh' ? '启动您的项目' : 'Initiate Your Project',
    ctaDesc: language === 'id' ? 'Hubungi kami sekarang untuk berkonsultasi mengenai spesifikasi produk kemasan Anda atau minta sampel gratis.' : language === 'jp' ? '製品仕様に関するご相談や、仕上がりサンプルの送付依頼はこちらからお気軽にお問い合わせください。' : language === 'zh' ? '立即联系我们，咨询您的产品包装规格，或索取免费样品以验证最终涂装效果。' : 'Contact us today to consult on your packaging specs or request free physical finish samples to verify coating performance.',
    ctaBtn: language === 'id' ? 'Kirim Permintaan Proyek' : language === 'jp' ? 'プロジェクト相談を送信する' : language === 'zh' ? '提交项目咨询' : 'Submit Project Inquiry'
  };

  const effects = [
    {
      title: language === 'id' ? 'Hasil Akhir High Gloss' : language === 'jp' ? 'ハイグロス仕上げ' : language === 'zh' ? '高光泽饰面' : 'High Gloss Finish',
      desc: language === 'id' ? 'Kilau dan kedalaman luar biasa untuk kemasan premium.' : language === 'jp' ? 'プレミアムパッケージのための卓越した輝きと深み。' : language === 'zh' ? '为优质包装提供卓越的光泽和深度。' : 'Exceptional shine and depth for premium packaging.',
      image: '/images/High_Gloss/High_Gloss.png'
    },
    {
      title: language === 'id' ? 'Matte Mewah' : language === 'jp' ? 'ラグジュアリー・マット' : language === 'zh' ? '奢华哑光' : 'Luxurious Matte',
      desc: language === 'id' ? 'Permukaan sentuhan lembut yang canggih dan tidak memantulkan cahaya.' : language === 'jp' ? '洗練された無反射のソフトタッチ表面。' : language === 'zh' ? '精致无反光的柔软触感表面。' : 'Sophisticated, non-reflective soft-touch surface.',
      image: '/images/Matte_Finish/Matte_Finish.png'
    },
    {
      title: language === 'id' ? 'Efek Mutiara' : language === 'jp' ? 'パール効果' : language === 'zh' ? '珍珠效果' : 'Pearl Effect',
      desc: language === 'id' ? 'Warna-warni halus untuk daya tarik visual yang elegan.' : language === 'jp' ? 'エレガントな視覚的魅力をもたらす繊細な虹色。' : language === 'zh' ? '微妙的虹彩，带来优雅的视觉吸引力。' : 'Subtle iridescence for an elegant visual appeal.',
      image: '/images/Pearl_Effect/Pearl_Effect_v2.png'
    }
  ];

  const qualityFeatures = [
    language === 'id' ? 'Kontrol Ketebalan Otomatis' : language === 'jp' ? '自動厚さ制御' : language === 'zh' ? '自动厚度控制' : 'Automated Thickness Control',
    language === 'id' ? 'Pengujian Ketahanan Gores' : language === 'jp' ? '耐スクラッチ性テスト' : language === 'zh' ? '防刮测试' : 'Scratch Resistance Testing',
    language === 'id' ? 'Verifikasi Tingkat Kilau' : language === 'jp' ? '光沢レベルの検証' : language === 'zh' ? '光泽度验证' : 'Gloss Level Verification'
  ];

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        
        {/* 1. Hero Section */}
        <section className={styles.hero}>
          <span className={styles.heroTag}>{labels.heroTag}</span>
          <h1 className={styles.title}>{category.title}</h1>
          <p className={styles.description}>
            {language === 'id' 
              ? 'Layanan UV coating kami menghadirkan lapisan akhir berkilau tinggi (glossy) atau matte mewah yang tahan gores dan tahan lama, diformulasikan khusus untuk material kosmetik premium, otomotif, dan elektronik konsumen.'
              : language === 'jp'
                ? '当社のUVコーティングサービスは、プレミアムな化粧品容器、自動車部品、家電製品向けにカスタマイズされた、耐スクラッチ性と耐久性に優れた高光沢（グロス）または高級感あるマット仕上げを提供します。'
                : language === 'zh'
                  ? '我们的UV涂装服务专为高端化妆品包装、汽车配件及消费电子产品定制，提供高光泽或哑光质感的耐磨防刮保护涂层。'
                  : 'Our advanced UV coating services deliver exceptionally durable, scratch-resistant high-gloss or luxurious matte finishes customized specifically for premium cosmetics, automotive trims, and consumer electronics.'}
          </p>
        </section>

        {/* 2. Core Tech Section */}
        <section>
          <h2 className={styles.sectionTitle}>
            {language === 'id' ? 'Keunggulan Inti' : language === 'jp' ? '主な利点' : language === 'zh' ? '核心优势' : 'Core Advantages'}
          </h2>
          <div className={styles.techGrid}>
            <div className={styles.techList}>
              {category.items.map((item: string, index: number) => (
                <div key={index} className={styles.techCard}>
                  <div className={styles.iconWrapper}>
                    {getIcon(index)}
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>
                      {index === 0 
                        ? (language === 'id' ? 'Pengeringan UV Instan' : language === 'jp' ? '瞬間UV硬化' : language === 'zh' ? '瞬间UV固化' : 'Instant UV Curing')
                        : index === 1
                          ? (language === 'id' ? 'Pelapisan Semprot Presisi' : language === 'jp' ? '高精度スプレー塗工' : language === 'zh' ? '精准喷涂工艺' : 'Precision Spray Coating')
                          : index === 2
                            ? (language === 'id' ? 'Pemantauan Real-Time' : language === 'jp' ? 'リアルタイム監視' : language === 'zh' ? '实时厚度监控' : 'Real-Time Monitoring')
                            : index === 3
                              ? (language === 'id' ? 'Ramah Lingkungan' : language === 'jp' ? '環境対応・無溶剤' : language === 'zh' ? '环保无溶剂' : 'Solvent-Free & Eco-Friendly')
                              : (language === 'id' ? 'Produksi Skala Cepat' : language === 'jp' ? '高速量産サイクル' : language === 'zh' ? '高效大批量生产' : 'Rapid High-Volume Production')}
                    </h3>
                    <p className={styles.cardDesc}>{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.techImageWrapper}>
              <Image
                src="/images/UV_Curing_Systems/UV-Curing-Systems.png"
                alt="UV Curing Systems Facilities"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* 3. Effects Showcase */}
        <section className={styles.effectsSection}>
          <h2 className={styles.sectionTitle}>{labels.effectsTitle}</h2>
          <div className={styles.effectsGrid}>
            {effects.map((effect, idx) => (
              <div key={idx} className={styles.effectCard}>
                <div className={styles.effectImageContainer}>
                  <Image
                    src={effect.image}
                    alt={effect.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.effectContent}>
                  <h3 className={styles.effectTitle}>{effect.title}</h3>
                  <p className={styles.effectDesc}>{effect.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Quality Section */}
        <section className={styles.qualitySection}>
          <div className={styles.qualityImageWrapper}>
            <Image
              src="/images/Quality_Monitoring/Quality_Monitoring.png"
              alt="Quality Monitoring"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.qualityContent}>
            <h2 className={styles.qualityTitle}>{labels.qualityTitle}</h2>
            <p className={styles.qualityDesc}>{labels.qualityDesc}</p>
            <div className={styles.qualityFeatureList}>
              {qualityFeatures.map((feature, idx) => (
                <div key={idx} className={styles.qualityFeature}>
                  <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA Section */}
        <CTA 
          title={labels.ctaTitle}
          description={labels.ctaDesc}
          btnText={labels.ctaBtn}
          href="/contact"
        />

      </div>
    </div>
  );
}
