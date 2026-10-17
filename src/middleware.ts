import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};

// API endpoints that stay reachable without an admin session.
// Everything else under /api is admin-only, except plain GETs of public content.
const PUBLIC_API = new Set(['/api/auth/login', '/api/auth/logout', '/api/auth/session', '/api/chatbot']);
const PUBLIC_READ_PREFIXES = ['/api/blogs', '/api/portfolios', '/api/prices'];

function isPublicApi(pathname: string, method: string): boolean {
  if (PUBLIC_API.has(pathname)) return true;
  if (method !== 'GET' && method !== 'HEAD') return false;
  // Generation endpoints are POST-only, so a GET prefix match never exposes them.
  return PUBLIC_READ_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith('/api/');

  if (isApi && isPublicApi(pathname, request.method)) {
    return NextResponse.next();
  }

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (isApi) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL('/login', request.url);
  url.searchParams.set('returnUrl', pathname);
  return NextResponse.redirect(url);
}
