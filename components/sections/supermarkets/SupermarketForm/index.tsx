import { SupermarketFormWithFetch } from './SupermarketFormWithFetch';
import { SupermarketForm as SupermarketFormBase } from './SupermarketForm';

export const SupermarketForm = Object.assign(SupermarketFormBase, {
  WithFetch: SupermarketFormWithFetch,
});
