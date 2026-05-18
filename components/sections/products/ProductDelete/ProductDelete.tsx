'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

import { deleteProductAction, Product } from '@/lib';

import { ErrorAlert } from '../../../feedback';

type Props = {
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
  product: Product;
};

export const ProductDelete: FC<Props> = ({
  product,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const router = useRouter();

  const handleClose = () => {
    if (onCloseAction) onCloseAction();
    else if (onCloseBack) router.back();
    else if (onCloseRedirect) router.push(onCloseRedirect);
  };

  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;
    if (error) setError('');
    setDeleting(true);

    const result = await deleteProductAction(product.id);

    if (result.isError) setError(result.message!);
    else handleClose();

    setDeleting(false);
  };

  return (
    <>
      <DialogTitle>Delete Product</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Typography>Are you sure you want to delete the product</Typography>
          <strong>{product.name}</strong>
          <Typography>?</Typography>
        </Box>

        <ErrorAlert message={error} />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={deleting}>
          Cancel
        </Button>

        <Button
          color='error'
          variant='contained'
          disabled={deleting}
          onClick={() => void handleDelete()}
        >
          {deleting ? <CircularProgress size={20} /> : 'Delete'}
        </Button>
      </DialogActions>
    </>
  );
};
