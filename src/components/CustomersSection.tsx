"use client";

import styles from './CustomersSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function CustomersSection() {
  const { t } = useLanguage();

  // Handle translation fallback safely
  const title = (t as any).customers?.title || "Our Customers";

  return (
    <section className={styles.container} id="customers">
      <div className={`${styles.header} reveal fadeUp`}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.line}></div>
      </div>

      <div className={styles.grid}>
        {/* Shiseido */}
        <div className={`${styles.logoCard} reveal fadeUp`}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '0.22em', fontWeight: 500, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
            SHISEIDO
          </span>
        </div>

        {/* Nars */}
        <div className={`${styles.logoCard} reveal fadeUp delay1`}>
          <span style={{ fontFamily: '"Arial Black", Gadget, sans-serif', letterSpacing: '-0.07em', fontWeight: 900, fontSize: '1.8rem', color: 'var(--text-primary)', transform: 'scaleY(0.95)' }}>
            NARS
          </span>
        </div>

        {/* Laura Mercier */}
        <div className={`${styles.logoCard} reveal fadeUp delay2`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: '"Century Gothic", Futura, sans-serif', letterSpacing: '0.12em', fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              LAURA MERCIER
            </span>
            <span style={{ fontSize: '0.45rem', letterSpacing: '0.22em', marginTop: '3px', opacity: 0.6, fontWeight: 700, color: 'var(--text-primary)' }}>
              PARIS I NEW YORK
            </span>
          </div>
        </div>

        {/* OleHenriksen */}
        <div className={`${styles.logoCard} reveal fadeUp delay3`}>
          <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.04em', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            <span style={{ fontWeight: 300 }}>OLE</span><span style={{ fontWeight: 800 }}>HENRIKSEN</span>
          </span>
        </div>

        {/* Marc Jacobs */}
        <div className={`${styles.logoCard} reveal fadeUp`}>
          <span style={{ fontFamily: '"Century Gothic", sans-serif', letterSpacing: '0.18em', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            MARC JACOBS
          </span>
        </div>

        {/* Fenty Beauty */}
        <div className={`${styles.logoCard} reveal fadeUp delay1`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.28em', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              FENTY BEAUTY
            </span>
            <span style={{ fontSize: '0.45rem', letterSpacing: '0.25em', marginTop: '3px', opacity: 0.5, fontWeight: 600, color: 'var(--text-primary)' }}>
              BY RIHANNA
            </span>
          </div>
        </div>

        {/* Avon */}
        <div className={`${styles.logoCard} reveal fadeUp delay2`}>
          <span style={{ fontFamily: 'Futura, "Century Gothic", sans-serif', letterSpacing: '0.25em', fontWeight: 600, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
            AVON
          </span>
        </div>

        {/* Schwan Cosmetics */}
        <div className={`${styles.logoCard} reveal fadeUp delay3`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <svg width="18" height="18" viewBox="0 0 100 100" fill="currentColor" style={{ opacity: 0.85, color: 'var(--text-primary)' }}>
              <path d="M50 15 C35 15, 30 25, 30 35 C30 50, 48 58, 48 68 C48 78, 38 82, 25 82 L75 82 C62 82, 52 78, 52 68 C52 58, 70 50, 70 35 C70 25, 65 15, 50 15 Z" />
              <circle cx="50" cy="30" r="6" />
            </svg>
            <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              schwan cosmetics
            </span>
          </div>
        </div>

        {/* Revlon */}
        <div className={`${styles.logoCard} reveal fadeUp`}>
          <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.12em', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
            REVLON
          </span>
        </div>

        {/* L'Oreal */}
        <div className={`${styles.logoCard} reveal fadeUp delay1`}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '0.08em', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            L'ORÉAL
          </span>
        </div>

        {/* MAC */}
        <div className={`${styles.logoCard} reveal fadeUp delay2`}>
          <span style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: '0.15em', fontWeight: 900, fontSize: '1.45rem', color: 'var(--text-primary)' }}>
            M·A·C
          </span>
        </div>

        {/* Stila */}
        <div className={`${styles.logoCard} reveal fadeUp delay3`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '0.15em', fontWeight: 300, fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--text-primary)' }}>
              stila
            </span>
            <span style={{ fontSize: '0.45rem', letterSpacing: '0.12em', opacity: 0.6, marginTop: '2px', color: 'var(--text-primary)' }}>
              cosmetics
            </span>
          </div>
        </div>

        {/* KVD */}
        <div className={`${styles.logoCard} reveal fadeUp`}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '0.06em', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-primary)' }}>
            KVD
          </span>
        </div>

        {/* Canmake */}
        <div className={`${styles.logoCard} reveal fadeUp delay1`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.08em', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              CANMAKE
            </span>
            <span style={{ fontSize: '0.45rem', letterSpacing: '0.12em', opacity: 0.6, marginTop: '2px', color: 'var(--text-primary)' }}>
              TOKYO
            </span>
          </div>
        </div>

        {/* Rose Inc */}
        <div className={`${styles.logoCard} reveal fadeUp delay2`}>
          <span style={{ fontFamily: '"Times New Roman", Times, serif', letterSpacing: '0.12em', fontWeight: 600, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
            ROSE INC
          </span>
        </div>

        {/* Urban Decay */}
        <div className={`${styles.logoCard} reveal fadeUp delay3`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: '"Arial Black", sans-serif', letterSpacing: '0.04em', fontWeight: 900, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              URBAN DECAY
            </span>
          </div>
        </div>

        {/* Glossier */}
        <div className={`${styles.logoCard} reveal fadeUp`}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Glossier.
          </span>
        </div>

        {/* bareMinerals */}
        <div className={`${styles.logoCard} reveal fadeUp delay1`}>
          <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400, fontSize: '1.05rem', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
            bareMinerals
          </span>
        </div>

        {/* Rollover Reaction */}
        <div className={`${styles.logoCard} reveal fadeUp delay2`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.18em', fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
              ROLLOVER
            </span>
            <span style={{ fontFamily: 'Helvetica, Arial, sans-serif', letterSpacing: '0.18em', fontWeight: 600, fontSize: '0.8rem', marginTop: '2px', color: 'var(--text-primary)' }}>
              REACTION
            </span>
          </div>
        </div>

        {/* Wardah */}
        <div className={`${styles.logoCard} reveal fadeUp delay3`}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontFamily: '"Century Gothic", sans-serif', letterSpacing: '0.12em', fontWeight: 500, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              Wardah
            </span>
            <span style={{ fontSize: '0.45rem', letterSpacing: '0.08em', opacity: 0.6, marginTop: '2px', color: 'var(--text-primary)' }}>
              cosmetics
            </span>
          </div>
        </div>

        {/* Kemas */}
        <div className={`${styles.logoCard} reveal fadeUp`} style={{ border: '1px solid rgba(230, 0, 0, 0.25)', background: 'rgba(230, 0, 0, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--text-primary)' }}>
              KEMAS
            </span>
            <span style={{ color: '#e60000', fontSize: '1.3rem', fontWeight: 900, lineHeight: 1, transform: 'translateY(-1px)' }}>
              |
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
