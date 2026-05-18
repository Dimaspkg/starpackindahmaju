import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

// GET all customer logos for admin dashboard
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, logo_url, display_order, created_at FROM customer_logos ORDER BY display_order ASC, created_at DESC'
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch logos', details: error.message }, { status: 500 });
  }
}

// POST create a new customer logo (handles file upload)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const displayOrder = parseInt(formData.get('display_order') as string || '0', 10);

    if (!file || !name) {
      return NextResponse.json({ error: 'Logo file and name are required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'logos');
    const publicPath = path.join(uploadDir, filename);

    // Ensure the uploads/logos directory exists
    await mkdir(uploadDir, { recursive: true });

    // Save file physically
    await writeFile(publicPath, buffer);

    const logoUrl = `/uploads/logos/${filename}`;

    // Save metadata to database
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO customer_logos (name, logo_url, display_order) VALUES (?, ?, ?)',
      [name, logoUrl, displayOrder]
    );

    return NextResponse.json({
      success: true,
      message: 'Customer logo uploaded successfully',
      logo: {
        id: result.insertId,
        name,
        logo_url: logoUrl,
        display_order: displayOrder
      }
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload logo', details: error.message }, { status: 500 });
  }
}

// PUT update an existing customer logo (optionally updates file upload)
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const displayOrder = parseInt(formData.get('display_order') as string || '0', 10);
    const file = formData.get('file') as File | null;

    if (!id || !name) {
      return NextResponse.json({ error: 'ID and name are required' }, { status: 400 });
    }

    // Retrieve old logo info
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT logo_url FROM customer_logos WHERE id = ?',
      [id]
    );

    const oldLogo = existing[0];
    if (!oldLogo) {
      return NextResponse.json({ error: 'Logo record not found' }, { status: 404 });
    }

    let logoUrl = oldLogo.logo_url;

    // If new file is uploaded, replace the old physical file
    if (file && file.size > 0) {
      // 1. Delete old file if exists
      if (oldLogo.logo_url.startsWith('/uploads/')) {
        try {
          const oldFilePath = path.join(process.cwd(), 'public', oldLogo.logo_url);
          if (fs.existsSync(oldFilePath)) {
            await unlink(oldFilePath);
          }
        } catch (err) {
          console.error('Failed to delete old file:', err);
        }
      }

      // 2. Upload new file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'logos');
      const publicPath = path.join(uploadDir, filename);

      await mkdir(uploadDir, { recursive: true });
      await writeFile(publicPath, buffer);

      logoUrl = `/uploads/logos/${filename}`;
    }

    // Update database
    await pool.execute(
      'UPDATE customer_logos SET name = ?, logo_url = ?, display_order = ? WHERE id = ?',
      [name, logoUrl, displayOrder, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Customer logo updated successfully'
    });
  } catch (error: any) {
    console.error('Update Error:', error);
    return NextResponse.json({ error: 'Failed to update logo', details: error.message }, { status: 500 });
  }
}

// DELETE a customer logo and its physical image file
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    // 1. Fetch logo_url to delete physical file
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT logo_url FROM customer_logos WHERE id = ?',
      [id]
    );

    const logo = rows[0];
    if (logo && logo.logo_url.startsWith('/uploads/')) {
      try {
        const localPath = path.join(process.cwd(), 'public', logo.logo_url);
        if (fs.existsSync(localPath)) {
          await unlink(localPath);
        }
      } catch (err) {
        console.error('Failed to delete physical file:', err);
      }
    }

    // 2. Delete database entry
    await pool.execute('DELETE FROM customer_logos WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Customer logo deleted successfully' });
  } catch (error: any) {
    console.error('Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete logo', details: error.message }, { status: 500 });
  }
}
