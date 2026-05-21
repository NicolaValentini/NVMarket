'use client';

import { FC, startTransition, use, useActionState } from 'react';
import { useRouter } from 'next/navigation';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { I18nContext } from '@/context';
import { FavoriteUpdate, Price, setFavoritePriceAction } from '@/lib';

type Props = {
  action: 'create' | 'favorite' | 'edit' | 'delete';
  price?: Price;
  productId?: string;
};

export const PriceActions: FC<Props> = ({ action, price, productId }) => {
  const router = useRouter();
  const { locale } = use(I18nContext);

  if (action === 'create' && productId) {
    return (
      <IconButton
        size='small'
        onClick={() => router.push(`/${locale}/prices/create/${productId}`)}
      >
        <AddIcon fontSize='small' />
      </IconButton>
    );
  }

  if (action === 'favorite' && price?.id) {
    return <FavoriteButton price={price} />;
  }

  if (action === 'edit' && price?.id) {
    return (
      <IconButton
        size='small'
        onClick={() => router.push(`/${locale}/prices/${price.id}/edit`)}
      >
        <EditIcon fontSize='small' />
      </IconButton>
    );
  }

  if (action === 'delete' && price?.id) {
    return (
      <IconButton
        size='small'
        color='error'
        onClick={() => router.push(`/${locale}/prices/${price.id}/delete`)}
      >
        <DeleteIcon fontSize='small' />
      </IconButton>
    );
  }

  return null;
};

const FavoriteButton: FC<Pick<Props, 'price'>> = ({ price }) => {
  const [{ favorite }, dispatchAction, isPending] =
    useActionState<FavoriteUpdate>(setFavoritePriceAction, {
      favorite: !!price?.favorite,
      id: price?.id || '',
    });

  return (
    <IconButton
      size='small'
      disabled={isPending}
      onClick={() => startTransition(dispatchAction)}
    >
      {favorite ? (
        <FavoriteIcon fontSize='small' />
      ) : (
        <FavoriteBorderIcon fontSize='small' />
      )}
    </IconButton>
  );
};
