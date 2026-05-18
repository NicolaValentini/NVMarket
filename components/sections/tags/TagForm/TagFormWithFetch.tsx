import { FC } from 'react';

import { getTagByIdAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { TagForm } from './TagForm';

type Props = {
  id: string;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const TagFormWithFetch: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = await getTagByIdAction(id);

  return result.isError || !result.data ? (
    <ErrorAlert message={result.message ?? 'No data found'} />
  ) : (
    <TagForm
      tag={result.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
