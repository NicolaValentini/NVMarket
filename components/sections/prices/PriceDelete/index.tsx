import { PriceDeleteWithFetch } from './PriceDeleteWithFetch';
import { PriceDelete as PriceDeleteBase } from './PriceDelete';

export const PriceDelete = Object.assign(PriceDeleteBase, {
  WithFetch: PriceDeleteWithFetch,
});
