'use server';

import { cookies } from 'next/headers';
import { Locale } from '@/lib';

export async function setLocaleCookie(locale: Locale) {
  (await cookies()).set('locale', locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  });
}
