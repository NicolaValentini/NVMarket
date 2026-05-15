import Box from '@mui/material/Box';

import {
  LoadingSuspense,
  PageHeader,
  SupermarketActions,
  SupermarketList,
} from '@/components';

export default function SupermarketsPage() {
  return (
    <Box>
      <PageHeader
        title='Supermarkets'
        action={<SupermarketActions action='create' />}
      />

      <LoadingSuspense>
        <SupermarketList />
      </LoadingSuspense>
    </Box>
  );
}
