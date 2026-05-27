import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { i18n } from '@/lib';

export default async function GlobalNotFound() {
  const cookiesStore = await cookies();
  const locale = cookiesStore.get('locale')?.value || i18n.defaultLocale;

  redirect(`/${locale}/products`);
}
