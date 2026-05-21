import {
  PriceErrors,
  ProductErrors,
  Result,
  SupermarketErrors,
  TagErrors,
} from '../types';

export const validateSupermarket = (name: string, color: string) => {
  const errors: SupermarketErrors = {};

  if (!name) errors.name = 'Field required';
  if (!color) errors.color = 'Field required';

  return errors;
};

export const validateTag = (name: string, color: string) => {
  const errors: TagErrors = {};

  if (!name) errors.name = 'Field required';
  if (!color) errors.color = 'Field required';

  return errors;
};

export const validateProduct = (name: string, tags: string[]) => {
  const errors: ProductErrors = {};

  if (!name) errors.name = 'Field required';
  if (!tags.length) errors.tags = 'Field required';

  return errors;
};

export const validatePrice = (
  name: string,
  price: string | number,
  yuka: string | number,
  product_id: string,
  supermarket_id: string,
) => {
  const errors: PriceErrors = {};

  if (!name.trim()) errors.name = 'Field required';
  if (!price) errors.price = 'Field required';
  if (Number.isNaN(price)) errors.price = 'Value not allowed';
  if (yuka && Number.isNaN(yuka)) errors.price = 'Value not allowed';
  if (!product_id.trim()) errors.product_id = 'Field required';
  if (!supermarket_id.trim()) errors.supermarket_id = 'Field required';

  return errors;
};

export const errorResult = <T = unknown>(data?: T, message?: string) =>
  ({ isError: true, data, message }) as Result<T>;
export const successResult = <T = unknown>(data?: T, message?: string) =>
  ({ isError: false, data, message }) as Result<T>;
