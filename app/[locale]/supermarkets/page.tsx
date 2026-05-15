import { Suspense } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { PageHeader, SupermarketActions, SupermarketList } from '@/components';

const SupermarketsPage = async () => {
  return (
    <Box>
      <PageHeader
        title='Supermarkets'
        action={<SupermarketActions action='create' />}
      />

      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        }
      >
        <SupermarketList />
      </Suspense>
    </Box>
  );
};

export default SupermarketsPage;
