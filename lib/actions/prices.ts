'use server';

import { revalidatePath } from 'next/cache';
import { errorResult, validateId, validatePrice } from '../utils';
import {
  createPrice,
  deletePrice,
  getPriceById,
  getPriceByNameAndProductAndSupermarket,
  getPricesByProductId,
  updatePrice,
} from '../db';

export async function getPricesByProductIdAction(id: string) {
  const errors = validateId(id);

  if (Object.keys(errors).length) {
    return errorResult('Missing id', []);
  }

  const result = getPricesByProductId(id);

  if (result.isError) {
    return errorResult('Something went wrong during prices fetching', []);
  }

  return result;
}

export async function getPriceByIdAction(id: string) {
  const errors = validateId(id);

  if (Object.keys(errors).length) {
    return errorResult('Missing id', undefined);
  }

  const result = getPriceById(id);

  if (result.isError) {
    return errorResult('Something went wrong during price fetching', undefined);
  }

  return result;
}

export async function createPriceAction(formData: FormData) {
  const product_id = formData.get('product') as string;
  const supermarket_id = formData.get('supermarket') as string;
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const yuka = formData.get('yuka') as string;

  const errors = validatePrice({
    name,
    price,
    yuka,
    product_id,
    supermarket_id,
  });

  if (Object.keys(errors).length) return errors;

  const duplicated = getPriceByNameAndProductAndSupermarket(
    name,
    product_id,
    supermarket_id,
  );

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id) {
    errors.name =
      'Already exist a price with this name for this product in the same supermarket';
    return errors;
  }

  const result = createPrice(
    product_id,
    supermarket_id,
    name,
    Number(price),
    yuka ? Number(yuka) : 0,
  );

  if (result.isError) {
    errors.result = 'Something went wrong during price creation';
    return errors;
  }

  revalidatePath('/[locale]/products', 'page');

  return {};
}

export async function updatePriceAction(formData: FormData) {
  const id = formData.get('id') as string;
  const product_id = formData.get('product') as string;
  const supermarket_id = formData.get('supermarket') as string;
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const yuka = formData.get('yuka') as string;

  const errors = {
    ...validateId(id),
    ...validatePrice({ name, price, yuka, product_id, supermarket_id }),
  };

  if (Object.keys(errors).length) return errors;

  const duplicated = getPriceByNameAndProductAndSupermarket(
    name,
    product_id,
    supermarket_id,
  );

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id && duplicated.data.id !== id) {
    errors.name =
      'Already exist a price with this name for this product in the same supermarket';
    return errors;
  }

  const result = updatePrice(
    id,
    product_id,
    supermarket_id,
    name,
    Number(price),
    yuka ? Number(yuka) : 0,
  );

  if (result.isError) {
    errors.result = 'Something went wrong during price updating';
    return errors;
  }

  revalidatePath('/[locale]/products', 'page');

  return errors;
}

export async function deletePriceAction(id: string) {
  const errors = validateId(id);

  if (Object.keys(errors).length) {
    return errorResult('Missing id');
  }

  const result = deletePrice(id);

  if (result.isError) {
    return errorResult('Something went wrong during price deleting');
  }

  revalidatePath('/[locale]/products', 'page');

  return result;
}
