"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import CTA from '@/components/CTA';
import styles from './aboutPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mounted && t.about) {
      document.title = `${t.about.title} | PT STARPACK INDAH MAJU`;
    }
  }, [mounted, t]);

  if (!mounted || !t.about) return null;

  /* ---------- Localised Strings ---------- */
  const L = {
    heroTag: language === 'id' ? 'Tentang Perusahaan' : language === 'jp' ? '会社概要' : language === 'zh' ? '关于公司' : 'About the Company',
    storyLabel: language === 'id' ? 'Sejarah Kami' : language === 'jp' ? '私たちの歩み' : language === 'zh' ? '我们的故事' : 'Our Story',
    missionLabel: language === 'id' ? 'Misi Kami' : language === 'jp' ? '私たちの使命' : language === 'zh' ? '我们的使命' : 'Our Mission',
    milestoneLabel: language === 'id' ? 'Tonggak Sejarah' : language === 'jp' ? 'マイルストーン' : language === 'zh' ? '里程碑' : 'Milestones',
    valuesLabel: language === 'id' ? 'Nilai-Nilai Kami' : language === 'jp' ? '私たちの価値観' : language === 'zh' ? '我们的价值观' : 'Our Values',

    stat1Val: '1996', stat1Lbl: language === 'id' ? 'Tahun Berdiri' : language === 'jp' ? '設立年' : language === 'zh' ? '成立年份' : 'Founded',
    stat2Val: '500+', stat2Lbl: language === 'id' ? 'Klien Puas' : language === 'jp' ? '満足した顧客' : language === 'zh' ? '满意客户' : 'Happy Clients',
    stat3Val: '100M+', stat3Lbl: language === 'id' ? 'Unit / Tahun' : language === 'jp' ? '個/年' : language === 'zh' ? '件/年' : 'Units / Year',
    stat4Val: 'ISO', stat4Lbl: '9001:2015',

    ctaTitle: language === 'id' ? 'Siap Bekerja Sama dengan Kami?' : language === 'jp' ? 'パートナーシップを始めませんか？' : language === 'zh' ? '准备好与我们合作了吗？' : 'Ready to Partner With Us?',
    ctaDesc: language === 'id'
      ? 'Diskusikan kebutuhan coating plastik Anda dengan tim ahli kami dan dapatkan penawaran terbaik sesuai spesifikasi produk Anda.'
      : language === 'jp'
        ? '当社の専門チームにプラスチックコーティングのニーズについてご相談ください。最適な見積もりをご提供します。'
        : language === 'zh'
          ? '与我们的专业团队讨论您的塑料涂层需求，获取符合您产品规格的最优报价。'
          : 'Discuss your plastic coating needs with our expert team and get the best quote tailored to your product specifications.',
    ctaContact: language === 'id' ? 'Hubungi Kami' : language === 'jp' ? 'お問い合わせ' : language === 'zh' ? '联系我们' : 'Contact Us',
    ctaInsights: language === 'id' ? 'Baca Artikel Kami' : language === 'jp' ? '記事を読む' : language === 'zh' ? '阅读文章' : 'Read Our Articles',
  };

  const milestones = [
    {
      date: language === 'id' ? '1996, Januari' : language === 'jp' ? '1996年1月' : language === 'zh' ? '1996年1月' : '1996, January',
      desc: language === 'id' ? 'Didirikan' : language === 'jp' ? '設立' : language === 'zh' ? '成立' : 'Established',
    },
    {
      date: language === 'id' ? '1996, Desember' : language === 'jp' ? '1996年12月' : language === 'zh' ? '1996年12月' : '1996, December',
      desc: language === 'id' ? 'Mulai produksi Kosmetik' : language === 'jp' ? '化粧品容器の生産を開始' : language === 'zh' ? '开始化妆品包装生产' : 'Start production Cosmetic',
    },
    {
      date: language === 'id' ? '1997, Desember' : language === 'jp' ? '1997年12月' : language === 'zh' ? '1997年12月' : '1997, December',
      desc: language === 'id' ? 'Mulai memproduksi Vacuum Metallizing, Senter Fujitsu dan Produk UV Coating' : language === 'jp' ? '真空蒸着、富士通懐中電灯、およびUVコーティング製品の生産を開始' : language === 'zh' ? '开始生产真空镀膜、富士通手电筒及UV涂装产品' : 'Begin produce Vacuum Metallizing, Flashlight Fujitsu and UV Coating Product',
    },
    {
      date: language === 'id' ? '2007, Mei' : language === 'jp' ? '2007年5月' : language === 'zh' ? '2007年5月' : '2007, May',
      desc: language === 'id' ? 'Meraih Sertifikasi ISO 9001:2000' : language === 'jp' ? 'ISO 9001:2000認証を取得' : language === 'zh' ? '获得 ISO 9001:2000 认证' : 'Acquired ISO 9001:2000 Certificated',
    },
    {
      date: language === 'id' ? '2008, Juni' : language === 'jp' ? '2008年6月' : language === 'zh' ? '2008年6月' : '2008, June',
      desc: language === 'id' ? 'Masuk dalam Daftar Vendor Nike' : language === 'jp' ? 'ナイキ（Nike）のベンダーリストに登録' : language === 'zh' ? '成为耐克（Nike）合格供应商' : 'Become Vendor List Nike',
    },
    {
      date: language === 'id' ? '2010, Mei' : language === 'jp' ? '2010年5月' : language === 'zh' ? '2010年5月' : '2010, May',
      desc: language === 'id' ? 'Meningkatkan Sertifikasi menjadi ISO 9001 : 2008' : language === 'jp' ? 'ISO 9001 : 2008アップグレード認証を取得' : language === 'zh' ? '升级获得 ISO 9001:2008 认证' : 'Become ISO 9001 : 2008 Up Grade Certificated',
    },
    {
      date: language === 'id' ? '2013, Juni' : language === 'jp' ? '2013年6月' : language === 'zh' ? '2013年6月' : '2013, June',
      desc: language === 'id' ? 'Pembaruan Sertifikasi ISO 9001 : 2008' : language === 'jp' ? 'ISO 9001 : 2008更新認証を取得' : language === 'zh' ? '更新获得 ISO 9001:2008 认证' : 'Become ISO 9001 : 2008 Up Date Certificated',
    },
    {
      date: language === 'id' ? '2017, April' : language === 'jp' ? '2017年4月' : language === 'zh' ? '2017年4月' : '2017, April',
      desc: language === 'id' ? 'Meningkatkan Sertifikasi menjadi ISO 9001 : 2015' : language === 'jp' ? 'ISO 9001 : 2015アップグレード認証を取得' : language === 'zh' ? '升级获得 ISO 9001:2015 认证' : 'Become ISO 9001 : 2015 Up Grade Certificated',
    },
    {
      date: language === 'id' ? '2022, April' : language === 'jp' ? '2022年4月' : language === 'zh' ? '2022年4月' : '2022, April',
      desc: language === 'id' ? 'Pembaruan Sertifikasi ISO 9001 : 2015' : language === 'jp' ? 'ISO 9001 : 2015更新認証を取得' : language === 'zh' ? '更新获得 ISO 9001:2015 认证' : 'Become ISO 9001 : 2015 Up Date Certificated',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ===== HERO BANNER ===== */}
      <div className={styles.heroBanner}>
        <Image
          src="/images/About/ptstarpackindahmaju.png"
          alt="PT Starpack Indah Maju Factory"
          fill
          className={styles.heroBg}
          priority
          style={{
            transform: `translateY(${scrollY * 0.4}px) scale(1.15)`,
            transformOrigin: 'center center',
          }}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroText}>
            <span className={styles.heroTag}>{L.heroTag}</span>
            <h1 className={styles.heroTitle}>{t.about.title}</h1>
          </div>
        </div>
      </div>

      {/* ===== STATS BAND ===== */}
      <div className={styles.statsBand}>
        {[
          { val: L.stat1Val, lbl: L.stat1Lbl },
          { val: L.stat2Val, lbl: L.stat2Lbl },
          { val: L.stat3Val, lbl: L.stat3Lbl },
          { val: L.stat4Val, lbl: L.stat4Lbl },
        ].map((s, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statValue}>{s.val}</span>
            <span className={styles.statLabel}>{s.lbl}</span>
          </div>
        ))}
      </div>

      {/* ===== PAGE BODY ===== */}
      <div className={styles.body}>

        {/* --- Story & Mission --- */}
        <section className={`${styles.section} reveal`} style={{ borderTop: 'none', paddingTop: '5rem' }}>
          <p className={styles.sectionLabel}>{L.storyLabel}</p>
          <h2 className={styles.sectionTitle}>{t.about.story.title}</h2>
          <p className={styles.sectionText}>{t.about.story.text}</p>

          <div className={`${styles.storyGrid} reveal delay1`}>
            <div className={styles.storyCard}>
              <h3 className={styles.storyCardTitle}>{t.about.mission.title}</h3>
              <p className={styles.storyCardText}>{t.about.mission.text}</p>
            </div>
            <div className={styles.storyCard}>
              <h3 className={styles.storyCardTitle}>{language === 'id' ? 'Fasilitas Produksi' : language === 'jp' ? '生産設備' : language === 'zh' ? '生产设施' : 'Production Facility'}</h3>
              <p className={styles.storyCardText}>
                {language === 'id'
                  ? 'Pabrik kami yang berlokasi di Jakarta dilengkapi dengan mesin UV Coating dan Vacuum Metallizing terkini, mampu memproses lebih dari 100 juta unit per tahun dengan standar kualitas ISO 9001:2015.'
                  : language === 'jp'
                    ? '東京に位置する工場には最新 of UVコーティングおよび真空蒸着機械が設置されており、ISO 9001:2015 of 品質基準のもと年間1億個以上を処理できます。'
                    : language === 'zh'
                      ? '我们位于雅加达的工厂配备了最先进的UV涂层和真空镀铝设备，每年可按照ISO 9001:2015质量标准处理超过1亿件产品。'
                      : 'Our Jakarta factory is equipped with the latest UV Coating and Vacuum Metallizing machinery, capable of processing over 100 million units per year under ISO 9001:2015 quality standards.'}
              </p>
            </div>
          </div>
        </section>

        {/* --- Milestones Section --- */}
        <section className={styles.section}>
          <div className={styles.dotsWrapper}>
            <span className={styles.dotSquare}></span>
            <span className={styles.dotSquare}></span>
            <span className={styles.dotSquare}></span>
          </div>
          <h2 className={`${styles.sectionTitle} reveal`} style={{ fontSize: '3rem', marginBottom: '2rem' }}>
            {language === 'id' ? 'Milestone' : language === 'jp' ? 'マイルストーン' : language === 'zh' ? '里程碑' : 'Milestone'}
          </h2>

          <div className={styles.milestonesContainer}>
            <div className={styles.milestonesList}>
              {milestones.map((m, i) => (
                <div key={i} className={`${styles.milestoneRow} reveal`}>
                  <span className={styles.milestoneDate}>{m.date}</span>
                  <span className={styles.milestoneLine}>{/* Spacer Line */}</span>
                  <span className={styles.milestoneDesc}>{m.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Values Grid --- */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>{L.valuesLabel}</p>
          <h2 className={`${styles.sectionTitle} reveal`}>{t.about.values.title}</h2>

          <div className={`${styles.valuesGrid} reveal delay1`}>
            {t.about.values.items.map((item: any, i: number) => {
              const getValueIcon = (index: number) => {
                switch (index) {
                  case 0: // Quality First
                    return (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="M12 8v8"/>
                        <path d="M8 12h8"/>
                      </svg>
                    );
                  case 1: // Innovation
                    return (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                        <path d="M9 18h6"/>
                        <path d="M10 22h4"/>
                      </svg>
                    );
                  case 2: // Reliability
                    return (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    );
                  case 3: // Partnership
                    return (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    );
                  case 4: // Sustainability
                    return (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 9.3a7 7 0 0 1-9 8.7z"/>
                        <path d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                      </svg>
                    );
                  default:
                    return null;
                }
              };
              
              return (
                <div key={i} className={styles.valueCard}>
                  <span className={styles.valueNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.valueIcon}>{getValueIcon(i)}</div>
                  <h3 className={styles.valueTitle}>{item.title}</h3>
                  <p className={styles.valueText}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- CTA Section --- */}
        <CTA 
          title={L.ctaTitle}
          description={L.ctaDesc}
          btnText={L.ctaContact}
          href="/contact"
          secondaryBtnText={L.ctaInsights}
          secondaryHref="/insights"
        />

      </div>

    </div>
  );
}
