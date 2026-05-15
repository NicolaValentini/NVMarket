import Box from '@mui/material/Box';

import { LoadingSuspense, PageHeader, TagActions, TagList } from '@/components';

export default function TagsPage() {
  return (
    <Box>
      <PageHeader title='Tags' action={<TagActions action='create' />} />

      <LoadingSuspense>
        <TagList />
      </LoadingSuspense>
    </Box>
  );
}
