import { FC, ReactNode } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

type Props = {
  item: { name: string; color: string };
  divider?: boolean;
  secondaryAction?: ReactNode;
};

export const ColoredListItem: FC<Props> = ({
  item,
  divider,
  secondaryAction,
}) => {
  return (
    <ListItem
      divider={divider}
      secondaryAction={secondaryAction}
      sx={{
        position: 'relative',
        pl: 2,

        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '8px',
          backgroundColor: item.color,
          borderTopLeftRadius: 'inherit',
          borderBottomLeftRadius: 'inherit',
        },
      }}
    >
      <ListItemText primary={item.name} />
    </ListItem>
  );
};
