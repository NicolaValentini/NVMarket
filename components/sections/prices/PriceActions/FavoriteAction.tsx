'use client';

import { FC, startTransition, useActionState } from 'react';

import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { FavoriteUpdate, Price, setFavoritePriceAction } from '@/lib';

type Props = {
  price: Price;
};

export const FavoriteAction: FC<Props> = ({ price }) => {
  const [{ favorite }, dispatchAction, isPending] =
    useActionState<FavoriteUpdate>(setFavoritePriceAction, {
      id: price.id,
      favorite: price.favorite,
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
