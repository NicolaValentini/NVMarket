import { FC } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Supermarket } from '@/lib';

type Props = {
  action: 'create' | 'edit' | 'delete';
  supermarket?: Supermarket;
};

export const SupermarketActions: FC<Props> = ({ action, supermarket }) => {
  if (action === 'create') {
    return (
      <Link href='/supermarkets/create'>
        <Button variant='contained' startIcon={<AddIcon />}>
          Add
        </Button>
      </Link>
    );
  }

  if (action === 'edit' && supermarket?.id) {
    return (
      <Link href={`/supermarkets/${supermarket.id}/edit`}>
        <IconButton size='small'>
          <EditIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  if (action === 'delete' && supermarket?.id) {
    return (
      <Link href={`/supermarkets/${supermarket.id}/delete`}>
        <IconButton size='small' color='error'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  return null;
};
