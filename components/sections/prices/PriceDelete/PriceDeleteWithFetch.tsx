import { FC } from 'react';

import { getPriceByIdAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { PriceDelete } from './PriceDelete';

type Props = {
  id: string;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const PriceDeleteWithFetch: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = id ? await getPriceByIdAction(id) : undefined;

  return !id || result?.isError || !result?.data ? (
    <ErrorAlert message={result?.message ?? 'No data found'} />
  ) : (
    <PriceDelete
      price={result.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
