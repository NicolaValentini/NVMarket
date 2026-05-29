import { FC } from 'react';

import Box from '@mui/material/Box';

import { Product } from '@/lib';

import { Select } from '../Select';

type Props = {
  products: Product[];
  selectedProduct: string;
  setProduct: (product: string) => void;
  disabled?: boolean;
  error?: string | undefined;
};

export const ProductSelect: FC<Props> = ({
  products,
  selectedProduct,
  setProduct,
  disabled,
  error,
}) => (
  <Select<Product>
    options={products}
    error={error}
    disabled={disabled}
    label='Products'
    hiddenName='product'
    renderOption={product => product.name}
    singleSelected={selectedProduct}
    setSingleSelected={setProduct}
    renderSingleValue={selected => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {products.find(product => product.id === selected)!.name}
      </Box>
    )}
  />
);
