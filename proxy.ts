import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';

import { i18n } from '@/lib';

function getLocale(request: NextRequest): string | undefined {
  // Transform NextRequest headers (Headers) into plain object
  const negotiatorHeaders = Object.fromEntries(request.headers.entries());

  const { locales, defaultLocale } = i18n;

  // Get preferred languages from Negotiator
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages([
    ...locales,
  ]);

  // Determine best locale
  return matchLocale(languages, locales, defaultLocale);
}

// Static assets that must bypass locale detection
const IGNORED_PATHS = /\.(svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files (public folder + sitemap/robots)
  if (IGNORED_PATHS.test(pathname)) {
    return;
  }

  // Skip API + _next
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return;
  }

  // Check if the pathname already contains a locale prefix
  const hasLocalePrefix = i18n.locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  let locale, response;

  // If missing locale, redirect to best match
  if (!hasLocalePrefix) {
    locale = getLocale(request);
    if (!locale) return;

    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

    response = NextResponse.redirect(url);
  } else {
    locale = pathname.split('/')[1] || i18n.defaultLocale;

    response = NextResponse.next();
  }

  response.cookies.set('locale', locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

// Matcher identical to your previous config, but slightly safer
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)'],
};
