import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { readdir, mkdir } from 'fs/promises';
import path from 'path';

// GET: List all directories inside public/uploads/brochures
export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'brochures');
    
    // Ensure base directory exists
    await mkdir(uploadDir, { recursive: true });

    const entries = await readdir(uploadDir, { withFileTypes: true });
    
    // Filter out only directories
    const folders = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    return NextResponse.json(folders);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to read folders:', error);
    return NextResponse.json({ error: 'Failed to fetch folders', details: errorMessage }, { status: 500 });
  }
}

// POST: Create a new folder/directory inside public/uploads/brochures
export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { name } = await request.json();
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });
    }

    // Sanitize folder name: allow only alphanumeric, underscores, hyphens
    const sanitizedName = name
      .trim()
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9_-]/g, ''); // Remove any special characters

    if (!sanitizedName) {
      return NextResponse.json({ error: 'Invalid folder name' }, { status: 400 });
    }

    const newFolderDir = path.join(process.cwd(), 'public', 'uploads', 'brochures', sanitizedName);

    // Create the directory
    await mkdir(newFolderDir, { recursive: true });

    return NextResponse.json({ success: true, folder: sanitizedName });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to create folder:', error);
    return NextResponse.json({ error: 'Folder creation failed', details: errorMessage }, { status: 500 });
  }
}
