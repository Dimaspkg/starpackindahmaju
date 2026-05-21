import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const locales = ['id', 'en', 'zh', 'jp'];
const defaultLocale = 'id';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check Authentication for Admin routes
  const isAdminRoute = locales.some(
    (locale) => pathname.startsWith(`/${locale}/admin`) || pathname === `/${locale}/admin`
  ) || pathname.startsWith('/admin') || pathname === '/admin';

  if (isAdminRoute) {
    const token = await getToken({ req: request });
    if (!token) {
      const match = pathname.match(/^\/([^\/]+)/);
      const locale = match && locales.includes(match[1]) ? match[1] : defaultLocale;
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. i18n Routing
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Ignore static files and API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.match(/\.(css|png|jpg|jpeg|webp|svg)$/)
  ) {
    return NextResponse.next();
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
