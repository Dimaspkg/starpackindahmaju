"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../admin.module.css';

interface Post {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  status: 'draft' | 'published';
  author: string;
  created_at: string;
}

export default function AdminInsightsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'confirm';
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: ''
  });

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/insights');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showDialog = (
    type: 'success' | 'error' | 'confirm',
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    setDialog({
      isOpen: true,
      type,
      title,
      message,
      onConfirm
    });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDeleteClick = (id: number, title: string) => {
    showDialog(
      'confirm',
      'Delete Post',
      `Are you sure you want to delete the post "${title}"? This action cannot be undone.`,
      () => executeDelete(id)
    );
  };

  const executeDelete = async (id: number) => {
    closeDialog();
    try {
      const response = await fetch('/api/admin/insights', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        showDialog('success', 'Deleted!', 'Post has been deleted successfully.');
        fetchPosts();
      } else {
        const data = await response.json();
        showDialog('error', 'Error', data.error || 'Failed to delete post.');
      }
    } catch (error: any) {
      showDialog('error', 'Error', error.message || 'An unexpected error occurred.');
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Insights Management</h1>
          <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Manage educational and news articles for the website (English only)
          </p>
        </div>
        <Link href="/admin/insights/new" className={styles.addButton || 'btnPrimary'}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add New Post
          </span>
        </Link>
      </header>

      {/* Search Filter Bar */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', width: '100%' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
          <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-text)', display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              backgroundColor: 'rgba(128, 128, 128, 0.02)',
              color: 'var(--foreground)',
              width: '100%',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 51, 51, 0.15)';
              e.target.style.backgroundColor = 'var(--card-bg)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--card-border)';
              e.target.style.boxShadow = 'none';
              e.target.style.backgroundColor = 'rgba(128, 128, 128, 0.02)';
            }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          Loading posts...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'var(--card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--card-border)',
          color: 'var(--text-secondary)'
        }}>
          {searchTerm ? 'No matching posts found.' : 'No posts created yet. Click "Add New Post" to create one.'}
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className={styles.th} style={{ width: '80px' }}>Cover</th>
                <th className={styles.th}>Title</th>
                <th className={styles.th} style={{ width: '130px' }}>Category</th>
                <th className={styles.th} style={{ width: '110px' }}>Status</th>
                <th className={styles.th} style={{ width: '130px' }}>Author</th>
                <th className={styles.th} style={{ width: '130px' }}>Created Date</th>
                <th className={styles.th} style={{ width: '130px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className={styles.td}>
                    <div style={{ position: 'relative', width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
                      <Image
                        src={post.image || '/images/default_insight.png'}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td className={styles.td} style={{ fontWeight: '500' }}>
                    <div>
                      <div>{post.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal', marginTop: '0.1rem' }}>
                        /{post.slug}
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>{post.category}</td>
                  <td className={styles.td}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      backgroundColor: post.status === 'published' ? 'rgba(46, 204, 113, 0.15)' : 'rgba(128, 128, 128, 0.15)',
                      color: post.status === 'published' ? '#2ecc71' : 'var(--text-secondary)'
                    }}>
                      {post.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted-text)', fontSize: '0.875rem' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {post.author || 'Admin'}
                    </span>
                  </td>
                  <td className={styles.td}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className={styles.td} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <Link
                        href={`/admin/insights/edit?id=${post.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid var(--card-border)',
                          backgroundColor: 'var(--card-bg)',
                          color: 'var(--text-primary)',
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(post.id, post.title)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(231, 76, 60, 0.2)',
                          backgroundColor: 'rgba(231, 76, 60, 0.05)',
                          color: '#e74c3c',
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog Modal */}
      {dialog.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '450px',
            width: '90%',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>{dialog.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>{dialog.message}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              {dialog.type === 'confirm' ? (
                <>
                  <button
                    onClick={closeDialog}
                    style={{
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      border: '1px solid var(--card-border)',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={dialog.onConfirm}
                    style={{
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={closeDialog}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--primary, #0075ff)',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
