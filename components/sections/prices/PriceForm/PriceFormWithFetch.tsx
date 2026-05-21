import { FC } from 'react';

import {
  getPriceByIdAction,
  getProductByIdAction,
  getSupermarketsAction,
} from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { PriceForm } from './PriceForm';

type Props = (
  | {
      id: string;
      productId?: undefined;
    }
  | {
      id?: undefined;
      productId: string;
    }
) & {
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const PriceFormWithFetch: FC<Props> = async ({
  id,
  productId,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = id ? await getPriceByIdAction(id) : undefined;
  const result2 = await getSupermarketsAction();
  const result3 = productId ? await getProductByIdAction(productId) : undefined;

  let supermarketsError;
  if (!result2.data) supermarketsError = 'No data found';
  if (result2.isError) supermarketsError = result2.message;

  let error;
  if (id && (result?.isError || !result?.data))
    error = result?.message ?? 'No data found';
  if (productId && (result3?.isError || !result3?.data))
    error = result3?.message ?? 'No data found';

  return error ? (
    <ErrorAlert message={error} />
  ) : (
    <PriceForm
      supermarkets={result2.data!}
      supermarketsError={supermarketsError}
      {...(id ? { price: result!.data! } : { product: result3!.data! })}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
