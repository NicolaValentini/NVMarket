import { PriceFormWithFetch } from './PriceFormWithFetch';
import { PriceForm as PriceFormBase } from './PriceForm';

export const PriceForm = Object.assign(PriceFormBase, {
  WithFetch: PriceFormWithFetch,
});
