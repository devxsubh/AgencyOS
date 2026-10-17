import { NextResponse } from 'next/server';
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, safeEqual } from '@/lib/auth';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  if (!rateLimit(`login:${clientIp(req)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Try again later.' },
      { status: 429 }
    );
  }

  const adminUser = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUser || !adminPassword) {
    console.error('ADMIN_USERNAME / ADMIN_PASSWORD are not configured');
    return NextResponse.json({ success: false, error: 'Login is not configured' }, { status: 503 });
  }

  let email: unknown, password: unknown;
  try {
    ({ email, password } = await req.json());
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }

  // Evaluate both comparisons so timing does not reveal which field was wrong.
  const [userOk, passOk] = await Promise.all([
    safeEqual(typeof email === 'string' ? email : '', adminUser),
    safeEqual(typeof password === 'string' ? password : '', adminPassword),
  ]);
  if (!userOk || !passOk) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
  }

  const res = NextResponse.json({ success: true, user: { name: 'Wonder', email: adminUser } });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(adminUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  return res;
}
