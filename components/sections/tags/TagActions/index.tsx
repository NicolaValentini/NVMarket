import { FC } from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Tag } from '@/lib';

type Props = {
  action: 'create' | 'edit' | 'delete';
  tag?: Tag;
};

export const TagActions: FC<Props> = ({ action, tag }) => {
  if (action === 'create') {
    return (
      <Link href='/tags/create'>
        <Button variant='contained' startIcon={<AddIcon />}>
          Add
        </Button>
      </Link>
    );
  }

  if (action === 'edit' && tag?.id) {
    return (
      <Link href={`/tags/${tag.id}/edit`}>
        <IconButton size='small'>
          <EditIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  if (action === 'delete' && tag?.id) {
    return (
      <Link href={`/tags/${tag.id}/delete`}>
        <IconButton size='small' color='error'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Link>
    );
  }

  return null;
};
