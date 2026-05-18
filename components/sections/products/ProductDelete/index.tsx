import { ProductDeleteWithFetch } from './ProductDeleteWithFetch';
import { ProductDelete as ProductDeleteBase } from './ProductDelete';

export const ProductDelete = Object.assign(ProductDeleteBase, {
  WithFetch: ProductDeleteWithFetch,
});
