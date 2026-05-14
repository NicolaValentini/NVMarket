import { FC } from 'react';

import Chip from '@mui/material/Chip';

import type { Tag } from '@/lib';

type Props = {
  tag: Tag;
  size?: 'small' | 'medium';
  onDelete?: () => void;
};

export const TagChip: FC<Props> = ({ tag, size = 'small', onDelete }) => (
  <Chip
    size={size}
    label={tag.name}
    onDelete={onDelete}
    sx={{
      color: '#000',
      fontWeight: 600,
      bgcolor: tag.color,
    }}
  />
);
