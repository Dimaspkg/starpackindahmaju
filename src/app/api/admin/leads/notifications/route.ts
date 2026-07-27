import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { RowDataPacket } from 'mysql2/promise';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Ambil 5 leads terbaru dengan status 'new'
    const [recentRows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, name, company, email, created_at FROM leads WHERE status = 'new' ORDER BY created_at DESC LIMIT 5"
    );

    // Ambil total count leads dengan status 'new'
    const [countRows] = await pool.execute<RowDataPacket[]>(
      "SELECT COUNT(id) as total FROM leads WHERE status = 'new'"
    );

    const totalCount = countRows.length > 0 ? countRows[0].total : 0;
    const latestId = recentRows.length > 0 ? recentRows[0].id : 0;

    return NextResponse.json({
      count: totalCount,
      latestId: latestId,
      recent: recentRows
    });
  } catch (error: any) {
    console.error('Error fetching lead notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications', details: error.message },
      { status: 500 }
    );
  }
}
