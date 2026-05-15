import { SupermarketDeleteWithFetch } from './SupermarketDeleteWithFetch';
import { SupermarketDelete as SupermarketDeleteBase } from './SupermarketDelete';

export const SupermarketDelete = Object.assign(SupermarketDeleteBase, {
  WithFetch: SupermarketDeleteWithFetch,
});
