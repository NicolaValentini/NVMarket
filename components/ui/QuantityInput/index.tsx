'use client';

import { FC, startTransition, useActionState } from 'react';

import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';

import { CartItemUpdate, updateCartItemAction } from '@/lib';

const min = 0;
const max = 99;

type Props = {
  value: number;
  productId: string;
  disabled?: true | undefined;
};

export const QuantityInput: FC<Props> = ({ value, productId, disabled }) => {
  const [{ count, isError }, dispatchAction, isPending] = useActionState<
    CartItemUpdate,
    'INCREASE' | 'DECREASE'
  >(updateCartItemAction, { productId, count: value ?? 0 });

  function handleAdd() {
    startTransition(() => {
      dispatchAction('INCREASE');
    });
  }

  function handleRemove() {
    startTransition(() => {
      dispatchAction('DECREASE');
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          overflow: 'hidden',
          width: 'fit-content',
        }}
      >
        <IconButton
          onClick={handleRemove}
          disabled={disabled || count <= min || isPending}
          sx={{ borderRadius: 0, px: 1 }}
        >
          <RemoveIcon />
        </IconButton>

        <TextField
          disabled
          value={count}
          error={isError}
          variant='standard'
          slotProps={{
            htmlInput: {
              style: {
                textAlign: 'center',
                width: '20px',
              },
            },
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'center',
              py: 1,
            },
            '& .MuiInput-underline:before': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:after': {
              borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottom: 'none',
            },
          }}
        />

        <IconButton
          onClick={handleAdd}
          disabled={disabled || count >= max || isPending}
          sx={{ borderRadius: 0, px: 1 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
