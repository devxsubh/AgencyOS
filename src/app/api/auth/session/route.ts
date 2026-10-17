import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const subject = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!subject) return NextResponse.json({ success: false, user: null }, { status: 401 });
  return NextResponse.json({ success: true, user: { name: 'Wonder', email: subject } });
}
