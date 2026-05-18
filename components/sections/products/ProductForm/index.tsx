import { ProductFormWithFetch } from './ProductFormWithFetch';
import { ProductForm as ProductFormBase } from './ProductForm';

export const ProductForm = Object.assign(ProductFormBase, {
  WithFetch: ProductFormWithFetch,
});
