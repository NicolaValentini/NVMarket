'use server';

import { revalidatePath } from 'next/cache';

import { validateTag } from '../utils';
import {
  checkTagUsageById,
  createTag,
  deleteTag,
  getTagById,
  getTagByName,
  getTags,
  updateTag,
} from '../db';

export async function getTagsAction() {
  const result = getTags();

  if (result.isError) {
    result.message = 'Something went wrong during tags fetching';
    return result;
  }

  return result;
}

export async function getTagByIdAction(id: string) {
  const result = getTagById(id);

  if (result.isError) {
    result.message = 'Something went wrong during tag fetching';
    return result;
  }

  return result;
}

export async function createTagAction(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  const errors = validateTag(name, color);

  if (Object.keys(errors).length) return errors;

  const duplicated = getTagByName(name);

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id) {
    errors.name = 'Already exist a tag with this name';
    return errors;
  }

  const result = createTag(name, color);

  if (result.isError) {
    errors.result = 'Something went wrong during tag creation';
    return errors;
  }

  revalidatePath('/[locale]/tags', 'page');

  return {};
}

export async function updateTagAction(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;
  const errors = validateTag(name, color);

  if (Object.keys(errors).length) return errors;

  const duplicated = getTagByName(name);

  if (duplicated.isError) {
    errors.result = 'Something went wrong during validation';
    return errors;
  }

  if (duplicated.data?.id && duplicated.data.id !== id) {
    errors.name = 'Already exist a tag with this name';
    return errors;
  }

  const result = updateTag(id, name, color);

  if (result.isError) {
    errors.result = 'Something went wrong during tag updating';
    return errors;
  }

  revalidatePath('/[locale]/tags', 'page');

  return errors;
}

export async function deleteTagAction(id: string) {
  const result1 = checkTagUsageById(id);

  if (result1.isError) {
    result1.message = 'Something went wrong during validation';
    return result1;
  }

  if (result1.data?.length) {
    result1.isError = true;
    result1.message = 'Tag with products associated';
    return result1;
  }

  const result = deleteTag(id);

  if (result.isError) {
    result.message = 'Something went wrong during tag deleting';
    return result;
  }

  revalidatePath('/[locale]/tags', 'page');

  return result;
}
