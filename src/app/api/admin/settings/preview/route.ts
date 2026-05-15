import { NextResponse } from 'next/server';
import { getEmailTemplate } from '@/lib/mail';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dummyData = {
    name: 'John Doe',
    company: 'Example Corp',
    email: 'john@example.com',
    interest: 'UV Plastic Coating',
    message: 'Hello, I am interested in your premium coating services for our new automotive product line. Please send me a quote.',
    footer: 'Sent from Starpack Dashboard',
    senderName: 'Starpack Admin'
  };

  const html = getEmailTemplate(dummyData);
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
