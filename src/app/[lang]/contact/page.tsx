"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import LocalizedLink from "@/components/LocalizedLink";
import styles from './contactPage.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    date: '',
    volume: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
    document.title = 'Contact Us | PT. STARPACK INDAHMAJU';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    // Adapt fields to match /api/inquiry body
    const submissionData = {
      name: formData.name,
      company: `Volume: ${formData.volume || 'N/A'} | Date: ${formData.date || 'N/A'}`,
      email: formData.email,
      phone: formData.phone,
      interest: formData.interest,
      message: formData.message
    };

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', interest: '', date: '', volume: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!mounted || !t.inquiry) return null;

  const labels = {
    pageTitle: language === 'id' ? 'Hubungi Kami' : language === 'jp' ? 'お問い合わせ' : language === 'zh' ? '联系我们' : 'Contact Us',
    tagLine: language === 'id' ? 'Rencanakan Proyek' : language === 'jp' ? 'プロジェクト計画' : language === 'zh' ? '规划项目' : 'Plan Project',
    headerInfo: language === 'id'
      ? 'Beri tahu kami kapan dan di mana Anda ingin memulai proyek kemasan Anda, dan kami akan mengonfirmasi ketersediaan slot produksi dalam 24 jam.'
      : language === 'jp'
        ? 'パッケージングプロジェクトの開始時期やご要望をお知らせください。24時間以内に生産スロットの空き状況を確認いたします。'
        : language === 'zh'
          ? '告诉我们您希望何时何地启动您的包装项目，我们将在24小时内确认生产档期的可用性。'
          : 'Tell us when and where you\'d like to initiate your packaging project and we\'ll confirm slot availability within 24 hours.',
    
    // Form fields
    nameLabel: language === 'id' ? 'Nama Lengkap' : language === 'jp' ? 'お名前' : language === 'zh' ? '姓名' : 'Name',
    namePlaceholder: language === 'id' ? 'Nama lengkap Anda' : language === 'jp' ? 'フルネームを入力' : language === 'zh' ? '您的全名' : 'Your full name',
    emailLabel: language === 'id' ? 'Email' : language === 'jp' ? 'メールアドレス' : language === 'zh' ? '电子邮件' : 'Email',
    emailPlaceholder: 'you@example.com',
    phoneLabel: language === 'id' ? 'Nomor Telepon' : language === 'jp' ? '電話番号' : language === 'zh' ? '电话号码' : 'Phone Number',
    phonePlaceholder: '+62 812...',
    interestLabel: language === 'id' ? 'Pilih Layanan' : language === 'jp' ? 'サービスを選択' : language === 'zh' ? '选择服务' : 'Select Service',
    interestPlaceholder: language === 'id' ? 'Pilih layanan...' : language === 'jp' ? 'サービスを選択...' : language === 'zh' ? '选择您的服务...' : 'Choose your service...',
    dateLabel: language === 'id' ? 'Tanggal Mulai yang Diinginkan' : language === 'jp' ? '希望開始日' : language === 'zh' ? '首选开始日期' : 'Preferred Date',
    volumeLabel: language === 'id' ? 'Jumlah Pesanan (Volume)' : language === 'jp' ? '予定生産数量' : language === 'zh' ? '预估生产数量' : 'Expected Volume',
    volumePlaceholder: language === 'id' ? 'Misal: 10.000 unit' : language === 'jp' ? '例：10,000 個' : language === 'zh' ? '例如：10,000 件' : 'e.g. 10,000 units',
    messageLabel: language === 'id' ? 'Pesan / Permintaan Khusus' : language === 'jp' ? 'メッセージ / 特別なリクエスト' : language === 'zh' ? '留言 / 特殊要求' : 'Message / Special Requests',
    messagePlaceholder: language === 'id' ? 'Ada hal lain yang perlu kami ketahui?' : language === 'jp' ? 'その他にご要望はありますか？' : language === 'zh' ? '还有什么我们需要了解的吗？' : 'Anything else we should know?',
    
    submitBtn: language === 'id' ? 'Kirim Permintaan Proyek' : language === 'jp' ? 'プロジェクト相談を送信する' : language === 'zh' ? '提交项目咨询' : 'Submit Project Inquiry',
    sending: language === 'id' ? 'Mengirim...' : language === 'jp' ? '送信中...' : language === 'zh' ? '提交中...' : 'Submitting...',
    
    // Bottom banner
    startNow: language === 'id' ? 'Mulai sekarang' : language === 'jp' ? '今すぐ始める' : language === 'zh' ? '现在开始' : 'Start now',
    discoverTitle: language === 'id' ? 'Temukan hasil akhir kemasan sempurna Anda' : language === 'jp' ? 'あなたの次の完璧なパッケージ仕上げを発見する' : language === 'zh' ? '探索您下一个完美的包装外观' : 'Discover your next perfect packaging finish',
    discoverDesc: language === 'id'
      ? 'Rencanakan proyek Anda dalam hitungan menit dan nikmati setiap momen dari transformasi estetika produk Anda.'
      : language === 'jp'
        ? 'わずか数分でプロジェクトを計画し、製品の美的な変革のすべての瞬間をお楽しみください。'
        : language === 'zh'
          ? '在几分钟内规划您的项目，享受您的产品美学蜕变的每一个时刻。'
          : 'Plan your project in minutes and enjoy every moment of your product\'s aesthetic transformation.',
    
    // Columns
    callTitle: language === 'id' ? 'Hubungi & WhatsApp' : language === 'jp' ? 'お電話 & WhatsApp' : language === 'zh' ? '电话与 WhatsApp' : 'Call & WhatsApp',
    hoursTitle: language === 'id' ? 'Jam Kerja' : language === 'jp' ? '営業時間' : language === 'zh' ? '营业时间' : 'Working Hours',
    hoursVal: language === 'id' ? 'Setiap Hari: 08.00 - 17.00' : language === 'jp' ? '毎日: 08:00 - 17:00' : language === 'zh' ? '每日: 08:00 - 17:00' : 'Daily: 8am-5pm',
    weekendVal: language === 'id' ? 'Sabtu - Minggu: Tutup' : language === 'jp' ? '土曜日 - 日曜日: 定休日' : language === 'zh' ? '周六 - 周日: 休息' : 'Saturday - Sunday: Closed',
    writeTitle: language === 'id' ? 'Tulis Kepada Kami' : language === 'jp' ? 'メールでお問い合わせ' : language === 'zh' ? '致信我们' : 'Write to Us',

    successMsg: language === 'id'
      ? 'Permintaan proyek Anda berhasil dikirim! Tim spesialis kami akan segera menghubungi Anda.'
      : language === 'jp'
        ? 'プロジェクトのご相談が正常に送信されました！弊社の専任担当者より追ってご連絡いたします。'
        : language === 'zh'
          ? '项目咨询已成功提交！我们的专家团队将尽快与您联系。'
          : 'Project inquiry submitted successfully! Our specialist team will contact you shortly.',
    errorMsg: language === 'id'
      ? 'Gagal mengirim permintaan proyek. Silakan coba lagi.'
      : language === 'jp'
        ? '送信に失敗しました。もう一度お試しください。'
        : language === 'zh'
          ? '提交失败，请重试。'
          : 'Failed to submit project inquiry. Please try again.',
  };

  return (
    <div className="pageContainer">
      <div className={styles.container}>
        
        <header className={styles.header}>
          {/* Mockup Title Block: Flex layout with aligned subtitle */}
          <div className={styles.titleRow}>
            <div className={styles.titleLeft}>
              <span className={styles.tagLine}>{labels.tagLine}</span>
              <h1 className={styles.title}>{labels.pageTitle}</h1>
            </div>
            <div className={styles.titleRight}>
              <p className={styles.headerInfo}>{labels.headerInfo}</p>
            </div>
          </div>
        </header>

        {/* Main Combined Card: Intake Form + Image Showcase */}
        <div className={styles.mainCombinedCard}>
          <div className={styles.formSection}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                
                {/* Name */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{labels.nameLabel}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={labels.namePlaceholder}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Email */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{labels.emailLabel}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={labels.emailPlaceholder}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{labels.phoneLabel}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={labels.phonePlaceholder}
                    className={styles.input}
                  />
                </div>

                {/* Select Service */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{labels.interestLabel}</label>
                  <div className={styles.selectWrapper}>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className={styles.select}
                      required
                    >
                      <option value="" disabled>{labels.interestPlaceholder}</option>
                      <option value="uv">{t.inquiry.form.interest_options.uv}</option>
                      <option value="vacuum">{t.inquiry.form.interest_options.vacuum}</option>
                      <option value="both">{t.inquiry.form.interest_options.both}</option>
                      <option value="consultation">{t.inquiry.form.interest_options.consultation}</option>
                    </select>
                    <div className={styles.selectArrow}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Preferred Date */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{labels.dateLabel}</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Expected Volume */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>{labels.volumeLabel}</label>
                  <input
                    type="text"
                    name="volume"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder={labels.volumePlaceholder}
                    className={styles.input}
                  />
                </div>

                {/* Message */}
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>{labels.messageLabel}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={labels.messagePlaceholder}
                    className={styles.textarea}
                    rows={4}
                    required
                  />
                </div>

              </div>

              {/* Action Button: Styled as pill button */}
              <div className={styles.submitRow}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? labels.sending : labels.submitBtn}
                </button>
              </div>

              {/* Status Alert Panels */}
              {status === 'success' && (
                <div className={styles.successAlert}>
                  <p className={styles.successText}>{labels.successMsg}</p>
                </div>
              )}
              {status === 'error' && (
                <div className={styles.errorAlert}>
                  <p className={styles.errorText}>{labels.errorMsg}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Visual Image Card */}
          <div className={styles.imageSection}>
            <div className={styles.showcaseImageWrapper}>
              <Image
                src="/images/contact/contact.png"
                alt="Premium Finishing"
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 50vw"
                className={styles.showcaseImage}
              />
            </div>
          </div>
        </div>

        {/* 3-Column Info Row (Call, Hours, Write) */}
        <div className={styles.contactDetailsRow}>
          
          {/* Call & WhatsApp */}
          <div className={styles.detailColumn}>
            <div className={styles.columnIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className={styles.detailColTitle}>{labels.callTitle}</h3>
            <a href={`tel:${t.inquiry.sales.phone}`} className={styles.detailColLink}>{t.inquiry.sales.phone}</a>
            <a 
              href={`https://wa.me/${t.inquiry.sales.whatsapp.replace(/\s+/g, '').replace(/^0/, '62')}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.detailColLink}
            >
              {t.inquiry.sales.whatsapp}
            </a>
          </div>

          {/* Working Hours */}
          <div className={styles.detailColumn}>
            <div className={styles.columnIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className={styles.detailColTitle}>{labels.hoursTitle}</h3>
            <p className={styles.detailColText}>{labels.hoursVal}</p>
            <p className={styles.detailColText} style={{ color: 'var(--primary)', fontWeight: 700 }}>{labels.weekendVal}</p>
          </div>

          {/* Write to Us */}
          <div className={styles.detailColumn}>
            <div className={styles.columnIconCircle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 className={styles.detailColTitle}>{labels.writeTitle}</h3>
            <a href={`mailto:${t.inquiry.sales.email}`} className={styles.detailColLink}>{t.inquiry.sales.email}</a>
            <a href="mailto:info@starpackindahmaju.com" className={styles.detailColLink}>info@starpackindahmaju.com</a>
          </div>

        </div>

        {/* Bottom Escape/Technology Banner Section */}
        <div className={styles.escapeBannerSection}>
          <div className={styles.escapeHeader}>
            <span className={styles.escapeBadge}>{labels.startNow}</span>
            <h2 className={styles.escapeTitle}>{labels.discoverTitle}</h2>
            <p className={styles.escapeDesc}>{labels.discoverDesc}</p>
          </div>

          <div className={styles.escapeGrid}>
            {/* Card 1: UV Coating */}
            <LocalizedLink href="/technology/uv-coating" className={styles.escapeCard}>
              <div className={styles.escapeCardImgWrapper}>
                <Image
                  src="/images/UV_Curing_Systems/UV-Curing-Systems.png"
                  alt="UV Coating Technology"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.escapeCardImg}
                />
                <div className={styles.escapeCardOverlay} />
                <div className={styles.escapeCardBadge}>
                  <span>UV Coating</span>
                </div>
                <div className={styles.escapeCardBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
            </LocalizedLink>

            {/* Card 2: Vacuum Metallizing */}
            <LocalizedLink href="/technology/vacuum-metallizing" className={styles.escapeCard}>
              <div className={styles.escapeCardImgWrapper}>
                <Image
                  src="/images/Vacuum_Metallizing/Vacuum-Metallizing.png"
                  alt="Vacuum Metallizing Technology"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.escapeCardImg}
                />
                <div className={styles.escapeCardOverlay} />
                <div className={styles.escapeCardBadge}>
                  <span>Vacuum Metallizing</span>
                </div>
                <div className={styles.escapeCardBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>
            </LocalizedLink>
          </div>
        </div>

      </div>
    </div>
  );
}
