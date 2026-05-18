import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';

export async function GET() {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, logo_url, display_order FROM customer_logos ORDER BY display_order ASC, created_at DESC'
    );
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch customer logos', details: error.message }, { status: 500 });
  }
}
