import { FC } from 'react';

import {
  checkDataFound,
  getProductWithTagsByIdAction,
  getTagsAction,
} from '@/lib';

import { ErrorDialog } from '../../../feedback';
import { RouterDialogOnCloseProps } from '../../../ui';

import { ProductForm } from '../ProductForm';

type Props = RouterDialogOnCloseProps & { id?: string };

export const ProductUpsert: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const product = id ? await getProductWithTagsByIdAction(id) : undefined;
  const tags = await getTagsAction();

  const error = id ? checkDataFound(product) : '';
  const tagsError = checkDataFound(tags);

  return error ? (
    <ErrorDialog
      open
      message={error}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  ) : (
    <ProductForm
      product={product?.data}
      tags={tags.data!}
      tagsError={tagsError}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
