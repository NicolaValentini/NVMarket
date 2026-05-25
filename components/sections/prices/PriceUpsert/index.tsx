import { FC } from 'react';

import {
  checkDataFound,
  getPriceByIdAction,
  getProductByIdAction,
  getSupermarketsAction,
} from '@/lib';

import { ErrorDialog } from '../../../feedback';
import { RouterDialogOnCloseProps } from '../../../ui';

import { PriceForm } from '../PriceForm';

type Props = RouterDialogOnCloseProps &
  ({ id: string } | { productId: string });

export const PriceUpsert: FC<Props> = async ({
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
  ...rest
}) => {
  const isEdit = 'id' in rest;

  let price, product;
  const supermarkets = await getSupermarketsAction();

  if (isEdit) price = await getPriceByIdAction(rest.id);
  else product = await getProductByIdAction(rest.productId);

  const error = checkDataFound(isEdit ? price : product);
  const supermarketsError = checkDataFound(supermarkets);

  return error ? (
    <ErrorDialog
      open
      message={error}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  ) : (
    <PriceForm
      {...(isEdit ? { price: price!.data! } : { product: product!.data! })}
      supermarkets={supermarkets.data!}
      supermarketsError={supermarketsError}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
