'use client';

import { FC, useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Box from '@mui/material/Box';

import { CartItemWithProduct, Supermarket, Tag } from '@/lib';

import { ProductSelect, SupermarketSelect, TagSelect } from '../../../ui';

type Props = {
  tags: Tag[];
  tagsError?: string | undefined;
  products: CartItemWithProduct[];
  productsError?: string | undefined;
  supermarkets: Supermarket[];
  supermarketsError?: string | undefined;
  selectedTagId?: string | undefined;
  selectedProductId?: string | undefined;
  selectedSupermarketId?: string | undefined;
};

export const CartFilters: FC<Props> = ({
  tags,
  tagsError,
  products,
  productsError,
  supermarkets,
  supermarketsError,
  selectedTagId = '',
  selectedProductId = '',
  selectedSupermarketId = '',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tag, setTag] = useState(selectedTagId);
  const [product, setProduct] = useState(selectedProductId);
  const [supermarket, setSupermarket] = useState(selectedSupermarketId);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) params.set(key, value);
      else params.delete(key);

      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleTagChange = (tags: string[]) => {
    setTag(tags[0] ?? '');
    updateParam('tagId', tags[0] ?? '');
  };

  const handleProductChange = (product: string) => {
    setProduct(product);
    updateParam('productId', product);
  };

  const handleSupermarketChange = (supermarket: string) => {
    setSupermarket(supermarket);
    updateParam('supermarketId', supermarket);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <TagSelect
        tags={tags}
        disabled={!tags.length}
        selectedTags={[tag]}
        setTags={handleTagChange}
        error={tagsError}
      />

      <ProductSelect
        products={products.map(product => ({
          id: product.product_id,
          name: product.productName,
        }))}
        selectedProduct={product}
        setProduct={handleProductChange}
        disabled={!products.length}
        error={productsError}
      />

      <SupermarketSelect
        supermarkets={supermarkets}
        selectedSupermarket={supermarket}
        setSupermarket={handleSupermarketChange}
        disabled={!supermarkets.length}
        error={supermarketsError}
      />
    </Box>
  );
};
