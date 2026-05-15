"use client";

import { useState } from 'react';
import styles from './InquirySection.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function InquirySection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', interest: '', message: '' });
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.inquiry.form.name_placeholder}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.company}</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t.inquiry.form.company_placeholder}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.email}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.inquiry.form.email_placeholder}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.phone}</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.inquiry.form.phone_placeholder}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>{t.inquiry.form.interest}</label>
                <select 
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className={styles.select} 
                  required
                >
                  <option value="" disabled>{t.inquiry.form.interest_placeholder}</option>
                  <option value="uv">{t.inquiry.form.interest_options.uv}</option>
                  <option value="vacuum">{t.inquiry.form.interest_options.vacuum}</option>
                  <option value="both">{t.inquiry.form.interest_options.both}</option>
                  <option value="consultation">{t.inquiry.form.interest_options.consultation}</option>
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.topAlign}`}>
                <label className={styles.formLabel}>{t.inquiry.form.message}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.inquiry.form.message_placeholder}
                  className={styles.textarea}
                  rows={4}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : t.inquiry.form.submit}
              </button>

              {status === 'success' && (
                <p style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>
                  Inquiry sent successfully! We will contact you soon.
                </p>
              )}
              {status === 'error' && (
                <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
                  Failed to send inquiry. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

