import { FC } from 'react';

import { checkDataFound, getSupermarketByIdAction } from '@/lib';

import { ErrorDialog } from '../../../feedback';
import { RouterDialogOnCloseProps } from '../../../ui';

import { SupermarketForm } from '../SupermarketForm';

type Props = RouterDialogOnCloseProps & { id?: string };

export const SupermarketUpsert: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const supermarket = id ? await getSupermarketByIdAction(id) : undefined;

  const error = id ? checkDataFound(supermarket) : '';

  return error ? (
    <ErrorDialog
      open
      message={error}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  ) : (
    <SupermarketForm
      supermarket={supermarket?.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
