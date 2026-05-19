import { ProductErrors, Result, SupermarketErrors, TagErrors } from '../types';

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

export const errorResult = <T = unknown>(data?: T, message?: string) =>
  ({ isError: true, data, message }) as Result<T>;
export const successResult = <T = unknown>(data?: T, message?: string) =>
  ({ isError: false, data, message }) as Result<T>;
