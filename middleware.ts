import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Router from 'next/router';
import { getCookie } from 'cookies-next';

export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url));
  }
}

export const config = {
  matcher: ['/character/:path*', '/dashboard/:path*'],
};
