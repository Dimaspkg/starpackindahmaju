"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../admin.module.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/admin/leads');
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleExportPDF = () => {
    if (leads.length === 0) return;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // 1. Brand Logo Accent and Header
    doc.setFontSize(22);
    doc.setTextColor(230, 0, 0); // PT Starpack Red
    doc.text('PT. STARPACK INDAHMAJU', 14, 15);

    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('Customer Inquiry Leads Report', 14, 21);

    // Dynamic brand accent colored bar
    doc.setDrawColor(230, 0, 0);
    doc.setLineWidth(1.2);
    doc.line(14, 25, 283, 25);

    // Document Metadata
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    const genDate = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    doc.text(`Generated: ${genDate} WIB`, 14, 31);
    doc.text(`Total Leads: ${leads.length} Records`, 14, 36);

    // 2. Prepare table contents
    const tableColumn = ["No.", "Date Received", "Client Name / Email", "Company", "Phone / WA", "Inquiry Interest", "Status"];
    const tableRows: any[] = [];

    leads.forEach((lead, index) => {
      const formattedDate = new Date(lead.created_at).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      const nameAndEmail = `${lead.name}\n${lead.email}`;
      const statusText = lead.status.toUpperCase();

      const rowData = [
        index + 1,
        formattedDate,
        nameAndEmail,
        lead.company || '-',
        lead.phone || '-',
        lead.interest,
        statusText
      ];
      tableRows.push(rowData);
    });

    // 3. Draw Report Table
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 42,
      theme: 'striped',
      styles: {
        fontSize: 9,
        cellPadding: 4,
        valign: 'middle',
        font: 'helvetica',
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [230, 0, 0], // Starpack Red brand color
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },  // No.
        1: { cellWidth: 28, halign: 'center' },  // Date
        2: { cellWidth: 55 },                    // Client Name / Email
        3: { cellWidth: 40 },                    // Company
        4: { cellWidth: 35, halign: 'center' },  // Phone / WA
        5: { cellWidth: 70 },                    // Inquiry Interest
        6: { cellWidth: 30, halign: 'center', fontStyle: 'bold' },  // Status
      },
      didDrawPage: () => {
        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        // Print page number at bottom right of landscape A4
        doc.text(`Page ${pageCount}`, 283 - 10, 200);
        doc.text('© 2026 PT. Starpack Indahmaju. All rights reserved. | Private & Confidential', 14, 200);
      }
    });

    // 4. Save and Download
    doc.save(`Starpack_Leads_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
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
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={fetchLeads} className={styles.refreshBtn} disabled={refreshing}>
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ marginRight: '4px' }}
              className={refreshing ? styles.spinning : ''}
            >
              <path d="M23 4v6h-6"></path>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            {refreshing ? 'Refreshing...' : 'Refresh List'}
          </button>
          <button onClick={handleExportPDF} className={styles.exportBtn} disabled={leads.length === 0}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export PDF
          </button>
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
