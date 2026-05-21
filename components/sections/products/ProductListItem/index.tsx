'use client';

import { FC, Fragment, useState } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { ProductWithQuantityAndTags } from '@/lib';

import { TagChip } from '../../../ui';
import { ProductActions } from '../ProductActions';

type Props = {
  divider: boolean;
  product: ProductWithQuantityAndTags;
};

export const ProductListItem: FC<Props> = ({ product, divider }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment key={product.id}>
      <ListItem
        divider={divider}
        secondaryAction={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <ProductActions action='buy' product={product} />

            <ProductActions action='edit' product={product} />

            <ProductActions action='delete' product={product} />
          </Box>
        }
      >
        {open ? (
          <IconButton size='small' onClick={() => setOpen(!open)}>
            <ExpandLess fontSize='small' />
          </IconButton>
        ) : (
          <IconButton size='small' onClick={() => setOpen(!open)}>
            <ExpandMore fontSize='small' />
          </IconButton>
        )}
        <ListItemText
          slotProps={{
            primary: {
              sx: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
              },
            },
          }}
          onClick={() => setOpen(!open)}
        >
          {product.tags.map(tag => (
            <TagChip key={tag.id} tag={tag} />
          ))}
          {product.name}
        </ListItemText>
      </ListItem>
    </Fragment>
  );
};
