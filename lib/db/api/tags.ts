import 'server-only';

import { getDb } from '../../db';
import { Tag } from '../../types';
import { errorResult, successResult } from '../../utils';

export function getTags() {
  try {
    return successResult(
      getDb().prepare<[], Tag>('SELECT * FROM tags ORDER BY name ASC').all(),
    );
  } catch (error) {
    console.error('Failed to fetch tags', error);
    return errorResult<Tag[]>();
  }
}

export function getTagById(id: string) {
  try {
    return successResult(
      getDb().prepare<[string], Tag>('SELECT * FROM tags WHERE id = ?').get(id),
    );
  } catch (error) {
    console.error('Failed to fetch tag', error);
    return errorResult<Tag | undefined>();
  }
}

export function getTagByName(name: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], Tag>('SELECT * FROM tags WHERE name = ?')
        .get(name.trim().toUpperCase()),
    );
  } catch (error) {
    console.error('Failed to fetch tag', error);
    return errorResult<Tag | undefined>();
  }
}

export function createTag(name: string, color: string) {
  try {
    getDb()
      .prepare<
        [string, string, string]
      >('INSERT INTO tags (id, name, color) VALUES (?, ?, ?)')
      .run(crypto.randomUUID(), name.trim().toUpperCase(), color);

    return successResult();
  } catch (error) {
    console.error('Failed to create tag', error);
    return errorResult();
  }
}

export function updateTag(id: string, name: string, color: string) {
  try {
    getDb()
      .prepare<
        [string, string, string]
      >('UPDATE tags SET name = ?, color = ? WHERE id = ?')
      .run(name.trim().toUpperCase(), color, id);

    return successResult();
  } catch (error) {
    console.error('Failed to update tag', error);
    return errorResult();
  }
}

export function deleteTag(id: string) {
  try {
    getDb().prepare<[string]>('DELETE FROM tags WHERE id = ?').run(id);

    return successResult();
  } catch (error) {
    console.error('Failed to delete tag', error);
    return errorResult();
  }
}
