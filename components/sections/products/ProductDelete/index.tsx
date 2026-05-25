import { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  checkDataFound,
  deleteProductAction,
  getProductByIdAction,
} from '@/lib';

import { RouterDialogOnCloseProps } from '../../../ui';
import { DeleteDialog, ErrorDialog } from '../../../feedback';

type Props = RouterDialogOnCloseProps & {
  id: string;
};

export const ProductDelete: FC<Props> = async ({
  id,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const product = id ? await getProductByIdAction(id) : undefined;

  const error = checkDataFound(product, !id);
  const deleteAction = deleteProductAction.bind(null, id);

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
      title='Delete Product'
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
        <Typography>Are you sure you want to delete the product</Typography>
        <strong>{product!.data!.name}</strong>
        <Typography>?</Typography>
      </Box>
    </DeleteDialog>
  );
};
