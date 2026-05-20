import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export const coloredStyles = (color: string) => ({
  position: 'relative',
  pl: 2,

  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '8px',
    backgroundColor: color,
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
  },
});

type Props = {
  item: { id: string; name: string; color: string };
  value?: string;
  divider?: boolean;
  secondaryAction?: ReactNode;
  selected?: boolean;
};

export const ColoredListItem: FC<Props> = ({
  item,
  divider,
  secondaryAction,
}) => (
  <ListItem
    divider={divider}
    secondaryAction={secondaryAction}
    sx={coloredStyles(item.color)}
  >
    <ListItemText primary={item.name} />
  </ListItem>
);

export const ColoredBox: FC<Props> = ({ item }) => (
  <Box sx={coloredStyles(item.color)}>{item.name}</Box>
);
