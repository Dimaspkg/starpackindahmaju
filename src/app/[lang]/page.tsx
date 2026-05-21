"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import Hero from '@/components/Hero';
import CTA from '@/components/CTA';
import EffectsSection from '@/components/EffectsSection';
import PortfolioCarousel from '@/components/PortfolioCarousel';
import styles from './homePage.module.css';
import { useLanguage } from '@/context/LanguageContext';

// Simple arrow icon
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ---- Premium Values Icons ---- */
const QualityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const InnovationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.886L4.2 9l5.886 1.911L12 17l1.911-5.887L19.8 11l-5.887-1.912z" />
    <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
  </svg>
);

const ReliabilityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const PartnershipIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const getValueIcon = (index: number) => {
  switch (index) {
    case 0:
      return <QualityIcon />;
    case 1:
      return <InnovationIcon />;
    case 2:
      return <ReliabilityIcon />;
    case 3:
      return <PartnershipIcon />;
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

export default function Home() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !t.about) return null;

  // Get latest 3 articles from locale data
  const latestPosts = t.insights?.items?.slice(0, 3) ?? [];


  /* ---- Labels per language ---- */
  const l = {
    aboutTitle: language === 'id' ? 'Tentang Starpack' : language === 'jp' ? 'スターパックについて' : language === 'zh' ? '关于Starpack' : 'About Starpack',
    aboutSlogan: language === 'id'
      ? 'Mendefinisikan Ulang Estetika Produk Dengan Lapisan Presisi Tinggi'
      : language === 'jp'
        ? '高精度コーティングで製品の美学を再定義する'
        : language === 'zh'
          ? '以高精度涂层重新定义产品美学'
          : 'Redefining Product Aesthetics With High-Precision Coatings',
    aboutViewAll: language === 'id' ? 'Selengkapnya' : language === 'jp' ? '詳細を見る' : language === 'zh' ? '了解更多' : 'Learn More',
    sinceLabel: language === 'id' ? 'Berdiri Sejak' : language === 'jp' ? '設立' : language === 'zh' ? '成立年份' : 'Founded',
    clientLabel: language === 'id' ? 'Klien Puas' : language === 'jp' ? '満足した顧客' : language === 'zh' ? '满意客户' : 'Happy Clients',
    unitsLabel: language === 'id' ? 'Unit / Tahun' : language === 'jp' ? '個/年' : language === 'zh' ? '件/年' : 'Units / Year',

    techTitle: t.tech?.title ?? 'Technology & Machinery',
    techViewAll: language === 'id' ? 'Lihat Detail Teknologi' : language === 'jp' ? '技術の詳細を見る' : language === 'zh' ? '查看技术详情' : 'View Technology Details',

    industryTitle: t.industry?.title ?? 'Industries We Serve',
    industryDesc: t.industry?.description ?? '',
    industryViewAll: language === 'id' ? 'Semua Industri' : language === 'jp' ? '全業種を見る' : language === 'zh' ? '查看所有行业' : 'All Industries',

    qualityTitle: t.quality?.title ?? 'Quality & Certification',
    qualityDesc: t.quality?.description ?? '',
    qualityViewAll: language === 'id' ? 'Lihat Sertifikasi' : language === 'jp' ? '認証の詳細' : language === 'zh' ? '查看认证' : 'View Certifications',

    insightsTitle: t.nav.insights,
    insightsViewAll: language === 'id' ? 'Semua Artikel' : language === 'jp' ? '全記事を見る' : language === 'zh' ? '查看所有文章' : 'All Articles',

    ctaTitle: language === 'id' ? 'Siap Memulai Proyek Anda?' : language === 'jp' ? 'プロジェクトを始める準備は？' : language === 'zh' ? '准备好开始您的项目了吗？' : 'Ready to Start Your Project?',
    ctaDesc: language === 'id'
      ? 'Konsultasikan kebutuhan finishing produk plastik Anda dengan tim spesialis kami. Dapatkan penawaran terbaik sesuai spesifikasi produksi Anda.'
      : language === 'jp'
        ? '当社のスペシャリストチームにプラスチック製品の仕上げに関するご相談をお寄せください。最高の見積もりをご提供いたします。'
        : language === 'zh'
          ? '请与我们的专家团队咨询您的塑料产品涂装需求，获取符合您生产规格的最优报价。'
          : 'Consult your plastic product finishing needs with our specialist team. Get the best quote tailored to your production specifications.',
    ctaContact: language === 'id' ? 'Hubungi Kami Sekarang' : language === 'jp' ? '今すぐ問い合わせる' : language === 'zh' ? '立即联系我们' : 'Contact Us Now',
    ctaBrochure: language === 'id' ? 'Unduh Brosur' : language === 'jp' ? 'パンフレットをダウンロード' : language === 'zh' ? '下载宣传册' : 'Download Brochure',
  };

  const qualityCommitments: string[] = t.quality?.commitment?.items?.map((i: any) => i.title) ?? [];
  const qualityCapabilities: string[] = t.quality?.capabilities?.items?.slice(0, 4) ?? [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ===== HERO ===== */}
      <Hero />

      <PortfolioCarousel />

      <div className="pageContainer">

        {/* ===== ABOUT SECTION ===== */}
        <section className={styles.section} id="about">
          {/* Sophisticated Overhaul Header */}
          <div className={`${styles.aboutOverhaulHeader} reveal`}>
            <div className={styles.aboutHeaderLeft}>
              <span className={styles.aboutSectionSubtitle}>{l.aboutTitle}</span>
              <h2 className={styles.aboutOverhaulTitle}>{l.aboutSlogan}</h2>
            </div>
            <LocalizedLink href="/about" className={styles.aboutPremiumLink}>
              {l.aboutViewAll} <Arrow />
            </LocalizedLink>
          </div>

          {/* Asymmetrical 2-Column Content Grid */}
          <div className={styles.aboutNewGrid}>
            {/* Left Column: Story, Mission Card, and Core Values */}
            <div className={`${styles.aboutLeftColumn} reveal delay1`}>
              <p className={styles.aboutStoryParagraph}>{t.about.story.text}</p>
              
              {/* Mission Statement */}
              <div className={styles.premiumMissionCard}>
                <div className={styles.missionCardHeader}>
                  <div className={styles.missionIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <h3 className={styles.missionTitle}>{t.about.mission.title}</h3>
                </div>
                <p className={styles.missionText}>{t.about.mission.text}</p>
              </div>

              {/* 2x2 Core Values Grid */}
              <div className={styles.premiumValuesContainer}>
                <h4 className={styles.valuesGroupTitle}>{t.about.values.title}</h4>
                <div className={styles.premiumValuesGrid}>
                  {t.about.values.items.slice(0, 4).map((item: any, i: number) => (
                    <div key={i} className={styles.valueCardItem}>
                      <div className={styles.valueIconBox}>
                        {getValueIcon(i)}
                      </div>
                      <div className={styles.valueContentBox}>
                        <h5 className={styles.valueItemTitle}>{item.title}</h5>
                        <p className={styles.valueItemText}>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Layered Premium Image Showcase */}
            <div className={`${styles.aboutRightColumn} reveal delay2`}>
              <div className={styles.imageShowcaseContainer}>
                {/* Flat physical offset frame in the background */}
                <div className={styles.imageShowcaseFrame} />
                
                <div className={styles.imageShowcaseWrapper}>
                  <Image
                    src={t.about.image}
                    alt="Starpack Advanced Factory Facility"
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    className={styles.imageShowcasePhoto}
                    priority
                  />
                  {/* ESTABLISHED 1996 floating capsule */}
                  <div className={styles.establishedCapsule}>
                    <span className={styles.establishedYear}>1996</span>
                    <span className={styles.establishedLabel}>ESTABLISHED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EffectsSection />

        {/* ===== TECHNOLOGY SECTION ===== */}
        <section className={styles.section} id="technology">
          <div className={`${styles.sectionHeader} reveal`}>
            <div>
              <h2 className={styles.sectionTitle}>{l.techTitle}</h2>
              <p className={styles.sectionDesc}>{t.tech?.description}</p>
            </div>
            <LocalizedLink href="/technology" className={styles.viewAllBtn}>
              {l.techViewAll} <Arrow />
            </LocalizedLink>
          </div>

          <div className={`${styles.techGrid} reveal delay1`}>
            {t.tech?.categories?.map((cat: any, i: number) => (
              <div key={i} className={styles.techCard}>
                <h3 className={styles.techCardTitle}>{cat.title}</h3>
                <div className={styles.techCardItems}>
                  {cat.items.slice(0, 4).map((item: string, j: number) => (
                    <div key={j} className={styles.techItem}>
                      <span className={styles.dot}>●</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== INDUSTRIES SECTION ===== */}
        <section className={styles.section} id="industry">
          <div className={`${styles.sectionHeader} reveal`}>
            <div>
              <h2 className={styles.sectionTitle}>{l.industryTitle}</h2>
              <p className={styles.sectionDesc}>{l.industryDesc}</p>
            </div>
            <LocalizedLink href="/industries" className={styles.viewAllBtn}>
              {l.industryViewAll} <Arrow />
            </LocalizedLink>
          </div>

          <div className={`${styles.industriesGrid} reveal delay1`}>
            {t.industry?.items?.slice(0, 6).map((item: any, i: number) => {
              const slugMap = [
                'beauty-cosmetics',
                'electronics',
                'fashion-accessories',
                'home-lifestyle',
                'automotive',
                'many-more',
              ];
              const slug = slugMap[i] ?? 'industries';
              return (
                <LocalizedLink key={i} href={`/industries/${slug}`} className={styles.industryCard}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.industryImg}
                  />
                  <div className={styles.industryOverlay}>
                    <span className={styles.industryName}>{item.title}</span>
                  </div>
                </LocalizedLink>
              );
            })}
          </div>
        </section>

        {/* ===== QUALITY SECTION ===== */}
        <section className={styles.section} id="quality">
          <div className={`${styles.sectionHeader} reveal`}>
            <div>
              <h2 className={styles.sectionTitle}>{l.qualityTitle}</h2>
              <p className={styles.sectionDesc}>{l.qualityDesc}</p>
            </div>
            <LocalizedLink href="/quality-certification" className={styles.viewAllBtn}>
              {l.qualityViewAll} <Arrow />
            </LocalizedLink>
          </div>

          <div className={`${styles.qualityLayout} reveal delay1`}>
            <div className={styles.qualityImgBox}>
              <Image
                src="/images/ISO_Certification.png"
                alt="ISO 9001:2015 Certificate"
                width={260}
                height={360}
                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              />
            </div>

            <div className={styles.qualityContent}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)' }}>
                {t.quality?.commitment?.title}
              </h3>
              {qualityCommitments.length > 0 && (
                <div className={styles.qualityPills}>
                  {qualityCommitments.map((item, i) => (
                    <span key={i} className={styles.qualityPill}>{item}</span>
                  ))}
                </div>
              )}
              <div style={{ marginTop: '0.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '1rem' }}>
                  {t.quality?.capabilities?.title}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  {qualityCapabilities.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.6rem', color: 'var(--muted-text)', fontSize: '0.95rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 800, flexShrink: 0 }}>✔</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== INSIGHTS SECTION ===== */}
        <section className={styles.section} id="insights">
          <div className={`${styles.sectionHeader} reveal`}>
            <div>
              <h2 className={styles.sectionTitle}>{l.insightsTitle}</h2>
            </div>
            <LocalizedLink href="/insights" className={styles.viewAllBtn}>
              {l.insightsViewAll} <Arrow />
            </LocalizedLink>
          </div>

          {latestPosts.length > 0 ? (
            <div className={`${styles.insightsGrid} reveal delay1`}>
              {latestPosts.map((post: any, i: number) => (
                <LocalizedLink key={i} href={`/insights/${post.slug}`} className={styles.insightCard}>
                  <div className={styles.insightImgWrapper}>
                    <Image
                      src={post.image || '/images/herro/herro.png'}
                      alt={post.title ?? ''}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className={styles.insightImg}
                    />
                  </div>
                  <div className={styles.insightBody}>
                    <span className={styles.insightCat}>{post.category ?? 'Insights'}</span>
                    <p className={styles.insightTitle}>{post.title}</p>
                    <span className={styles.insightDate}>{post.date ?? ''}</span>
                  </div>
                </LocalizedLink>
              ))}
            </div>
          ) : (
            /* Fallback if no articles in locale */
            <div className="reveal delay1" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted-text)' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                {language === 'id' ? 'Artikel terbaru akan segera tersedia.' : 'Latest articles coming soon.'}
              </p>
              <LocalizedLink href="/insights" className={styles.viewAllBtn}>
                {l.insightsViewAll} <Arrow />
              </LocalizedLink>
            </div>
          )}
        </section>

        {/* ===== CONTACT CTA ===== */}
        <CTA 
          title={l.ctaTitle}
          description={l.ctaDesc}
          btnText={l.ctaContact}
          href="/contact"
          secondaryBtnText={l.ctaBrochure}
          secondaryHref="/insights"
        />

      </div>

    </div>
  );
}
