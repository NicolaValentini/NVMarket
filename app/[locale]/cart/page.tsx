import { FC } from 'react';

import Box from '@mui/material/Box';

import {
  checkDataFound,
  getCartItemsProductsAction,
  getSupermarketsAction,
  getTagsAction,
} from '@/lib';
import {
  CartFilters,
  CartList,
  LoadingSuspense,
  PageHeader,
} from '@/components';

type Props = {
  searchParams: Promise<{
    tagId?: string;
    productId?: string;
    supermarketId?: string;
  }>;
};

export default async function TagsPage({ searchParams }: Props) {
  const { tagId, productId, supermarketId } = await searchParams;

  return (
    <Box>
      <PageHeader
        title='Cart'
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LoadingSuspense>
              <CartFiltersLoader
                selectedTagId={tagId}
                selectedProductId={productId}
                selectedSupermarketId={supermarketId}
              />
            </LoadingSuspense>
          </Box>
        }
      />

      <LoadingSuspense>
        <CartList
          tagId={tagId}
          productId={productId}
          supermarketId={supermarketId}
        />
      </LoadingSuspense>
    </Box>
  );
}

type CartFiltersLoaderProps = {
  selectedTagId?: string | undefined;
  selectedProductId?: string | undefined;
  selectedSupermarketId?: string | undefined;
};

const CartFiltersLoader: FC<CartFiltersLoaderProps> = async ({
  selectedTagId,
  selectedProductId,
  selectedSupermarketId,
}) => {
  const [tags, products, supermarkets] = await Promise.all([
    getTagsAction(),
    getCartItemsProductsAction(),
    getSupermarketsAction(),
  ]);

  const tagsError = checkDataFound(tags);
  const productsError = checkDataFound(products);
  const supermarketsError = checkDataFound(supermarkets);

  return (
    <CartFilters
      tags={tags.data ?? []}
      tagsError={tagsError}
      products={products.data ?? []}
      productsError={productsError}
      supermarkets={supermarkets.data ?? []}
      supermarketsError={supermarketsError}
      selectedTagId={selectedTagId}
      selectedProductId={selectedProductId}
      selectedSupermarketId={selectedSupermarketId}
    />
  );
};
