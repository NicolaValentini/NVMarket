import { TagFormWithFetch } from './TagFormWithFetch';
import { TagForm as TagFormBase } from './TagForm';

export const TagForm = Object.assign(TagFormBase, {
  WithFetch: TagFormWithFetch,
});
