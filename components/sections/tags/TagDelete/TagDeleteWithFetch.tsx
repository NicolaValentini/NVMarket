import { FC } from 'react';

import { getTagByIdAction } from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { TagDelete } from './TagDelete';

type Props = {
  id: string;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
};

export const TagDeleteWithFetch: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const result = id ? await getTagByIdAction(id) : undefined;

  return !id || result?.isError || !result?.data ? (
    <ErrorAlert message={result?.message ?? 'No data found'} />
  ) : (
    <TagDelete
      tag={result.data}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  );
};
