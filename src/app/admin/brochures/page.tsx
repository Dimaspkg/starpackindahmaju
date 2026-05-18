"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Brochure {
  id: number;
  title: string;
  file_url: string;
  created_at: string;
}

export default function BrochuresPage() {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedUploadFolder, setSelectedUploadFolder] = useState('');
  const [activeFolderFilter, setActiveFolderFilter] = useState('all');
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchBrochures = async () => {
    try {
      const response = await fetch('/api/admin/brochures');
      if (response.ok) {
        const data = await response.json();
        setBrochures(data);
      }
    } catch (error) {
      console.error('Failed to fetch brochures:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await fetch('/api/admin/folders');
      if (response.ok) {
        const data = await response.json();
        setFolders(data);
      }
    } catch (error) {
      console.error('Failed to fetch folders:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBrochures();
      fetchFolders();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setCreatingFolder(true);
    try {
      const response = await fetch('/api/admin/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFolderName }),
      });

      if (response.ok) {
        const data = await response.json();
        setNewFolderName('');
        fetchFolders();
        setSelectedUploadFolder(data.folder);
        alert(`Folder "${data.folder}" created successfully!`);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create folder.');
      }
    } catch (error) {
      console.error('Create folder error:', error);
      alert('Failed to create folder.');
    } finally {
      setCreatingFolder(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('folder', selectedUploadFolder);

    try {
      const response = await fetch('/api/admin/brochures', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Brochure uploaded successfully!' });
        setTitle('');
        setFile(null);
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        fetchBrochures();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload brochure error:', error);
      setMessage({ type: 'error', text: 'Failed to upload brochure.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this brochure?')) return;

    try {
      const response = await fetch('/api/admin/brochures', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        fetchBrochures();
      }
    } catch (error) {
      console.error('Delete brochure error:', error);
      alert('Delete failed');
    }
  };

  // Helper to parse folder from URL: /uploads/brochures/filename.pdf OR /uploads/brochures/folder-name/filename.pdf
  const getBrochureFolder = (url: string) => {
    const parts = url.split('/');
    if (parts.length === 5) {
      return parts[3]; // Custom folder name
    }
    return 'root'; // Root/General folder
  };

  const filteredBrochures = brochures.filter((item) => {
    if (activeFolderFilter === 'all') return true;
    const folder = getBrochureFolder(item.file_url);
    return folder === activeFolderFilter;
  });

  if (loading) return <div className={styles.loading}>Loading Brochures...</div>;

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Brochures & Catalogs</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>
            Professional document management and folder structures for sales assets.
          </p>
        </div>
      </header>

      {/* Folders Management & Filtering Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem', 
        flexWrap: 'wrap', 
        gap: '1.2rem',
        background: 'var(--card-bg)',
        padding: '1.2rem 1.5rem',
        borderRadius: '16px',
        border: '1px solid var(--card-border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
      }}>
        {/* Horizontal Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', maxWidth: '100%', paddingBottom: '4px' }}>
          <button 
            onClick={() => setActiveFolderFilter('all')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeFolderFilter === 'all' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
              opacity: activeFolderFilter === 'all' ? 1 : 0.75
            }}
          >
            📂 All ({brochures.length})
          </button>
          <button 
            onClick={() => setActiveFolderFilter('root')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              background: activeFolderFilter === 'root' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s',
              opacity: activeFolderFilter === 'root' ? 1 : 0.75
            }}
          >
            📁 Root ({brochures.filter(b => getBrochureFolder(b.file_url) === 'root').length})
          </button>
          {folders.map(folder => (
            <button 
              key={folder}
              onClick={() => setActiveFolderFilter(folder)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeFolderFilter === folder ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s',
                opacity: activeFolderFilter === folder ? 1 : 0.75
              }}
            >
              📁 {folder.replace(/_/g, ' ')} ({brochures.filter(b => getBrochureFolder(b.file_url) === folder).length})
            </button>
          ))}
        </div>

        {/* Create Folder Form */}
        <form onSubmit={handleCreateFolder} style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
          <input 
            type="text" 
            placeholder="New folder..." 
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid var(--card-border)',
              background: 'rgba(255,255,255,0.03)',
              color: 'var(--foreground)',
              fontSize: '0.8rem',
              width: '140px'
            }}
            required
          />
          <button 
            type="submit" 
            disabled={creatingFolder}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              border: 'none',
              background: '#2ecc71',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              transition: 'background 0.2s'
            }}
          >
            {creatingFolder ? '...' : '+'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem', alignItems: 'start' }}>
        {/* Upload Card */}
        <div style={{ 
          background: 'var(--card-bg)', 
          padding: '2rem', 
          borderRadius: '20px', 
          border: '1px solid var(--card-border)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>Add New Document</h3>
          
          <form onSubmit={handleUpload}>
            <div className={styles.field}>
              <label>Document Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. UV Coating Catalog 2026"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Destination Folder</label>
              <select 
                value={selectedUploadFolder}
                onChange={(e) => setSelectedUploadFolder(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--foreground)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'rgba(255,255,255,0.5)\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.2em'
                }}
              >
                <option value="" style={{ background: 'var(--card-bg)', color: 'var(--foreground)' }}>Root/General Folder</option>
                {folders.map(folder => (
                  <option key={folder} value={folder} style={{ background: 'var(--card-bg)', color: 'var(--foreground)' }}>
                    {folder.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>Select PDF File</label>
              <div style={{ 
                border: '2px dashed var(--card-border)', 
                borderRadius: '12px', 
                padding: '1.5rem', 
                textAlign: 'center',
                background: 'rgba(255,255,255,0.05)',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input 
                  id="fileInput"
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                  style={{ 
                    position: 'absolute', 
                    top: 0, left: 0, width: '100%', height: '100%', 
                    opacity: 0, cursor: 'pointer' 
                  }}
                />
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
                <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--muted-text)' }}>
                  {file ? file.name : 'Click or Drag PDF here'}
                </p>
              </div>
            </div>

            {message.text && (
              <div style={{ 
                padding: '0.75rem', 
                borderRadius: '8px', 
                background: message.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                color: message.type === 'success' ? '#2ecc71' : '#e74c3c',
                fontSize: '0.8rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {message.text}
              </div>
            )}

            <button 
              type="submit" 
              className={styles.saveBtn} 
              disabled={uploading}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {uploading ? 'Processing...' : 'Upload Brochure'}
            </button>
          </form>
        </div>

        {/* Documents Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredBrochures.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
              <p style={{ color: 'var(--muted-text)' }}>No documents found in this folder. Start by uploading your first catalog.</p>
            </div>
          ) : (
            filteredBrochures.map((item) => (
              <div key={item.id} style={{ 
                background: 'var(--card-bg)', 
                borderRadius: '20px', 
                border: '1px solid var(--card-border)',
                padding: '1.5rem',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary)' }}></div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'rgba(255,0,0,0.1)', 
                      borderRadius: '10px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>📑</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-text)', background: 'var(--card-border)', padding: '2px 8px', borderRadius: '20px' }}>
                      {getBrochureFolder(item.file_url).toUpperCase().replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 700 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-text)', margin: 0 }}>
                    Uploaded on {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  <a 
                    href={item.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.refreshBtn}
                    style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.6rem', textDecoration: 'none' }}
                  >
                    View File
                  </a>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ 
                      padding: '0.6rem', 
                      borderRadius: '10px', 
                      border: '1px solid rgba(231, 76, 60, 0.2)', 
                      background: 'rgba(231, 76, 60, 0.05)', 
                      color: '#e74c3c',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
