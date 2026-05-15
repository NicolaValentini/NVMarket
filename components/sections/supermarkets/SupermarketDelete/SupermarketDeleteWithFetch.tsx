import { FC } from 'react';

import { getSupermarketByIdAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { SupermarketDelete } from './SupermarketDelete';

type Props = {
  id: string;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const SupermarketDeleteWithFetch: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = await getSupermarketByIdAction(id);

  return result.isError || !result.data ? (
    <ErrorAlert message={result.message} />
  ) : (
    <SupermarketDelete
      supermarket={result.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
