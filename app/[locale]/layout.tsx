import { ReactNode } from 'react';

import { getDictionary, Locale } from '@/lib';
import { AppShell, Providers } from '@/components';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const locale = (await params).locale as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <Providers locale={locale} dictionary={dictionary}>
      <AppShell>{children}</AppShell>
    </Providers>
  );
}
