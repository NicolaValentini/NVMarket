'use server';

import { revalidatePath } from 'next/cache';

import { errorResult, validateId, validateSupermarket } from '../utils';
import {
  createSupermarket,
  deleteCartItemByProductId,
  deleteSupermarket,
  getPricesByProductId,
  getPricesBySupermarketId,
  getSupermarketById,
  getSupermarketByName,
  getSupermarkets,
  updateSupermarket,
} from '../db';

export async function getSupermarketsAction() {
  const result = getSupermarkets();

  if (result.isError) {
    return errorResult('Something went wrong during supermarkets fetching', []);
  }

  return result;
}

export async function getSupermarketByIdAction(id: string) {
  const errors = validateId(id);

  if (Object.keys(errors).length) {
    return errorResult('Missing id', undefined);
  }

  const result = getSupermarketById(id);

  if (result.isError) {
    return errorResult(
      'Something went wrong during supermarket fetching',
      undefined,
    );
  }

  return result;
}

export async function createSupermarketAction(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  const errors = validateSupermarket({ name, color });

  if (Object.keys(errors).length) return errors;

  const duplicated = getSupermarketByName(name);

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id) {
    errors.name = 'Already exist a supermarket with this name';
    return errors;
  }

  const result = createSupermarket(name, color);

  if (result.isError) {
    errors.result = 'Something went wrong during supermarket creation';
    return errors;
  }

  revalidatePath('/[locale]/supermarkets', 'page');

  return {};
}

export async function updateSupermarketAction(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  const errors = {
    ...validateId(id),
    ...validateSupermarket({ name, color }),
  };

  if (Object.keys(errors).length) return errors;

  const duplicated = getSupermarketByName(name);

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id && duplicated.data.id !== id) {
    errors.name = 'Already exist a supermarket with this name';
    return errors;
  }

  const result = updateSupermarket(id, name, color);

  if (result.isError) {
    errors.result = 'Something went wrong during supermarket updating';
    return errors;
  }

  revalidatePath('/[locale]/supermarkets', 'page');

  return errors;
}

export async function deleteSupermarketAction(id: string) {
  const errors = validateId(id);

  if (Object.keys(errors).length) {
    return errorResult('Missing id');
  }

  const pricesResult = getPricesBySupermarketId(id);

  if (pricesResult.isError) {
    return errorResult('Something went wrong during prices fetching');
  }

  const productIds = new Set(pricesResult.data?.map(price => price.product_id));

  Array.from(productIds).forEach(productId => {
    const _pricesResult = getPricesByProductId(productId);

    if (_pricesResult.data?.length === 1) {
      deleteCartItemByProductId(productId);
    }
  });

  const result = deleteSupermarket(id);

  if (result.isError) {
    return errorResult('Something went wrong during supermarket deleting');
  }

  revalidatePath('/[locale]/supermarkets', 'page');

  return result;
}
