import {
  IdErrors,
  Price,
  PriceErrors,
  Product,
  ProductErrors,
  Result,
  Supermarket,
  SupermarketErrors,
  Tag,
  TagErrors,
} from '../types';

export const getPriceDisplayName = ({
  name,
  price,
  yuka,
}: {
  name: string;
  price: number | string;
  yuka: number | string;
}) => [name, price, yuka].filter(Boolean).join(' - ');

export const validateId = (id: string) => {
  const errors: IdErrors = {};

  if (!id.trim()) errors.id = 'Field required';

  return errors;
};

export const validateSupermarket = ({
  name,
  color,
}: Omit<Supermarket, 'id'>) => {
  const errors: SupermarketErrors = {};

  if (!name.trim()) errors.name = 'Field required';
  if (!color.trim()) errors.color = 'Field required';

  return errors;
};

export const validateTag = ({ name, color }: Omit<Tag, 'id'>) => {
  const errors: TagErrors = {};

  if (!name.trim()) errors.name = 'Field required';
  if (!color.trim()) errors.color = 'Field required';

  return errors;
};

export const validateProduct = ({
  name,
  tags,
}: Omit<Product, 'id'> & { tags: string[] }) => {
  const errors: ProductErrors = {};

  if (!name.trim()) errors.name = 'Field required';
  if (!tags.filter(Boolean).length) errors.tags = 'Field required';

  return errors;
};

export const validatePrice = ({
  name,
  price,
  yuka,
  product_id,
  supermarket_id,
}: Omit<Price, 'id' | 'price' | 'yuka' | 'favorite'> & {
  price?: string;
  yuka?: string;
}) => {
  const errors: PriceErrors = {};

  if (!name.trim()) errors.name = 'Field required';
  if (!price) errors.price = 'Field required';
  if (Number.isNaN(price)) errors.price = 'Value not allowed';
  if (yuka && Number.isNaN(yuka)) errors.price = 'Value not allowed';
  if (!product_id.trim()) errors.product_id = 'Field required';
  if (!supermarket_id.trim()) errors.supermarket_id = 'Field required';

  return errors;
};

export const errorResult = <T = unknown>(message?: string, data?: T) =>
  ({ isError: true, data, message }) as Result<T>;
export const successResult = <T = unknown>(data?: T, message?: string) =>
  ({ isError: false, data, message }) as Result<T>;

export const checkDataFound = (result?: Result, addChecks?: boolean) =>
  addChecks || result?.isError || !result?.data
    ? (result?.message ?? 'No data found')
    : '';
