import { FC } from 'react';

import { getSupermarketByIdAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { SupermarketForm } from './SupermarketForm';

type Props = {
  id: string;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const SupermarketFormWithFetch: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = id ? await getSupermarketByIdAction(id) : undefined;

  return id && (result?.isError || !result?.data) ? (
    <ErrorAlert message={result?.message ?? 'No data found'} />
  ) : (
    <SupermarketForm
      supermarket={result?.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
