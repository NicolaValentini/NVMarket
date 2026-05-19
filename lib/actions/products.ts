'use server';

import { revalidatePath } from 'next/cache';

import { validateProduct } from '../utils';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductByName,
  getProductsWithQuantity,
  getProductWithTagsById,
  updateProduct,
} from '../db';

export async function getProductsWithQuantityAction() {
  const result = getProductsWithQuantity();

  if (result.isError) {
    result.message = 'Something went wrong during products fetching';
    return result;
  }

  return result;
}

export async function getProductByIdAction(id: string) {
  const result = getProductById(id);

  if (result.isError) {
    result.message = 'Something went wrong during product fetching';
    return result;
  }

  return result;
}

export async function getProductWithTagsByIdAction(id: string) {
  const result = getProductWithTagsById(id);

  if (result.isError) {
    result.message = 'Something went wrong during product fetching';
    return result;
  }

  return result;
}

export async function createProductAction(formData: FormData) {
  const name = formData.get('name') as string;
  const tags = (formData.get('tags') as string)?.split(',')?.filter(Boolean);

  const errors = validateProduct(name, tags);

  if (Object.keys(errors).length) return errors;

  const duplicated = getProductByName(name);

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id) {
    errors.name = 'Already exist a product with this name';
    return errors;
  }

  const result = createProduct(name, tags);

  if (result.isError) {
    errors.result = 'Something went wrong during product creation';
    return errors;
  }

  revalidatePath('/[locale]/products', 'page');

  return {};
}

export async function updateProductAction(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const tags = (formData.get('tags') as string)?.split(',')?.filter(Boolean);
  const errors = validateProduct(name, tags);

  if (Object.keys(errors).length) return errors;

  const duplicated = getProductByName(name);

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id && duplicated.data.id !== id) {
    errors.name = 'Already exist a product with this name';
    return errors;
  }

  const result = updateProduct(id, name, tags);

  if (result.isError) {
    errors.result = 'Something went wrong during product updating';
    return errors;
  }

  revalidatePath('/[locale]/products', 'page');

  return errors;
}

export async function deleteProductAction(id: string) {
  const result = deleteProduct(id);

  if (result.isError) {
    result.message = 'Something went wrong during product deleting';
    return result;
  }

  revalidatePath('/[locale]/products', 'page');

  return result;
}
