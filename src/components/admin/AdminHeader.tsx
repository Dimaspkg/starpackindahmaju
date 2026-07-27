"use client";

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import ThemeToggle from '../ThemeToggle';
import { useNotifications } from '@/context/NotificationContext';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { recentLeads, hasNewNotification, markAsOpened } = useNotifications();

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pathSegments = pathname ? pathname.split('/').filter(Boolean) : [];

  const getSegmentLabel = (segment: string) => {
    const mappings: { [key: string]: string } = {
      admin: 'Admin',
      dashboard: 'Dashboard',
      leads: 'Leads',
      brochures: 'Brochures',
      customers: 'Customers',
      insights: 'Insights',
      new: 'New Post',
      edit: 'Edit Post',
      settings: 'Settings',
      users: 'Users',
      'email-preview': 'Email Preview'
    };
    return mappings[segment.toLowerCase()] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'A';
  const userRole = (session?.user as any)?.role === 'admin' ? 'Super Admin' : 'Admin';

  return (
    <header className={styles.header}>
      {/* Left side: Breadcrumb & Title */}
      <div className={styles.leftSection}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          {pathSegments.map((segment, index) => {
            const href = '/' + pathSegments.slice(0, index + 1).join('/');
            const isLast = index === pathSegments.length - 1;
            const label = getSegmentLabel(segment);

            return (
              <div key={href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                {isLast ? (
                  <span className={`${styles.breadcrumbItem} ${styles.breadcrumbActive}`}>
                    {label}
                  </span>
                ) : (
                  <Link href={href} className={styles.breadcrumbItem}>
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
        {currentDate && (
          <div className={styles.dateDisplay}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{currentDate}</span>
          </div>
        )}
      </div>

      {/* Right side: Actions, Theme, Divider, Profile */}
      <div className={styles.rightSection}>
        {/* Notifications Icon */}
        <div style={{ position: 'relative' }} ref={notificationRef}>
          <button 
            className={styles.actionButton} 
            title="Notifications" 
            aria-label="View notifications"
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              if (hasNewNotification) markAsOpened();
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {hasNewNotification && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '6px',
                width: '8px',
                height: '8px',
                backgroundColor: '#e74c3c',
                borderRadius: '50%',
                border: '2px solid var(--card-bg)'
              }}></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: '0',
              width: '300px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
              zIndex: 50,
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, margin: 0 }}>Recent Leads</h3>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {recentLeads.length > 0 ? (
                  recentLeads.map(lead => (
                    <div key={lead.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--card-border)' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--foreground)' }}>{lead.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '2px' }}>{lead.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '4px' }}>
                        {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--muted-text)', fontSize: '0.85rem' }}>
                    No new leads recently.
                  </div>
                )}
              </div>
              <Link href="/admin/leads" onClick={() => setIsNotificationOpen(false)} style={{ display: 'block', padding: '0.75rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none', backgroundColor: 'rgba(128, 128, 128, 0.05)' }}>
                View All Leads
              </Link>
            </div>
          )}
        </div>

        {/* Theme switch */}
        <div className={styles.themeWrapper}>
          <ThemeToggle />
        </div>

        <div className={styles.divider}></div>

        {/* User Summary profile */}
        <div className={styles.profileSummary}>
          <div className={styles.profileAvatar}>{userInitial}</div>
          <div className={styles.profileText}>
            <span className={styles.profileName}>{session?.user?.name || 'Admin'}</span>
            <span className={styles.profileRole}>{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
