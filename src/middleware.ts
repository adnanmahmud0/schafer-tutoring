import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/student', '/teacher', '/admin'];

// Routes only for unauthenticated users
const authRoutes = ['/login', '/register', '/otp', '/reset', '/setnewpassword'];

export function middleware(request: NextRequest) {
  // Check for refreshToken in cookies (set by backend)
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  // Protected routes - redirect to login if no token
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!refreshToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Auth routes - redirect to home if already logged in
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/student/:path*',
    '/teacher/:path*',
    '/admin/:path*',
    '/login',
    '/register',
    '/otp',
    '/reset',
    '/setnewpassword',
  ],
};