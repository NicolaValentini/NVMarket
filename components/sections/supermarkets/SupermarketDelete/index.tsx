import { SupermarketDeleteWithFetch } from './SupermarketDeleteWithFetch';
import { SupermarketDeleteBase } from './SupermarketDeleteBase';

export const SupermarketDelete = Object.assign(SupermarketDeleteBase, {
  WithFetch: SupermarketDeleteWithFetch,
});
