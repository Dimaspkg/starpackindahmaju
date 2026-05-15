"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../admin.module.css';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
}

export default function LeadsPage() {
  const { data: session } = useSession();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'new': return styles.statusNew;
      case 'contacted': return styles.statusContacted;
      case 'qualified': return styles.statusQualified;
      case 'closed': return styles.statusClosed;
      default: return '';
    }
  };

  if (loading) return <div className={styles.loading}>Loading Leads...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>All Leads</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Manage and track all customer inquiries.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={fetchLeads} className={styles.refreshBtn}>Refresh List</button>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Company</th>
              <th className={styles.th}>Interest</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.td} style={{ textAlign: 'center' }}>No leads found.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className={styles.tr}>
                  <td className={styles.td}>{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td className={styles.td}>
                    <div>{lead.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{lead.email}</div>
                    {lead.phone && <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>WA: {lead.phone}</div>}
                  </td>
                  <td className={styles.td}>{lead.company || '-'}</td>
                  <td className={styles.td}>{lead.interest}</td>
                  <td className={styles.td}>
                    <span className={`${styles.status} ${getStatusClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                      Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
