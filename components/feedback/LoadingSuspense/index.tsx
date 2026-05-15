import { FC, ReactNode, Suspense } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  children: ReactNode;
};

export const LoadingSuspense: FC<Props> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      }
    >
      {children}
    </Suspense>
  );
};
