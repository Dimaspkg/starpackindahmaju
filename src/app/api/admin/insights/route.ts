import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { unlink } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all posts or a single post by ID
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT * FROM posts WHERE id = ?',
        [id]
      );
      if (rows.length === 0) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(rows[0]);
    } else {
      const [rows] = await pool.execute<RowDataPacket[]>(
        'SELECT id, slug, category, title, description, image, status, author, created_at, updated_at FROM posts ORDER BY created_at DESC'
      );
      return NextResponse.json(rows);
    }
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch insights', details: error.message }, { status: 500 });
  }
}

// POST create a new post
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { title, slug, category, description, content, image, status, author } = await request.json();

    if (!title || !slug || !category || !description || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate unique slug
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM posts WHERE slug = ?',
      [slug]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Slug already exists. Please choose a unique slug.' }, { status: 400 });
    }

    // Save metadata to database
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO posts (title, slug, category, description, content, image, status, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, category, description, content, image || '/images/default_insight.png', status || 'draft', author || session.user?.name || 'Admin']
    );

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      id: result.insertId
    });
  } catch (error: any) {
    console.error('Database Insert Error:', error);
    return NextResponse.json({ error: 'Failed to create post', details: error.message }, { status: 500 });
  }
}

// PUT update an existing post
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id, title, slug, category, description, content, image, status, author } = await request.json();

    if (!id || !title || !slug || !category || !description || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate unique slug (excluding current post)
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT id FROM posts WHERE slug = ? AND id != ?',
      [slug, id]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Slug already exists. Please choose a unique slug.' }, { status: 400 });
    }

    // Get current post to check if image is changing
    const [currentRows] = await pool.execute<RowDataPacket[]>(
      'SELECT image FROM posts WHERE id = ?',
      [id]
    );
    if (currentRows.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const oldImage = currentRows[0].image;

    // Delete old image file if image has changed and old image is locally uploaded
    if (oldImage && oldImage !== image && oldImage.startsWith('/uploads/insights/')) {
      try {
        const oldFilePath = path.join(process.cwd(), 'public', oldImage);
        if (fs.existsSync(oldFilePath)) {
          await unlink(oldFilePath);
        }
      } catch (err) {
        console.error('Failed to delete old image file:', err);
      }
    }

    // Update database
    await pool.execute(
      'UPDATE posts SET title = ?, slug = ?, category = ?, description = ?, content = ?, image = ?, status = ?, author = ? WHERE id = ?',
      [title, slug, category, description, content, image, status, author || 'Admin', id]
    );

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully'
    });
  } catch (error: any) {
    console.error('Update Error:', error);
    return NextResponse.json({ error: 'Failed to update post', details: error.message }, { status: 500 });
  }
}

// DELETE a post and its physical image file
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    // Fetch image path to delete physical file
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT image FROM posts WHERE id = ?',
      [id]
    );

    if (rows.length > 0) {
      const post = rows[0];
      if (post.image && post.image.startsWith('/uploads/insights/')) {
        try {
          const localPath = path.join(process.cwd(), 'public', post.image);
          if (fs.existsSync(localPath)) {
            await unlink(localPath);
          }
        } catch (err) {
          console.error('Failed to delete physical image file:', err);
        }
      }
    }

    // Delete database entry
    await pool.execute('DELETE FROM posts WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error: any) {
    console.error('Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete post', details: error.message }, { status: 500 });
  }
}
