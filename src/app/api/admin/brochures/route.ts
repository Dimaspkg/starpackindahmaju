import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM brochures ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch brochures' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const folder = formData.get('folder') as string || '';

    if (!file || !title) {
      return NextResponse.json({ error: 'File and title are required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    let uploadDir = path.join(process.cwd(), 'public', 'uploads', 'brochures');
    let fileUrl = `/uploads/brochures/${filename}`;

    if (folder) {
      const sanitizedFolder = folder.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
      if (sanitizedFolder) {
        uploadDir = path.join(uploadDir, sanitizedFolder);
        fileUrl = `/uploads/brochures/${sanitizedFolder}/${filename}`;
      }
    }

    const publicPath = path.join(uploadDir, filename);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });
    
    // Save file locally
    await writeFile(publicPath, buffer);

    // Save to database
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO brochures (title, file_url) VALUES (?, ?)',
      [title, fileUrl]
    );

    return NextResponse.json({ 
      success: true, 
      id: result.insertId,
      fileUrl 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed', details: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await request.json();

    // 1. Get the file_url first so we can delete the physical file
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT file_url FROM brochures WHERE id = ?', [id]);
    
    if (rows && rows.length > 0) {
      const fileUrl = rows[0].file_url;

      // 2. Delete the physical local file if it exists
      if (fileUrl.startsWith('/uploads/')) {
        try {
          const localPath = path.join(process.cwd(), 'public', fileUrl);
          await unlink(localPath);
        } catch (localError) {
          console.error('Failed to delete physical file:', localError);
        }
      }
    }

    // 3. Delete the database record
    await pool.execute('DELETE FROM brochures WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Delete Error:', error);
    return NextResponse.json({ error: 'Delete failed', details: errorMessage }, { status: 500 });
  }
}


