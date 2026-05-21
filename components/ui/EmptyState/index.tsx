import { FC, ReactNode } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  icon: ReactNode;
  message: string;
};

export const EmptyState: FC<Props> = ({ icon, message }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 8,
      gap: 2,
      opacity: 0.5,
    }}
  >
    <Box sx={{ fontSize: 64, display: 'flex' }}>{icon}</Box>
    <Typography>{message}</Typography>
  </Box>
);

export const SmallEmptyState: FC<Props> = ({ icon, message }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      my: 2,
      gap: 2,
      opacity: 0.5,
    }}
  >
    <Box sx={{ fontSize: 64, display: 'flex' }}>{icon}</Box>
    <Typography>{message}</Typography>
  </Box>
);
