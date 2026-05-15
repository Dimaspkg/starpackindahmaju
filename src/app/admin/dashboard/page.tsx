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
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Overview</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Welcome back, {session?.user?.name || 'Admin'}
          </p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Total Leads</span>
          <span className={styles.cardValue}>{stats.total}</span>
          <span className={`${styles.cardTrend} ${styles.trendUp}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            All time
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>New Leads</span>
          <span className={styles.cardValue}>{stats.new}</span>
          <span className={`${styles.cardTrend} ${styles.trendUp}`}>
            Action required
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Qualified</span>
          <span className={styles.cardValue}>{stats.qualified}</span>
          <span className={`${styles.cardTrend} ${styles.trendUp}`}>
            {((stats.qualified / (stats.total || 1)) * 100).toFixed(0)}% conversion
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
