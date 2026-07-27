import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { mkdir } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with .webp extension
    const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
    const filename = `${Date.now()}-${baseName}.webp`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'insights');
    const fileUrl = `/uploads/insights/${filename}`;
    const publicPath = path.join(uploadDir, filename);

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Process and convert image to WebP using sharp
    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(publicPath);

    return NextResponse.json({ 
      success: true, 
      fileUrl 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Upload & Optimization Error:', error);
    return NextResponse.json({ error: 'Upload failed', details: errorMessage }, { status: 500 });
  }
}
