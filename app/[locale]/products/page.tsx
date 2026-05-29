import { FC } from 'react';

import Box from '@mui/material/Box';

import { checkDataFound, getSupermarketsAction, getTagsAction } from '@/lib';
import {
  LoadingSuspense,
  PageHeader,
  ProductActions,
  ProductFilters,
  ProductList,
} from '@/components';

type Props = {
  searchParams: Promise<{ tagId?: string; supermarketId?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { tagId, supermarketId } = await searchParams;

  return (
    <Box>
      <PageHeader
        title='Products'
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LoadingSuspense>
              <ProductFiltersLoader
                selectedTagId={tagId}
                selectedSupermarketId={supermarketId}
              />
            </LoadingSuspense>

            <ProductActions action='create' />
          </Box>
        }
      />

      <LoadingSuspense>
        <ProductList tagId={tagId} supermarketId={supermarketId} />
      </LoadingSuspense>
    </Box>
  );
}

type ProductFiltersLoaderProps = {
  selectedTagId?: string | undefined;
  selectedSupermarketId?: string | undefined;
};

const ProductFiltersLoader: FC<ProductFiltersLoaderProps> = async ({
  selectedTagId,
  selectedSupermarketId,
}) => {
  const [tags, supermarkets] = await Promise.all([
    getTagsAction(),
    getSupermarketsAction(),
  ]);

  const tagsError = checkDataFound(tags);
  const supermarketsError = checkDataFound(supermarkets);

  return (
    <ProductFilters
      tags={tags.data ?? []}
      tagsError={tagsError}
      supermarkets={supermarkets.data ?? []}
      supermarketsError={supermarketsError}
      selectedTagId={selectedTagId}
      selectedSupermarketId={selectedSupermarketId}
    />
  );
};
