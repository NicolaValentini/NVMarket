import { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { checkDataFound, deleteTagAction, getTagByIdAction } from '@/lib';

import { DeleteDialog, ErrorDialog } from '../../../feedback';
import { RouterDialogOnCloseProps, TagChip } from '../../../ui';

type Props = RouterDialogOnCloseProps & {
  id: string;
};

export const TagDelete: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const tag = id ? await getTagByIdAction(id) : undefined;

  const error = checkDataFound(tag, !id);
  const deleteAction = deleteTagAction.bind(null, id);

  return error ? (
    <ErrorDialog
      open
      message={error}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    />
  ) : (
    <DeleteDialog
      title='Delete Supermarket'
      deleteAction={deleteAction}
      onCloseBack={onCloseBack}
      onCloseAction={onCloseAction}
      onCloseRedirect={onCloseRedirect}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Typography>Are you sure you want to delete the tag</Typography>
        <TagChip tag={tag!.data!} />
        <Typography>?</Typography>
      </Box>
    </DeleteDialog>
  );
};
