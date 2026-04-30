"use client";

import { useState } from 'react';
import styles from './InquirySection.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function InquirySection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.inquiryContainer} id="inquiry">
      <div className={styles.content}>
        <div className={styles.tag}>{t.inquiry.tag}</div>
        <h2 className={styles.title}>{t.inquiry.title}</h2>
        <p className={styles.description}>
          {t.inquiry.description}
        </p>

        <div className={styles.mainCard}>
          <div className={styles.leftInfo}>
            <div className={styles.salesInfo}>
              <h3 className={styles.salesTitle}>{t.inquiry.sales.title}</h3>
              <div className={styles.contactDetails}>
                <p className={styles.contactItem}>
                  <strong>Email:</strong> <a href={`mailto:${t.inquiry.sales.email}`}>{t.inquiry.sales.email}</a>
                </p>
                <p className={styles.contactItem}>
                  <strong>Phone:</strong> {t.inquiry.sales.phone}
                </p>
              </div>
              <p className={styles.note}>{t.inquiry.sales.note}</p>
            </div>
          </div>

          <div className={styles.rightForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>{t.inquiry.form.name}</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t.inquiry.form.company}</label>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t.inquiry.form.email}</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>{t.inquiry.form.phone}</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>{t.inquiry.form.message}</label>
                <textarea 
                  name="message" 
                  rows={4} 
                  value={formData.message} 
                  onChange={handleChange}
                  placeholder={t.inquiry.form.message_placeholder}
                  required
                ></textarea>
              </div>

              <div className={styles.buttonGroup}>
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? '...' : t.inquiry.form.submit}
                </button>
                <button type="button" className={styles.backBtn} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                  {t.inquiry.form.back}
                </button>
              </div>

              {status === 'success' && <p className={styles.successMsg}>{t.inquiry.form.success}</p>}
              {status === 'error' && <p className={styles.errorMsg}>{t.inquiry.form.error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
