import { FC } from 'react';

import { getProductWithTagsByIdAction, getTagsAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { ProductForm } from './ProductForm';

type Props = {
  id?: string;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const ProductFormWithFetch: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = id ? await getProductWithTagsByIdAction(id) : undefined;
  const result2 = await getTagsAction();

  let tagsError;
  if (!result2.data) tagsError = 'No data found';
  if (result2.isError) tagsError = result2.message;

  return id && (result?.isError || !result?.data) ? (
    <ErrorAlert message={result?.message ?? 'No data found'} />
  ) : (
    <ProductForm
      tags={result2.data ?? []}
      tagsError={tagsError}
      product={result?.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
