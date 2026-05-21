'use server';

import { revalidatePath } from 'next/cache';

import { validatePrice } from '../utils';
import {
  createPrice,
  deletePrice,
  getPriceById,
  getPriceByNameAndProductAndSupermarket,
  getPricesByProductId,
  updatePrice,
} from '../db';

export async function getPricesByProductIdAction(id: string) {
  const result = getPricesByProductId(id);

  if (result.isError) {
    result.message = 'Something went wrong during prices fetching';
    return result;
  }

  return result;
}

export async function getPriceByIdAction(id: string) {
  const result = getPriceById(id);

  if (result.isError) {
    result.message = 'Something went wrong during price fetching';
    return result;
  }

  return result;
}

export async function createPriceAction(formData: FormData) {
  const productId = formData.get('product') as string;
  const supermarketId = formData.get('supermarket') as string;
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const yuka = formData.get('yuka') as string;

  const errors = validatePrice(name, price, yuka, productId, supermarketId);

  if (Object.keys(errors).length) return errors;

  const duplicated = getPriceByNameAndProductAndSupermarket(
    name,
    productId,
    supermarketId,
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
    productId,
    supermarketId,
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
  const productId = formData.get('product') as string;
  const supermarketId = formData.get('supermarket') as string;
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const yuka = formData.get('yuka') as string;

  const errors = validatePrice(name, price, yuka, productId, supermarketId);

  if (Object.keys(errors).length) return errors;

  const duplicated = getPriceByNameAndProductAndSupermarket(
    name,
    productId,
    supermarketId,
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
    productId,
    supermarketId,
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
  const result = deletePrice(id);

  if (result.isError) {
    result.message = 'Something went wrong during price deleting';
    return result;
  }

  revalidatePath('/[locale]/products', 'page');

  return result;
}
