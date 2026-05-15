import { Suspense } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { PageHeader, TagActions, TagList } from '@/components';

export default function TagsPage() {
  return (
    <Box>
      <PageHeader title='Tags' action={<TagActions action='create' />} />

      <Suspense
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress />
          </Box>
        }
      >
        <TagList />
      </Suspense>
    </Box>
  );
}
