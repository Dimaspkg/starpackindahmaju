"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      {/* Left decorative panel */}
      <div className={styles.leftPanel}>
        <div className={styles.circle} style={{ width: 300, height: 300, top: -100, left: -100 }} />
        <div className={styles.circle} style={{ width: 500, height: 500, bottom: -200, right: -200 }} />
        <div className={styles.circle} style={{ width: 200, height: 200, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(255,51,51,0.05)' }} />

        <div className={styles.leftPanelContent}>
          <div className={styles.brandLogo}>STARPACK</div>
          <p className={styles.brandTagline}>
            PT. Starpack Indahmaju<br />
            Admin Management Panel<br />
            <br />
            UV Plastic Coating Specialist<br />
            Jakarta, Indonesia — Est. 1996
          </p>
          <div className={styles.brandStat}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>10M+</span>
              <span className={styles.statLabel}>Units Produced</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Clients</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>28+</span>
              <span className={styles.statLabel}>Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className={styles.rightPanel}>
        <div className={styles.loginBox}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>
              Selamat <span>Datang</span>
            </h1>
            <p className={styles.loginSubtitle}>
              Masuk ke panel admin untuk mengelola data leads
            </p>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <span>⚠</span> {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Username</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading && <span className={styles.spinner} />}
              {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <p className={styles.footer}>
            © 2024 PT. Starpack Indahmaju. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
