import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portofolio');
    
    if (!fs.existsSync(portfolioDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(portfolioDir);
    
    // Filter out system files like .DS_Store and select only images
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif'];
    const logos = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return allowedExtensions.includes(ext);
      })
      .sort();

    return NextResponse.json(logos);
  } catch (error) {
    console.error('Error reading portfolio directory:', error);
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}
