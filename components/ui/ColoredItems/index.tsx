import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export const coloredStyles = (color?: string, sx?: object) => ({
  position: 'relative',
  pl: 2,
  ...(sx ?? {}),

  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '8px',
    backgroundColor: color ?? '',
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
  },
});

type Props = {
  item?: { id: string; name: string; color: string } | undefined;
  divider?: boolean;
  primary?: ReactNode;
  secondaryAction?: ReactNode;
  sx?: object;
};

export const ColoredListItem: FC<Props> = ({
  item,
  divider,
  primary,
  secondaryAction,
  sx,
}) => (
  <ListItem
    divider={divider}
    secondaryAction={secondaryAction}
    sx={coloredStyles(item?.color, sx)}
  >
    <ListItemText primary={primary ?? item?.name} />
  </ListItem>
);

export const ColoredBox: FC<Props> = ({ item, primary, sx }) => (
  <Box sx={coloredStyles(item?.color, sx)}>{primary ?? item?.name}</Box>
);
