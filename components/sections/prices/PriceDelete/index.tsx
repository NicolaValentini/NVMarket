import { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  checkDataFound,
  deletePriceAction,
  getPriceByIdAction,
  getPriceDisplayName,
} from '@/lib';

import { RouterDialogOnCloseProps } from '../../../ui';
import { DeleteDialog, ErrorDialog } from '../../../feedback';

type Props = RouterDialogOnCloseProps & {
  id: string;
};

export const PriceDelete: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const price = id ? await getPriceByIdAction(id) : undefined;

  const error = checkDataFound(price, !id);
  const deleteAction = deletePriceAction.bind(null, id);

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
      title='Delete Price'
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
        <Typography>Are you sure you want to delete the price</Typography>
        <strong>{getPriceDisplayName(price!.data!)}</strong>
        <Typography>?</Typography>
      </Box>
    </DeleteDialog>
  );
};
