import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Auth protection for all LeadG pages + API routes.
 *
 * Replaces next-auth's withAuth wrapper, which never intercepted requests in
 * this stack (Next 16 standalone + basePath): logged-out visitors got the
 * dashboard shell stuck on "Loading dashboard..." forever. Mirrors the main
 * CRM pattern: valid session passes; APIs get JSON 401; pages redirect to
 * the mounted /leadg/login. Public: /api/auth, /api/webhooks, /api/twilio,
 * /login, Next statics.
 */
export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'default_dev_secret_change_me_in_prod',
  });
  if (token) return NextResponse.next();

  if (pathname.startsWith('/api')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const signInUrl = new URL(`${req.nextUrl.basePath || ''}/login`, req.url);
  signInUrl.searchParams.set('callbackUrl', pathname + search);
  const res = NextResponse.redirect(signInUrl);
  if (req.cookies.has('next-auth.session-token') || req.cookies.has('__Secure-next-auth.session-token')) {
    for (const name of ['next-auth.session-token', '__Secure-next-auth.session-token']) {
      for (const path of ['/', req.nextUrl.basePath || '/']) {
        res.cookies.set(name, '', { path, maxAge: 0 });
      }
    }
  }
  return res;
}

export const config = {
  matcher: [
    '/',
    '/((?!api/auth|api/webhooks|api/twilio|_next/static|_next/image|favicon.ico|login).*)',
  ],
};
