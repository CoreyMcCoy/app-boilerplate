import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = path === '/login' || path === '/register';

  if (publicPaths && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
}

export const config = {
  matcher: ['/dashboard', '/login', '/register'],
};
