"use client";

import styles from './InquirySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function InquirySection() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Inquiry sent! (Demo)');
  };

  return (
    <section className={styles.inquiryContainer} id="inquiry">
      <div className={styles.header}>
        <h2 className={styles.title}>{t.inquiry.title}</h2>
        <p className={styles.description}>{t.inquiry.description}</p>
      </div>

      <div className={styles.mainContent}>
        <div className={`${styles.leftCol} reveal fadeLeft`}>
          <div className={styles.infoGroup}>
            <h3 className={styles.subTitle}>{t.inquiry.info.title}</h3>
            
            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <span className={styles.label}>{t.inquiry.info.company}:</span>
                <span className={styles.value}> {t.inquiry.info.company_val}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>{t.inquiry.info.location}:</span>
                <span className={styles.value}> {t.inquiry.info.location_val}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>{t.inquiry.info.founded}:</span>
                <span className={styles.value}> {t.inquiry.info.founded_val}</span>
              </div>
            </div>

            <div className={styles.servicesSection}>
              <h4 className={styles.servicesTitle}>{t.inquiry.info.services_title}</h4>
              <ul className={styles.servicesList}>
                {t.inquiry.info.services.map((service: string, index: number) => (
                  <li key={index} className={styles.serviceItem}>
                    <span className={styles.check}>✓</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={`${styles.rightCol} reveal fadeRight`}>
          <div className={styles.formCard}>
            <h3 className={styles.subTitle}>{t.inquiry.form.title}</h3>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.name}</label>
                <input 
                  type="text" 
                  placeholder={t.inquiry.form.name_placeholder}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.company}</label>
                <input 
                  type="text" 
                  placeholder={t.inquiry.form.company_placeholder}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.email}</label>
                <input 
                  type="email" 
                  placeholder={t.inquiry.form.email_placeholder}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.interest}</label>
                <select className={styles.select} required defaultValue="">
                  <option value="" disabled>{t.inquiry.form.interest_placeholder}</option>
                  <option value="uv">UV Coating</option>
                  <option value="vacuum">Vacuum Metallizing</option>
                  <option value="custom">Custom Solutions</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.message}</label>
                <textarea 
                  placeholder={t.inquiry.form.message_placeholder}
                  className={styles.textarea}
                  rows={4}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                {t.inquiry.form.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
