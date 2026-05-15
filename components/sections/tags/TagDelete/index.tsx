import { TagDelete as TagDeleteBase } from './TagDelete';
import { TagDeleteWithFetch } from './TagDeleteWithFetch';

export const TagDelete = Object.assign(TagDeleteBase, {
  WithFetch: TagDeleteWithFetch,
});
