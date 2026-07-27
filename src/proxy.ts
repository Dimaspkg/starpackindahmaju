import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const locales = ['id', 'en', 'zh', 'jp'];
const defaultLocale = 'id';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect WWW to NON-WWW (canonical domain)
  const host = request.headers.get('host');
  if (host && host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./, '');
    const newUrl = new URL(pathname + request.nextUrl.search, `https://${nonWwwHost}`);
    return NextResponse.redirect(newUrl, 301);
  }

  // 2. Redirect locale-prefixed admin routes (e.g., /id/admin/... -> /admin/...)
  const hasLocaleAdmin = locales.some(
    (locale) => pathname.startsWith(`/${locale}/admin`) || pathname === `/${locale}/admin`
  );

  if (hasLocaleAdmin) {
    const segments = pathname.split('/');
    const newPathname = '/' + segments.slice(2).join('/');
    const newUrl = new URL(newPathname + request.nextUrl.search, request.url);
    return NextResponse.redirect(newUrl, 301);
  }

  // 3. Check Authentication for Admin routes (e.g., /admin/...)
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/admin';

  if (isAdminRoute) {
    const token = await getToken({ req: request });
    if (!token) {
      const loginUrl = new URL(`/${defaultLocale}/login?callbackUrl=${encodeURIComponent(pathname + request.nextUrl.search)}`, request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 4. i18n Routing
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
