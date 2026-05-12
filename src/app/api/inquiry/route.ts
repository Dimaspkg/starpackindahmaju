import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, interest, message } = body;

    // Basic validation
    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO leads (name, company, email, interest, message) VALUES (?, ?, ?, ?, ?)',
      [name, company || '', email, interest, message]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry saved successfully',
      id: (result as any).insertId 
    });
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to save inquiry', details: error.message },
      { status: 500 }
    );
  }
}
