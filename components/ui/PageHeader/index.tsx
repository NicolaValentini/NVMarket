import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  title: string;
  action?: ReactNode;
};

export const PageHeader: FC<Props> = ({ title, action }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 3,
    }}
  >
    <Typography variant='h5' sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
    {action}
  </Box>
);
