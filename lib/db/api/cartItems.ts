import 'server-only';

import { getDb, getTagsByProductId } from '../../db';
import { errorResult, successResult } from '../../utils';
import {
  CartItem,
  CartItemsBySupermarket,
  CartItemUngrouped,
} from '../../types';

export function getCartItemsGroupedBySupermarket() {
  try {
    const rows = getDb()
      .prepare<[], CartItemUngrouped>(
        `SELECT
       ci.id,
       ci.quantity,
       ci.product_id,
       p.name AS productName,
       pr.name AS priceName,
       pr.price,
       pr.yuka,
       pr.favorite,
       s.id AS supermarketId,
       s.name AS supermarketName,
       s.color AS supermarketColor
       FROM cart_items ci
       LEFT JOIN products p ON ci.product_id = p.id
       LEFT JOIN prices pr ON ci.product_id = pr.product_id
       LEFT JOIN supermarkets s ON pr.supermarket_id = s.id
       ORDER BY s.name, p.name`,
      )
      .all();

    const map = new Map<string, CartItemsBySupermarket>();

    for (const {
      supermarketId,
      supermarketName,
      supermarketColor,
      ...rest
    } of rows) {
      if (!map.has(supermarketId)) {
        map.set(supermarketId, {
          supermarket: {
            id: supermarketId,
            name: supermarketName,
            color: supermarketColor,
          },
          items: [],
          total: 0,
        });
      }

      const group = map.get(supermarketId)!;

      group.items.push({
        ...rest,
        tags: getTagsByProductId(rest.product_id)?.data ?? [],
      });
      group.total += rest.price * rest.quantity;
    }

    return successResult(Array.from(map.values()));
  } catch (error) {
    console.error('Failed to fetch cart items', error);
    return errorResult<CartItemsBySupermarket[]>();
  }
}

export function getCartItemByProductId(productId: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], CartItem>(
          `SELECT *
           FROM cart_items
           WHERE product_id = ?`,
        )
        .get(productId),
    );
  } catch (error) {
    console.error('Failed to fetch cart item', error);
    return errorResult<CartItem | undefined>();
  }
}

export function createCartItem(productId: string) {
  try {
    getDb()
      .prepare<[string, string, number]>(
        `INSERT INTO cart_items (id, product_id, quantity)
         VALUES (?, ?, ?)`,
      )
      .run(crypto.randomUUID(), productId, 1);

    return successResult();
  } catch (error) {
    console.error('Failed to create cart item', error);
    return errorResult();
  }
}

export function increaseCartItem(productId: string) {
  try {
    const result = getCartItemByProductId(productId);

    if (result.isError) {
      throw new Error('Failed to fetch cart item by product');
    }

    if (result.data) {
      getDb()
        .prepare<[number, string]>(
          `UPDATE cart_items
           SET quantity = ?
           WHERE product_id = ?`,
        )
        .run(result.data.quantity + 1, productId);

      return successResult();
    }

    return createCartItem(productId);
  } catch (error) {
    console.error('Failed to update cart item', error);
    return errorResult();
  }
}

export function decreaseCartItem(productId: string) {
  try {
    const result = getCartItemByProductId(productId);

    if (result.isError || !result.data) {
      throw new Error('Failed to fetch cart item by product');
    }

    if (result.data.quantity > 1) {
      getDb()
        .prepare<[number, string]>(
          `UPDATE cart_items
           SET quantity = ?
           WHERE product_id = ?`,
        )
        .run(result.data.quantity - 1, productId);

      return successResult();
    }

    return deleteCartItem(result.data.id);
  } catch (error) {
    console.error('Failed to update cart item', error);
    return errorResult();
  }
}

export function deleteCartItem(id: string) {
  try {
    getDb()
      .prepare<[string]>(
        `DELETE
         FROM cart_items
         WHERE id = ?`,
      )
      .run(id);

    return successResult();
  } catch (error) {
    console.error('Failed to delete cart item', error);
    return errorResult();
  }
}

export function deleteCartItemByProductId(productid: string) {
  try {
    getDb()
      .prepare<[string]>(
        `DELETE
         FROM cart_items
         WHERE product_id = ?`,
      )
      .run(productid);

    return successResult();
  } catch (error) {
    console.error('Failed to delete cart item', error);
    return errorResult();
  }
}
