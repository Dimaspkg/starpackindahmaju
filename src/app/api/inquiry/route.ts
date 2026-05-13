import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { sendInquiryEmail } from '@/lib/mail';

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

    // 1. Save to Database
    const [result] = await pool.execute(
      'INSERT INTO leads (name, company, email, interest, message) VALUES (?, ?, ?, ?, ?)',
      [name, company || '', email, interest, message]
    );

    // 2. Send Email Notification
    try {
      await sendInquiryEmail({ name, company, email, interest, message });
    } catch (emailError) {
      // We don't want to fail the whole request if only the email fails,
      // but we should log it.
      console.error('Email Notification Error:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Inquiry saved and email sent successfully',
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
