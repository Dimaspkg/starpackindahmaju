"use client";

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface CustomerLogo {
  id: number;
  name: string;
  logo_url: string;
  display_order: number;
  created_at: string;
}

export default function CustomersAdminPage() {
  const [logos, setLogos] = useState<CustomerLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isDragOver, setIsDragOver] = useState(false);

  // Premium Dialog State
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'confirm' | 'info';
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showDialog = (
    type: 'success' | 'error' | 'confirm' | 'info',
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

  const fetchLogos = async () => {
    try {
      const response = await fetch('/api/admin/customers');
      if (response.ok) {
        const data = await response.json();
        setLogos(data);
      }
    } catch (error) {
      console.error('Failed to fetch logos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null);
      setImagePreview('');
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileChange(droppedFile);
    } else {
      showDialog('error', 'Invalid File Type', 'Please upload an image file (PNG, JPG, SVG).');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!editingId && !file) {
      showDialog('error', 'File Required', 'Please select or drag a logo image.');
      return;
    }

    setUploading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('name', name);
    formData.append('display_order', displayOrder.toString());
    if (file) {
      formData.append('file', file);
    }

    try {
      let response;
      if (editingId) {
        formData.append('id', editingId.toString());
        response = await fetch('/api/admin/customers', {
          method: 'PUT',
          body: formData,
        });
      } else {
        response = await fetch('/api/admin/customers', {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok) {
        setMessage({
          type: 'success',
          text: editingId ? 'Logo updated successfully!' : 'Logo uploaded successfully!'
        });
        resetForm();
        fetchLogos();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }
    } catch (error: any) {
      console.error('Submit logo error:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to submit logo.' });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (logo: CustomerLogo) => {
    setEditingId(logo.id);
    setName(logo.name);
    setDisplayOrder(logo.display_order);
    setImagePreview(logo.logo_url);
    setFile(null);
    // Scroll form into view on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDisplayOrder(0);
    setFile(null);
    setImagePreview('');
    const fileInput = document.getElementById('logoFileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = async (id: number, logoName: string) => {
    showDialog(
      'confirm',
      'Confirm Deletion',
      `Are you sure you want to delete the logo for "${logoName}"? This action will permanently remove it from both the server disk and the homepage.`,
      async () => {
        try {
          const response = await fetch('/api/admin/customers', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });

          if (response.ok) {
            fetchLogos();
            showDialog('success', 'Deleted Successfully', `Logo for "${logoName}" has been permanently deleted.`);
          } else {
            showDialog('error', 'Delete Failed', 'Failed to delete the logo.');
          }
        } catch (error) {
          console.error('Delete logo error:', error);
          showDialog('error', 'Delete Failed', 'An error occurred while communicating with the server.');
        }
      }
    );
  };

  if (loading) return <div className={styles.loading}>Loading Customers & Brand Logos...</div>;

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Customers & Brand Logos</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>
            Manage cosmetic partner logos displayed on the website homepage.
          </p>
        </div>
      </header>

      {message.text && (
        <div style={{
          padding: '1rem',
          borderRadius: '12px',
          background: message.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
          color: message.type === 'success' ? '#2ecc71' : '#e74c3c',
          border: `1px solid ${message.type === 'success' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)'}`,
          fontWeight: 600,
          fontSize: '0.9rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          {message.type === 'success' ? '✓' : '✕'} {message.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '2rem', alignItems: 'start' }}>
        {/* Form Card */}
        <div style={{
          background: 'var(--card-bg)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid var(--card-border)',
          position: 'sticky',
          top: '20px'
        }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{editingId ? 'Edit Brand Logo' : 'Add New Brand'}</span>
            {editingId && (
              <button 
                onClick={resetForm}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--card-border)',
                  color: 'var(--muted-text)',
                  cursor: 'pointer'
                }}
              >
                Cancel Edit
              </button>
            )}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Brand Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shiseido, Fenty Beauty"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'var(--foreground)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div className={styles.field} style={{ marginTop: '1.2rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Display Order</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value || '0', 10))}
                placeholder="0"
                min="0"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.02)',
                  color: 'var(--foreground)',
                  fontSize: '0.9rem'
                }}
              />
              <span style={{ fontSize: '0.7rem', color: 'var(--muted-text)', marginTop: '4px', display: 'block' }}>
                Lower numbers will be displayed first.
              </span>
            </div>

            <div className={styles.field} style={{ marginTop: '1.2rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>Logo Image</label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: isDragOver ? '2px dashed var(--primary)' : '2px dashed var(--card-border)',
                  borderRadius: '12px',
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  background: isDragOver ? 'rgba(var(--primary-rgb), 0.05)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  id="logoFileInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    opacity: 0, cursor: 'pointer', zIndex: 2
                  }}
                />
                
                {imagePreview ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{ 
                        maxHeight: '100px', 
                        maxWidth: '100%', 
                        objectFit: 'contain',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '10px'
                      }} 
                    />
                    <p style={{ fontSize: '0.75rem', margin: '8px 0 0 0', color: '#2ecc71', fontWeight: 600 }}>
                      {file ? 'Selected New File' : 'Current Logo'}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                    <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--muted-text)' }}>
                      Click or drag image file here
                    </p>
                    <span style={{ fontSize: '0.65rem', color: 'var(--muted-text)' }}>
                      Supports PNG, JPG, SVG
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '12px',
                border: 'none',
                background: 'var(--primary)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginTop: '1.5rem',
                transition: 'all 0.2s'
              }}
            >
              {uploading ? 'Uploading...' : editingId ? 'Update Brand' : 'Add Brand'}
            </button>
          </form>
        </div>

        {/* Dynamic Logos Grid */}
        <div>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '20px',
            padding: '1.5rem 2rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 600, color: 'var(--foreground)', fontSize: '0.95rem' }}>
              Brand Logos ({logos.length})
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted-text)' }}>
              Ordered by Display Order
            </span>
          </div>

          {logos.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '6rem 2rem',
              background: 'var(--card-bg)',
              borderRadius: '20px',
              border: '1px solid var(--card-border)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 700 }}>No Logos in Database</h3>
              <p style={{ color: 'var(--muted-text)', maxWidth: '400px', margin: '0 auto', fontSize: '0.85rem' }}>
                There are currently no customer logos configured. Upload your first cosmetic partner logo using the form on the left.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {logos.map((logo) => (
                <div 
                  key={logo.id}
                  style={{
                    background: 'var(--card-bg)',
                    borderRadius: '20px',
                    border: '1px solid var(--card-border)',
                    padding: '1.5rem',
                    transition: 'all 0.2s',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '200px',
                    outline: editingId === logo.id ? '2px solid var(--primary)' : 'none'
                  }}
                >
                  {/* Order Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--card-border)',
                    fontSize: '0.7rem',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    color: 'var(--muted-text)',
                    fontWeight: 600
                  }}>
                    Order: {logo.display_order}
                  </span>

                  {/* Logo Image Preview container */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '1.5rem 0 1rem 0',
                    minHeight: '90px'
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.logo_url}
                      alt={logo.name}
                      style={{
                        maxHeight: '60px',
                        maxWidth: '90%',
                        objectFit: 'contain',
                        filter: 'brightness(0.9) contrast(1.1)'
                      }}
                    />
                  </div>

                  {/* Info & Action buttons */}
                  <div style={{ width: '100%', textAlign: 'center', borderTop: '1px solid var(--card-border)', paddingTop: '1rem', marginTop: 'auto' }}>
                    <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      {logo.name}
                    </h4>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEdit(logo)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          borderRadius: '8px',
                          border: '1px solid var(--card-border)',
                          background: 'rgba(255,255,255,0.02)',
                          color: 'var(--foreground)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(logo.id, logo.name)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(231, 76, 60, 0.2)',
                          background: 'rgba(231, 76, 60, 0.05)',
                          color: '#e74c3c',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Premium Dialog Modal */}
      {dialog.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'var(--card-bg)',
            borderRadius: '24px',
            border: '1px solid var(--card-border)',
            padding: '2.25rem',
            width: '90%',
            maxWidth: '400px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px', left: '50%', transform: 'translateX(-50%)',
              width: '150px', height: '150px', borderRadius: '50%',
              filter: 'blur(40px)',
              background: dialog.type === 'success' ? 'rgba(46, 204, 113, 0.15)' :
                          dialog.type === 'error' ? 'rgba(231, 76, 60, 0.15)' :
                          dialog.type === 'confirm' ? 'rgba(241, 196, 15, 0.15)' :
                          'rgba(52, 152, 219, 0.15)'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '64px', height: '64px',
                margin: '0 auto 1.5rem auto',
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem',
                background: dialog.type === 'success' ? 'rgba(46, 204, 113, 0.1)' :
                            dialog.type === 'error' ? 'rgba(231, 76, 60, 0.1)' :
                            dialog.type === 'confirm' ? 'rgba(241, 196, 15, 0.1)' :
                            'rgba(52, 152, 219, 0.1)',
                color: dialog.type === 'success' ? '#2ecc71' :
                       dialog.type === 'error' ? '#e74c3c' :
                       dialog.type === 'confirm' ? '#f1c40f' :
                       '#3498db',
                border: `1px solid ${
                  dialog.type === 'success' ? 'rgba(46, 204, 113, 0.2)' :
                  dialog.type === 'error' ? 'rgba(231, 76, 60, 0.2)' :
                  dialog.type === 'confirm' ? 'rgba(241, 196, 15, 0.2)' :
                  'rgba(52, 152, 219, 0.2)'
                }`
              }}>
                {dialog.type === 'success' ? '✓' :
                 dialog.type === 'error' ? '✕' :
                 dialog.type === 'confirm' ? '?' : 'i'}
              </div>

              <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.25rem', fontWeight: 800 }}>
                {dialog.title}
              </h3>
              <p style={{ margin: '0 0 2rem 0', fontSize: '0.9rem', color: 'var(--muted-text)', lineHeight: 1.5 }}>
                {dialog.message}
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                {dialog.type === 'confirm' ? (
                  <>
                    <button
                      onClick={closeDialog}
                      style={{
                        flex: 1, padding: '0.8rem 1.5rem', borderRadius: '12px',
                        border: '1px solid var(--card-border)', background: 'transparent',
                        color: 'var(--text-color)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (dialog.onConfirm) dialog.onConfirm();
                        closeDialog();
                      }}
                      style={{
                         flex: 1, padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none',
                         background: '#e74c3c', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem'
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={closeDialog}
                    style={{
                      padding: '0.8rem 2.5rem', borderRadius: '12px', border: 'none',
                      background: dialog.type === 'success' ? '#2ecc71' :
                                  dialog.type === 'error' ? '#e74c3c' : '#3498db',
                      color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                      minWidth: '120px'
                    }}
                  >
                    OK
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
