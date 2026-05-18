import Box from '@mui/material/Box';

import {
  LoadingSuspense,
  PageHeader,
  ProductActions,
  ProductList,
} from '@/components';

export default function ProductsPage() {
  return (
    <Box>
      <PageHeader
        title='Products'
        action={<ProductActions action='create' />}
      />

      <LoadingSuspense>
        <ProductList />
      </LoadingSuspense>
    </Box>
  );
}
