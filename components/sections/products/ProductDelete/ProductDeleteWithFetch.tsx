import { FC } from 'react';

import { getProductByIdAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { ProductDelete } from './ProductDelete';

type Props = {
  id: string;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const ProductDeleteWithFetch: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = await getProductByIdAction(id);

  return result.isError || !result.data ? (
    <ErrorAlert message={result.message ?? 'No data found'} />
  ) : (
    <ProductDelete
      product={result.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
