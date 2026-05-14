'use client';

import { FC, use } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Supermarket } from '@/lib';
import { I18nContext } from '@/context';

type Props = {
  action: 'create' | 'edit' | 'delete';
  supermarket?: Supermarket;
};

export const SupermarketActions: FC<Props> = ({ action, supermarket }) => {
  const router = useRouter();
  const { locale } = use(I18nContext);

  if (action === 'create') {
    return (
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => router.push(`/${locale}/supermarkets/create`)}
      >
        Add
      </Button>
    );
  }

  if (action === 'edit' && supermarket?.id) {
    return (
      <IconButton
        size='small'
        onClick={() =>
          router.push(`/${locale}/supermarkets/${supermarket.id}/edit`)
        }
      >
        <EditIcon fontSize='small' />
      </IconButton>
    );
  }

  if (action === 'delete' && supermarket?.id) {
    return (
      <IconButton
        size='small'
        color='error'
        onClick={() =>
          router.push(`/${locale}/supermarkets/${supermarket.id}/delete`)
        }
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    );
  }

  return null;
};
