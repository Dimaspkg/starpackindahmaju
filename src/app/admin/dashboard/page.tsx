"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '../admin.module.css';

interface Lead {
  id: number;
  name: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leads')
      .then(res => res.json())
      .then(data => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    recent: leads.slice(0, 5)
  };

  if (loading) return <div className={styles.loading}>Loading Overview...</div>;

  return (
    <div className={styles.adminContainer}>
      <div style={{ marginBottom: '2.25rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 750, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>Dashboard Overview</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>Here is what's happening with your leads today.</p>
      </div>

      <div className={styles.statsGrid}>
        {/* Total Leads */}
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className={styles.cardLabel}>Total Leads</span>
              <span className={styles.cardValue}>{stats.total}</span>
            </div>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <span className={`${styles.cardTrend} ${styles.trendUp}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            All time
          </span>
        </div>

        {/* New Leads */}
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className={styles.cardLabel}>New Leads</span>
              <span className={styles.cardValue}>{stats.new}</span>
            </div>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#f59f0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>
          <span className={`${styles.cardTrend} ${styles.trendUp}`} style={{ color: stats.new > 0 ? '#f59f0b' : '#10b981' }}>
            {stats.new > 0 ? 'Requires attention' : 'All caught up'}
          </span>
        </div>

        {/* Qualified Leads */}
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span className={styles.cardLabel}>Qualified</span>
              <span className={styles.cardValue}>{stats.qualified}</span>
            </div>
            <div style={{
              padding: '0.75rem',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
          </div>
          <span className={`${styles.cardTrend} ${styles.trendUp}`}>
            {((stats.qualified / (stats.total || 1)) * 100).toFixed(0)}% conversion rate
          </span>
        </div>
      </div>

      <div className={styles.recentSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Leads</h2>
          <Link href="/admin/leads" style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}>
            View All →
          </Link>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.length === 0 ? (
                <tr>
                  <td colSpan={3} className={styles.td} style={{ textAlign: 'center' }}>No recent activity.</td>
                </tr>
              ) : (
                stats.recent.map((lead) => (
                  <tr key={lead.id} className={styles.tr}>
                    <td className={styles.td}>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td className={styles.td}>{lead.name}</td>
                    <td className={styles.td}>
                      <span className={`${styles.status} ${styles[`status${lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}`] || ''}`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
