import 'server-only';

import { getDb } from '../../db';
import { Supermarket } from '../../types';
import { errorResult, successResult } from '../../utils';

export function getSupermarkets() {
  try {
    return successResult(
      getDb()
        .prepare<[], Supermarket>(
          `SELECT *
           FROM supermarkets
           ORDER BY name ASC`,
        )
        .all(),
    );
  } catch (error) {
    console.error('Failed to fetch supermarkets', error);
    return errorResult<Supermarket[]>();
  }
}

export function getSupermarketById(id: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], Supermarket>(
          `SELECT *
           FROM supermarkets
           WHERE id = ?`,
        )
        .get(id),
    );
  } catch (error) {
    console.error('Failed to fetch supermarket', error);
    return errorResult<Supermarket | undefined>();
  }
}

export function getSupermarketByName(name: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], Supermarket>(
          `SELECT *
           FROM supermarkets
           WHERE name = ?`,
        )
        .get(name.trim().toUpperCase()),
    );
  } catch (error) {
    console.error('Failed to fetch supermarket', error);
    return errorResult<Supermarket | undefined>();
  }
}

export function createSupermarket(name: string, color: string) {
  try {
    getDb()
      .prepare<[string, string, string]>(
        `INSERT INTO supermarkets (id, name, color)
         VALUES (?, ?, ?)`,
      )
      .run(crypto.randomUUID(), name.trim().toUpperCase(), color);

    return successResult();
  } catch (error) {
    console.error('Failed to create supermarket', error);
    return errorResult();
  }
}

export function updateSupermarket(id: string, name: string, color: string) {
  try {
    getDb()
      .prepare<[string, string, string]>(
        `UPDATE supermarkets
         SET name = ?, color = ?
         WHERE id = ?`,
      )
      .run(name.trim().toUpperCase(), color, id);

    return successResult();
  } catch (error) {
    console.error('Failed to update supermarket', error);
    return errorResult();
  }
}

export function deleteSupermarket(id: string) {
  try {
    getDb()
      .prepare<[string]>(
        `DELETE
         FROM supermarkets
         WHERE id = ?`,
      )
      .run(id);

    return successResult();
  } catch (error) {
    console.error('Failed to delete supermarket', error);
    return errorResult();
  }
}
