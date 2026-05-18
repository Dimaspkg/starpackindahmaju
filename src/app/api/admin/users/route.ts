import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';

// GET all users
export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const role = (session.user as any)?.role;
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const [rows] = await pool.execute(
      'SELECT id, username, role, created_at FROM users ORDER BY created_at DESC'
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch users', details: error.message }, { status: 500 });
  }
}

// POST create a new user
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const role = (session.user as any)?.role;
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { username, password, role: newUserRole } = await request.json();

    if (!username || !password || !newUserRole) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const [existing] = await pool.execute('SELECT id FROM users WHERE username = ?', [username]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user
    const [result] = await pool.execute(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, newUserRole]
    );

    const insertedId = (result as any).insertId;

    return NextResponse.json({
      message: 'User created successfully',
      user: { id: insertedId, username, role: newUserRole }
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create user', details: error.message }, { status: 500 });
  }
}

// DELETE a user
export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const role = (session.user as any)?.role;
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Security check: cannot delete self!
    const loggedInUsername = session.user?.name;
    const [userToDelete] = await pool.execute('SELECT username FROM users WHERE id = ?', [id]);
    const targetUser = (userToDelete as any)[0];

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (targetUser.username === loggedInUsername) {
      return NextResponse.json({ error: 'You cannot delete your own account while logged in' }, { status: 400 });
    }

    // Delete user
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete user', details: error.message }, { status: 500 });
  }
}

// PUT update a user (password or role)
export async function PUT(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const role = (session.user as any)?.role;
  if (role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { id, username, password, role: updatedRole } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Build update query dynamically
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];

    if (username) {
      // Check if username taken by another user
      const [existing] = await pool.execute('SELECT id FROM users WHERE username = ? AND id != ?', [username, id]);
      if ((existing as any[]).length > 0) {
        return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
      }
      fieldsToUpdate.push('username = ?');
      values.push(username);
    }

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      fieldsToUpdate.push('password = ?');
      values.push(hashedPassword);
    }

    if (updatedRole) {
      fieldsToUpdate.push('role = ?');
      values.push(updatedRole);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    const query = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;

    await pool.execute(query, values);

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update user', details: error.message }, { status: 500 });
  }
}
