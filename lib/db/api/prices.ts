import 'server-only';

import { getDb } from '../../db';
import { errorResult, successResult } from '../../utils';
import { Price, PriceWithSupermarket } from '../../types';

export function getPricesWithSupermarketByProductId(id: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], PriceWithSupermarket>(
          `SELECT DISTINCT p.*, s.name AS supermarketName, s.color AS supermarketColor
           FROM prices p
           LEFT JOIN supermarkets s ON p.supermarket_id = s.id
           WHERE product_id = ?
           ORDER BY p.name ASC`,
        )
        .all(id),
    );
  } catch (error) {
    console.error('Failed to fetch prices', error);
    return errorResult<PriceWithSupermarket[]>();
  }
}

export function getPriceById(id: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], Price>(
          `SELECT *
           FROM prices
           WHERE id = ?`,
        )
        .get(id),
    );
  } catch (error) {
    console.error('Failed to fetch prices', error);
    return errorResult<Price | undefined>();
  }
}

export function getPriceByNameAndProductAndSupermarket(
  name: string,
  productId: string,
  supermarketId: string,
) {
  try {
    return successResult(
      getDb()
        .prepare<[string, string, string], Price>(
          `SELECT *
           FROM prices
           WHERE name = ? AND product_id = ? AND supermarket_id = ?`,
        )
        .get(name.trim().toUpperCase(), productId, supermarketId),
    );
  } catch (error) {
    console.error('Failed to fetch price', error);
    return errorResult<Price | undefined>();
  }
}

export function createPrice(
  productId: string,
  supermarketId: string,
  name: string,
  price: number,
  yuka: number,
) {
  try {
    getDb()
      .prepare<[string, string, string, string, number, number, number]>(
        `INSERT INTO prices (id, product_id, supermarket_id, name, price, yuka, favorite)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        crypto.randomUUID(),
        productId,
        supermarketId,
        name.trim().toUpperCase(),
        price,
        yuka,
        Number(false),
      );

    return successResult();
  } catch (error) {
    console.error('Failed to create price', error);
    return errorResult();
  }
}

export function updatePrice(
  id: string,
  productId: string,
  supermarketId: string,
  name: string,
  price: number,
  yuka: number,
) {
  try {
    getDb()
      .prepare<[string, string, string, number, number, string]>(
        `UPDATE prices
         SET product_id = ?, supermarket_id = ?, name = ?, price = ?, yuka = ?
         WHERE id = ?`,
      )
      .run(
        productId,
        supermarketId,
        name.trim().toUpperCase(),
        price,
        yuka,
        id,
      );

    return successResult();
  } catch (error) {
    console.error('Failed to update price', error);
    return errorResult();
  }
}

export function setFavoritePrice(id: string, favorite: boolean) {
  try {
    getDb()
      .prepare<[number, string]>(
        `UPDATE prices
         SET favorite = ?
         WHERE id = ?`,
      )
      .run(Number(favorite), id);

    return successResult();
  } catch (error) {
    console.error('Failed to set favorite price', error);
    return errorResult();
  }
}

export function deletePrice(id: string) {
  try {
    getDb()
      .prepare<[string]>(
        `DELETE
         FROM prices
         WHERE id = ?`,
      )
      .run(id);

    return successResult();
  } catch (error) {
    console.error('Failed to delete price', error);
    return errorResult();
  }
}
