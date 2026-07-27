"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../admin.module.css';

function EditInsightForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const editorRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Educational');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [author, setAuthor] = useState('Admin');

  // Interactive States
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('No ID provided');
      setLoading(false);
      return;
    }

    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/admin/insights?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setSlug(data.slug);
          setCategory(data.category);
          setDescription(data.description);
          setContent(data.content);
          setImage(data.image);
          setStatus(data.status);
          setAuthor(data.author || 'Admin');
        } else {
          setError('Failed to fetch post details');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  // Load database content into contentEditable once when data loads
  useEffect(() => {
    if (editorRef.current && content && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setImage(data.fileUrl);
      } else {
        setError(data.error || 'Failed to upload image');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !category || !description || !content) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/insights', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Number(id),
          title,
          slug,
          category,
          description,
          content,
          image,
          status,
          author
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Post updated successfully! Redirecting...');
        setTimeout(() => {
          router.push('/admin/insights');
        }, 1500);
      } else {
        setError(data.error || 'Failed to update post');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  if (loading) {
    return (
      <div className={styles.adminContainer} style={{ textAlign: 'center', padding: '5rem', color: 'var(--muted-text)' }}>
        Loading post data...
      </div>
    );
  }

  return (
    <div className={styles.adminContainer} style={{ maxWidth: '900px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          href="/admin/insights" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.35rem', 
            color: 'var(--muted-text)', 
            textDecoration: 'none', 
            marginBottom: '0.75rem', 
            fontSize: '0.85rem',
            fontWeight: '600',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted-text)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Insights
        </Link>
        <h1 className={styles.title}>Edit Post</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)', marginTop: '0.25rem' }}>
          Modify the selected article details and publish updates.
        </p>
      </div>

      {/* Alert Notifications */}
      {error && (
        <div style={{ 
          padding: '1rem 1.25rem', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.15)', 
          color: '#ef4444', 
          borderRadius: '10px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1.5rem', 
          fontSize: '0.9rem' 
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div style={{ 
          padding: '1rem 1.25rem', 
          backgroundColor: 'rgba(16, 185, 129, 0.1)', 
          border: '1px solid rgba(16, 185, 129, 0.15)', 
          color: '#10b981', 
          borderRadius: '10px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1.5rem', 
          fontSize: '0.9rem' 
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>{success}</span>
        </div>
      )}

      {/* Main Editing Form */}
      <form onSubmit={handleSubmit} className={styles.settingsContainer}>
        {/* Section 1: General Info */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>General Information</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Title */}
            <div className={styles.field}>
              <label>Title <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Understanding UV Coating"
              />
            </div>

            {/* Slug */}
            <div className={styles.field}>
              <label>Slug <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. understanding-uv-coating"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: '0.5rem' }}>
            {/* Category */}
            <div className={styles.field}>
              <label>Category <span style={{ color: '#ef4444' }}>*</span></label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Educational">Educational</option>
                <option value="Technology">Technology</option>
                <option value="Guide">Guide</option>
                <option value="News">News</option>
              </select>
            </div>

            {/* Status */}
            <div className={styles.field}>
              <label>Status <span style={{ color: '#ef4444' }}>*</span></label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Author */}
            <div className={styles.field}>
              <label>Author <span style={{ color: '#ef4444' }}>*</span></label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Admin"
              />
            </div>
          </div>

          {/* Short Excerpt */}
          <div className={styles.field} style={{ marginTop: '0.5rem' }}>
            <label>Short Excerpt/Description <span style={{ color: '#ef4444' }}>*</span></label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short one-sentence or two-sentence description of the article..."
            />
          </div>
        </div>

        {/* Section 2: Media */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Cover Image</h2>
          
          <div className={styles.field}>
            <div 
              style={{
                border: '2px dashed var(--card-border)',
                borderRadius: '12px',
                padding: '2.5rem 2rem',
                textAlign: 'center',
                backgroundColor: 'rgba(128, 128, 128, 0.01)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                minHeight: '200px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 51, 51, 0.01)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
                e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.01)';
              }}
              onClick={() => document.getElementById('file-upload-input')?.click()}
            >
              <input
                id="file-upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              
              {image ? (
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  maxWidth: '360px', 
                  height: '180px', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                }}>
                  <Image src={image} alt="Preview" fill style={{ objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(128, 128, 128, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.25rem',
                    color: 'var(--muted-text)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <span style={{ fontSize: '0.95rem', fontWeight: '600' }}>Click to upload cover image</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted-text)' }}>PNG, JPG, or WEBP. Max size 5MB.</span>
                </div>
              )}

              {uploading && (
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  background: 'rgba(0,0,0,0.6)', 
                  backdropFilter: 'blur(2px)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  borderRadius: '10px', 
                  gap: '0.5rem' 
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.spinning}>
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Optimizing to WebP...</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '0.5rem', textAlign: 'center' }}>
              Cover images are automatically converted to optimized WebP format for fast web delivery.
            </p>
          </div>
        </div>

        {/* Section 3: Article Content */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Article Content</h2>
          
          <div className={styles.field}>
            <label>Content Body <span style={{ color: '#ef4444' }}>*</span></label>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid',
              borderColor: isFocused ? 'var(--primary)' : 'var(--card-border)',
              boxShadow: isFocused ? '0 0 0 3px rgba(255, 51, 51, 0.15)' : 'none',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'var(--card-bg)',
              transition: 'all 0.2s ease'
            }}>
              {/* Formatting Toolbar */}
              <div style={{
                display: 'flex',
                gap: '0.35rem',
                padding: '0.5rem',
                borderBottom: '1px solid var(--card-border)',
                backgroundColor: 'rgba(128, 128, 128, 0.03)',
                flexWrap: 'wrap'
              }}>
                <button 
                  type="button" 
                  onClick={() => execCommand('bold')}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Bold"
                >
                  B
                </button>
                <button 
                  type="button" 
                  onClick={() => execCommand('italic')}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', fontStyle: 'italic', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Italic"
                >
                  I
                </button>
                <button 
                  type="button" 
                  onClick={() => execCommand('underline')}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', textDecoration: 'underline', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Underline"
                >
                  U
                </button>
                <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--card-border)', margin: '0 0.25rem', alignSelf: 'center' }}></div>
                <button 
                  type="button" 
                  onClick={() => execCommand('formatBlock', '<h2>')}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Heading 2"
                >
                  H2
                </button>
                <button 
                  type="button" 
                  onClick={() => execCommand('formatBlock', '<h3>')}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Heading 3"
                >
                  H3
                </button>
                <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--card-border)', margin: '0 0.25rem', alignSelf: 'center' }}></div>
                <button 
                  type="button" 
                  onClick={() => {
                    const url = prompt('Enter the link URL:', 'https://');
                    if (url) execCommand('createLink', url);
                  }}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Insert Link"
                >
                  Link
                </button>
                <button 
                  type="button" 
                  onClick={() => execCommand('insertUnorderedList')}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Bullet List"
                >
                  • List
                </button>
                <button 
                  type="button" 
                  onClick={() => execCommand('insertOrderedList')}
                  style={{ padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid var(--card-border)', fontSize: '0.8rem', cursor: 'pointer', color: 'var(--foreground)', background: 'var(--card-bg)' }}
                  title="Numbered List"
                >
                  1. List
                </button>
              </div>
              
              {/* Visual contentEditable Editor */}
              <div
                ref={editorRef}
                contentEditable
                onInput={() => {
                  if (editorRef.current) {
                    setContent(editorRef.current.innerHTML);
                  }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={styles.editorArea}
                data-placeholder="Write your article here..."
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'flex-end', 
          marginTop: '0.5rem', 
          borderTop: '1px solid var(--card-border)', 
          paddingTop: '1.5rem' 
        }}>
          <Link href="/admin/insights" className={styles.refreshBtn} style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting || uploading}
            className={styles.saveBtn}
            style={{ padding: '0.75rem 1.75rem' }}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditInsightPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '5rem', color: 'var(--muted-text)' }}>Loading form...</div>}>
      <EditInsightForm />
    </Suspense>
  );
}
