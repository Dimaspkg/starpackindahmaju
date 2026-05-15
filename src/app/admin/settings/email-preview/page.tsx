"use client";

import styles from '../../admin.module.css';

export default function EmailPreviewPage() {
  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Email Template Preview</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>
            This is how the automated notification email looks in the recipient's inbox.
          </p>
        </div>
        <button 
          onClick={() => window.history.back()} 
          className={styles.refreshBtn}
          style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}
        >
          ← Back to Settings
        </button>
      </header>

      <div style={{ 
        background: 'var(--card-bg)', 
        padding: '2rem', 
        borderRadius: '16px', 
        border: '1px solid var(--card-border)',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <iframe 
          src="/api/admin/settings/preview" 
          style={{ 
            width: '100%', 
            maxWidth: '650px', 
            height: '800px', 
            border: 'none',
            borderRadius: '8px',
            background: 'white'
          }}
          title="Email Template Preview"
        />
      </div>
    </div>
  );
}
