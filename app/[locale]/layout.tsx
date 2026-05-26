import { ReactNode } from 'react';

import { AppShell, Providers } from '@/components';
import { getDictionary, Locale, setLocaleCookie } from '@/lib';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const locale = (await params).locale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <Providers
      locale={locale}
      dictionary={dictionary}
      setCookieLocaleAction={setLocaleCookie}
    >
      <AppShell>{children}</AppShell>
    </Providers>
  );
}
