import { FC } from 'react';

import { checkDataFound, getTagByIdAction } from '@/lib';

import { ErrorDialog } from '../../../feedback';
import { RouterDialogOnCloseProps } from '../../../ui';

import { TagForm } from '../TagForm';

type Props = RouterDialogOnCloseProps & { id?: string };

export const TagUpsert: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const tag = id ? await getTagByIdAction(id) : undefined;

  const error = id ? checkDataFound(tag) : '';

  return error ? (
    <ErrorDialog
      open
      message={error}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  ) : (
    <TagForm
      tag={tag?.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
