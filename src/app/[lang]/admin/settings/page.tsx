"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email_routing_enabled: 'true',
    notification_recipient: '',
    smtp_sender_name: '',
    email_footer: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading Settings...</div>;

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Settings</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>
            Configure email automation and routing for the contact form.
          </p>
        </div>
      </header>

      <form onSubmit={handleSave} className={styles.settingsContainer}>
        {message.text && (
          <div style={{ 
            padding: '1rem', 
            borderRadius: '8px', 
            background: message.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
            color: message.type === 'success' ? '#2ecc71' : '#e74c3c',
            border: `1px solid ${message.type === 'success' ? '#2ecc71' : '#e74c3c'}`,
            marginBottom: '1rem'
          }}>
            {message.text}
          </div>
        )}

        <div className={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>Email Routing Automation</h2>
            <a 
              href="/admin/settings/email-preview" 
              style={{ 
                fontSize: '0.8rem', 
                color: 'var(--primary)', 
                textDecoration: 'none', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Preview Template
            </a>
          </div>
          
          <div className={styles.field}>
            <label>Enable Email Routing</label>
            <select 
              value={settings.email_routing_enabled}
              onChange={(e) => setSettings({...settings, email_routing_enabled: e.target.value})}
            >
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
            <p>If enabled, an email will be sent automatically to the relevant department for every new lead.</p>
          </div>

          <div className={styles.field}>
            <label>Main Recipient Email</label>
            <input 
              type="email" 
              value={settings.notification_recipient}
              onChange={(e) => setSettings({...settings, notification_recipient: e.target.value})}
              placeholder="e.g. marketing@starpack.co.id"
              required
            />
            <p>All new lead notifications will be sent to this primary address.</p>
          </div>

          <div className={styles.field}>
            <label>Sender Display Name</label>
            <input 
              type="text" 
              value={settings.smtp_sender_name}
              onChange={(e) => setSettings({...settings, smtp_sender_name: e.target.value})}
              placeholder="e.g. Starpack Admin"
            />
            <p>This name will appear as the sender in the recipient's inbox.</p>
          </div>

          <div className={styles.field}>
            <label>Email Footer Text</label>
            <textarea 
              rows={3}
              value={settings.email_footer}
              onChange={(e) => setSettings({...settings, email_footer: e.target.value})}
              placeholder="Signature or footer text..."
            />
          </div>
        </div>

        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
