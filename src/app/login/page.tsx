"use client";

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';

const SLIDES = [
  '/images/effects/effect1.png',
  '/images/effects/effect2.png',
  '/images/effects/effect3.png',
  '/images/effects/effect4.png',
  '/images/effects/effect5.png',
  '/images/effects/effect6.png',
  '/images/effects/holographic2.png',
  '/images/effects/effect8.png',
];

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', { username, password, redirect: false });
      if (result?.error) {
        setError('Username atau password salah. Silakan coba lagi.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>

      {/* LEFT: Form Panel */}
      <div className={styles.leftPanel}>
        {/* Logo */}
        <div className={styles.formLogo}>
          <Image src="/logo_starpack.png" alt="PT. Starpack Indahmaju"
            width={200} height={80} style={{ objectFit: 'contain' }}
            className={styles.logoLight} priority />
          <Image src="/logo_starpack_white.png" alt="PT. Starpack Indahmaju"
            width={200} height={80} style={{ objectFit: 'contain' }}
            className={styles.logoDark} priority />
        </div>

        <p className={styles.loginSubtitle}>Silakan masuk untuk melanjutkan.</p>

        {error && (
          <div className={styles.errorBox}>
            <span>⚠</span> {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input type="text" className={styles.input}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required autoFocus />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input type="password" className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading && <span className={styles.spinner} />}
            {loading ? 'Memverifikasi...' : 'Masuk'}
          </button>
        </form>

        <p className={styles.footer}>
          © {new Date().getFullYear()} PT. Starpack Indahmaju. All rights reserved.
        </p>
      </div>

      {/* RIGHT: Slideshow Panel */}
      <div className={styles.rightPanel}>
        {SLIDES.map((src, i) => (
          <div key={src} className={`${styles.slide} ${i === currentSlide ? styles.slideActive : ''}`}>
            <Image src={src} alt={`slide ${i + 1}`} fill className={styles.slideImage} priority={i === 0} />
          </div>
        ))}
        <div className={styles.slideOverlay} />
        <div className={styles.dotRow}>
          {SLIDES.map((_, i) => (
            <button key={i}
              className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>

    </div>
  );
}
