// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which paths should be protected
// This matches any path that starts with '/protected-group'
export const config = {
  matcher: ['/admin/:path*'],
};

export function middleware(request: NextRequest) {
  // Get the session token from cookies
  const token = request.cookies.get('auth-token')?.value;
  
  // Get the current path
  const { pathname } = request.nextUrl;
  
  // Check if user is authenticated
  const isAuthenticated = token ? true : false; // In a real app, you'd validate the token
  
  // If not authenticated and trying to access protected routes
  if (!isAuthenticated && pathname.startsWith('/admin')) {
    // Redirect to login page with a return URL
    const url = new URL('/login', request.url);
    url.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}