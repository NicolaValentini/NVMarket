import { Suspense } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { getSupermarketsAction } from '@/lib';
import {
  ErrorAlert,
  PageHeader,
  SupermarketActions,
  SupermarketList,
} from '@/components';

const SupermarketsPage = async () => {
  const result = await getSupermarketsAction();

  const content = result.isError ? (
    <ErrorAlert message={result.message} />
  ) : (
    <SupermarketList supermarkets={result.data || []} />
  );

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
        {content}
      </Suspense>
    </Box>
  );
};

export default SupermarketsPage;
