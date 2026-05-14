'use server';

import { revalidatePath } from 'next/cache';
import { validateSupermarket } from '../utils';
import {
  createSupermarket,
  deleteSupermarket,
  getSupermarketById,
  getSupermarketByName,
  getSupermarkets,
  updateSupermarket,
} from '../db/api/supermarkets';
import { SupermarketErrors } from '../types';

export async function getSupermarketsAction() {
  const result = getSupermarkets();

  if ('error' in result) {
    return {
      ...result,
      message: 'Something went wrong during supermarkets fetching',
    };
  }

  return result;
}

export async function getSupermarketByIdAction(id: string) {
  const result = getSupermarketById(id);

  if ('error' in result) {
    return {
      ...result,
      message: 'Something went wrong during supermarket fetching',
    };
  }

  return result;
}

export async function createSupermarketAction(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  const errors = validateSupermarket(name, color);

  if (Object.keys(errors).length) return errors;

  const duplicated = getSupermarketByName(name);

  if ('error' in duplicated || duplicated.data?.id) {
    errors.name = 'A supermarket with this name already exists';
    return errors;
  }

  const result = createSupermarket(name, color);

  if ('error' in result) {
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
  const errors = validateSupermarket(name, color);

  if (Object.keys(errors).length) return errors;

  const duplicated = getSupermarketByName(name);

  if (
    'error' in duplicated ||
    (duplicated.data?.id && duplicated.data.id !== id)
  ) {
    errors.name = 'Already exist a supermarket with this name';
    return errors;
  }

  const result = updateSupermarket(id, name, color);

  if ('error' in result) {
    errors.result = 'Something went wrong during supermarket updating';
    return errors;
  }

  revalidatePath('/[locale]/supermarkets', 'page');

  return errors;
}

export async function deleteSupermarketAction(id: string) {
  const result = deleteSupermarket(id);

  if ('error' in result) {
    return {
      result: 'Something went wrong during supermarket deleting',
    } as SupermarketErrors;
  }

  revalidatePath('/[locale]/supermarkets', 'page');

  return {};
}
