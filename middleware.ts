import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path starts with /cockpit
  const isAdminRoute = pathname.startsWith('/cockpit');
  
  // If it's not an admin route, allow the request
  if (!isAdminRoute) {
    return NextResponse.next();
  }
  
  // For admin routes, verify authentication
  const session = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // If not authenticated and trying to access admin route, redirect to login
  if (!session && isAdminRoute) {
    const url = new URL('/login', request.url);
    // Add the original URL as a parameter to redirect after login
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: ['/cockpit/:path*'],
};