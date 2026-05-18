"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from '../admin.module.css';

interface User {
  id: number;
  username: string;
  role: 'admin' | 'editor';
  created_at: string;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modals / Form State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form Inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [roleInput, setRoleInput] = useState<'admin' | 'editor'>('admin');
  
  // Action Loading
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    if (status === 'authenticated' && (session?.user as any)?.role === 'admin') {
      fetchUsers();
    } else if (status !== 'loading') {
      setLoading(false);
    }
  }, [status, session]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    
    if (passwordInput !== confirmPasswordInput) {
      setFormError('Passwords do not match');
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
          role: roleInput
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user');
      }
      
      setFormSuccess('User created successfully!');
      // Reset form
      setUsernameInput('');
      setPasswordInput('');
      setConfirmPasswordInput('');
      setRoleInput('admin');
      
      // Refresh list
      fetchUsers();
      setTimeout(() => {
        setIsAddModalOpen(false);
        setFormSuccess('');
      }, 1500);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setFormError('');
    setFormSuccess('');
    
    if (passwordInput && passwordInput !== confirmPasswordInput) {
      setFormError('Passwords do not match');
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingUser.id,
          role: roleInput,
          ...(passwordInput ? { password: passwordInput } : {})
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }
      
      setFormSuccess('User updated successfully!');
      setPasswordInput('');
      setConfirmPasswordInput('');
      
      // Refresh list
      fetchUsers();
      setTimeout(() => {
        setIsEditModalOpen(false);
        setEditingUser(null);
        setFormSuccess('');
      }, 1500);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (user.username === session?.user?.name) {
      alert('You cannot delete your own logged-in account!');
      return;
    }
    
    const confirmDelete = window.confirm(`Are you sure you want to delete user "${user.username}"?`);
    if (!confirmDelete) return;
    
    try {
      const response = await fetch(`/api/admin/users?id=${user.id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }
      
      alert('User deleted successfully!');
      fetchUsers();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const openAddModal = () => {
    setUsernameInput('');
    setPasswordInput('');
    setConfirmPasswordInput('');
    setRoleInput('admin');
    setFormError('');
    setFormSuccess('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setPasswordInput('');
    setConfirmPasswordInput('');
    setRoleInput(user.role);
    setFormError('');
    setFormSuccess('');
    setIsEditModalOpen(true);
  };

  if (status === 'loading' || loading) return <div className={styles.loading}>Loading Users Portal...</div>;
  
  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') {
    return (
      <div className={styles.error} style={{ marginTop: '4rem' }}>
        <h2>Access Denied</h2>
        <p>You do not have the required permissions to view this secure page.</p>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>User Management</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Manage dashboard administrators, editors, and roles.
          </p>
        </div>
        <div>
          <button onClick={openAddModal} className={styles.exportBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <line x1="19" y1="8" x2="19" y2="14"></line>
              <line x1="22" y1="11" x2="16" y2="11"></line>
            </svg>
            Add New User
          </button>
        </div>
      </header>

      {error && (
        <div className={styles.error} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '8px' }}>
          Error: {error}
        </div>
      )}

      {/* Users List Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th} style={{ width: '80px', textAlign: 'center' }}>No.</th>
              <th className={styles.th}>Username</th>
              <th className={styles.th}>Role / Privilege</th>
              <th className={styles.th}>Created Date</th>
              <th className={styles.th} style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.td} style={{ textAlign: 'center' }}>No users found in database.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td} style={{ textAlign: 'center', fontWeight: 600, opacity: 0.6 }}>{index + 1}</td>
                  <td className={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(230, 0, 0, 0.1)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                      }}>
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span style={{ fontWeight: 600 }}>{user.username}</span>
                        {user.username === session?.user?.name && (
                          <span style={{
                            marginLeft: '8px',
                            fontSize: '0.7rem',
                            background: 'rgba(255,255,255,0.1)',
                            padding: '2px 6px',
                            borderRadius: '12px',
                            color: 'var(--text-secondary)'
                          }}>You</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.status} ${user.role === 'admin' ? styles.statusQualified : styles.statusNew}`} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {user.role}
                    </span>
                  </td>
                  <td className={styles.td}>
                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </td>
                  <td className={styles.td} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                      <button
                        onClick={() => openEditModal(user)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#3498db',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        disabled={user.username === session?.user?.name}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#e74c3c',
                          cursor: user.username === session?.user?.name ? 'not-allowed' : 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          opacity: user.username === session?.user?.name ? 0.4 : 1
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- ADD USER MODAL --- */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2rem',
            width: '100%',
            maxWidth: '450px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Add New User</h2>
            
            {formError && (
              <div style={{ padding: '0.75rem', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', borderRadius: '8px', border: '1px solid #e74c3c', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {formError}
              </div>
            )}
            {formSuccess && (
              <div style={{ padding: '0.75rem', background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', borderRadius: '8px', border: '1px solid #2ecc71', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Username</label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  style={{
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter unique username"
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter secure password"
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  style={{
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Confirm password"
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Privilege / Role</label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value as 'admin' | 'editor')}
                  style={{
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="admin">Admin (Full Access)</option>
                  <option value="editor">Editor (Limited Access)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text-primary)',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.saveBtn}
                  style={{ margin: 0, padding: '0.6rem 1.5rem' }}
                >
                  {submitting ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDIT USER MODAL --- */}
      {isEditModalOpen && editingUser && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '2rem',
            width: '100%',
            maxWidth: '450px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Edit User</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Editing user: <strong style={{ color: 'var(--text-primary)' }}>{editingUser.username}</strong>
            </p>
            
            {formError && (
              <div style={{ padding: '0.75rem', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', borderRadius: '8px', border: '1px solid #e74c3c', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {formError}
              </div>
            )}
            {formSuccess && (
              <div style={{ padding: '0.75rem', background: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', borderRadius: '8px', border: '1px solid #2ecc71', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleEditUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>New Password (Leave blank to keep current)</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Enter new password"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  style={{
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Confirm new password"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Privilege / Role</label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value as 'admin' | 'editor')}
                  disabled={editingUser.username === session?.user?.name}
                  style={{
                    padding: '0.7rem 0.9rem',
                    borderRadius: '8px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)',
                    color: 'var(--text-primary)',
                    opacity: editingUser.username === session?.user?.name ? 0.6 : 1
                  }}
                >
                  <option value="admin">Admin (Full Access)</option>
                  <option value="editor">Editor (Limited Access)</option>
                </select>
                {editingUser.username === session?.user?.name && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>
                    You cannot change your own role while logged in.
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingUser(null);
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--card-border)',
                    color: 'var(--text-primary)',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.saveBtn}
                  style={{ margin: 0, padding: '0.6rem 1.5rem' }}
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
