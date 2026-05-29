import Box from '@mui/material/Box';

import { CartList, LoadingSuspense, PageHeader } from '@/components';

export default function TagsPage() {
  return (
    <Box>
      <PageHeader title='Cart' />

      <LoadingSuspense>
        <CartList />
      </LoadingSuspense>
    </Box>
  );
}
