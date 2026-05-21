"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from '../industryDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function ManyMorePage() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.title = 'Diverse Industries | PT STARPACK INDAH MAJU';
  }, []);

  if (!mounted) return null;

  const content = {
    heroTag: language === 'id' ? 'Industri Lintas Sektor' : language === 'jp' ? '異業種' : language === 'zh' ? '跨行业' : 'Cross-Sector Industries',
    title: language === 'id' ? 'Dan Masih Banyak Lagi' : language === 'jp' ? 'その他多数' : language === 'zh' ? '以及更多' : 'And Many More',
    desc: language === 'id' 
      ? 'Keahlian kami dalam pelapisan UV dan metallizing tidak terbatas pada industri tertentu. Kami siap melayani permintaan kustom dari berbagai sektor, mulai dari mainan premium hingga peralatan medis.'
      : language === 'jp'
        ? '当社のUVコーティングと真空蒸着の専門知識は特定の業界に限定されません。プレミアム玩具から医療機器まで、さまざまな分野からのカスタム要望に対応する準備ができています。'
        : language === 'zh'
          ? '我们在UV涂装和电镀方面的专业知识并不局限于特定行业。我们准备好满足从高端玩具到医疗设备等各个领域的定制需求。'
          : 'Our expertise in UV coating and vacuum metallizing is not limited to specific industries. We are ready to serve custom demands from various sectors, ranging from premium toys to medical equipment.',
    
    sectionTitle: language === 'id' ? 'Layanan Kustom Spesifik' : language === 'jp' ? '特定のカスタムサービス' : language === 'zh' ? '特定定制服务' : 'Specific Custom Services',
    sectionDesc: language === 'id' ? 'Tidak peduli industri apa yang Anda geluti, pelapisan kami dapat disesuaikan dengan kebutuhan teknis Anda.' : language === 'jp' ? 'どの業界であっても、当社のコーティングはお客様の技術的ニーズに合わせてカスタマイズできます。' : language === 'zh' ? '无论您从事哪个行业，我们的涂层都可以根据您的技术需求进行定制。' : 'No matter what industry you are in, our coatings can be tailored to your precise technical needs.',
    
    features: [
      {
        title: language === 'id' ? 'Formulasi Khusus' : language === 'jp' ? '特別処方' : language === 'zh' ? '特殊配方' : 'Custom Formulation',
        desc: language === 'id' ? 'Tingkat kilau, ketebalan, dan ketahanan yang dapat diatur sepenuhnya.' : language === 'jp' ? '光沢レベル、厚さ、および耐久性を完全に調整可能。' : language === 'zh' ? '光泽度、厚度和耐用性完全可调。' : 'Fully adjustable gloss levels, thickness, and resistance properties.'
      },
      {
        title: language === 'id' ? 'Prototyping Cepat' : language === 'jp' ? '迅速なプロトタイピング' : language === 'zh' ? '快速原型制作' : 'Rapid Prototyping',
        desc: language === 'id' ? 'Dukungan penuh untuk pengembangan R&D dan pengambilan sampel sebelum produksi massal.' : language === 'jp' ? '大量生産前の研究開発およびサンプリングを完全にサポート。' : language === 'zh' ? '全面支持大规模生产前的研发和打样。' : 'Full support for R&D development and sampling prior to mass production.'
      },
      {
        title: language === 'id' ? 'Skalabilitas Tinggi' : language === 'jp' ? '高い拡張性' : language === 'zh' ? '高可扩展性' : 'High Scalability',
        desc: language === 'id' ? 'Fasilitas yang mampu menangani jutaan pesanan skala industri.' : language === 'jp' ? '数百万の産業規模の注文を処理できる施設。' : language === 'zh' ? '能够处理数百万工业规模订单的设施。' : 'Facilities capable of handling millions of industrial-scale orders.'
      }
    ],

    ctaTitle: language === 'id' ? 'Diskusikan Kebutuhan Unik Anda' : language === 'jp' ? 'ユニークなニーズについて話し合う' : language === 'zh' ? '讨论您的独特需求' : 'Discuss Your Unique Needs',
    ctaDesc: language === 'id' ? 'Beri tahu kami tantangan pelapisan di industri Anda.' : language === 'jp' ? 'お客様の業界でのコーティングの課題についてお聞かせください。' : language === 'zh' ? '告诉我们您在行业中面临的涂装挑战。' : 'Tell us about the coating challenges in your specific industry.',
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
              src="/images/Many_More/many_more.png"
              alt="Diverse Industries"
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
