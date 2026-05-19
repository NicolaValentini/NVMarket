import 'server-only';

import { getDb } from '../../db';
import { CartItem } from '../../types';
import { errorResult, successResult } from '../../utils';

// export function getCartItemsCompleteBySupermarket(supermarketId: string) {
//   try {
//     return successResult(
//       getDb()
//         .prepare<[string], CartItem>(
//           `
//         SELECT c.*, pi.brand, pi.price, pi.favorite, pu.name as product_name, t.name as tag_name, t.color as tag_color
//         FROM cart_items c
//         LEFT JOIN prices pi ON c.product_id = pi.product_id
//         LEFT JOIN products pu ON c.product_id = pu.id
//         LEFT JOIN product_tags pt ON c.product_id = pt.product_id
//         LEFT JOIN tags t ON pt.tag_id = t.id
//         `,
//         )
//         .all(supermarketId),
//     );
//   } catch (error) {
//     console.error('Failed to fetch cartItems', error);
//     return errorResult<CartItem[]>();
//   }
// }

export function getCartItemByProductId(productId: string) {
  try {
    return successResult(
      getDb()
        .prepare<
          [string],
          CartItem
        >('SELECT * FROM cart_items WHERE product_id = ?')
        .get(productId),
    );
  } catch (error) {
    console.error('Failed to fetch cartItem', error);
    return errorResult<CartItem | undefined>();
  }
}

export function createCartItem(productId: string) {
  try {
    getDb()
      .prepare<
        [string, string, number]
      >('INSERT INTO cart_items (id, product_id, quantity) VALUES (?, ?, ?)')
      .run(crypto.randomUUID(), productId, 1);

    return successResult();
  } catch (error) {
    console.error('Failed to create cartItem', error);
    return errorResult();
  }
}

export function increaseCartItem(productId: string) {
  try {
    const result = getCartItemByProductId(productId);

    if (result.isError) {
      result.message = 'Something went wrong during validation';
      return result;
    }

    if (result.data) {
      getDb()
        .prepare<[number, string]>(
          'UPDATE cart_items SET quantity = ? WHERE product_id = ?',
        )
        .run(result.data.quantity + 1, productId);

      return successResult();
    }

    return createCartItem(productId);
  } catch (error) {
    console.error('Failed to update cartItem', error);
    return errorResult();
  }
}

export function decreaseCartItem(productId: string) {
  try {
    const result = getCartItemByProductId(productId);

    if (result.isError) {
      result.message = 'Something went wrong during validation';
      return result;
    }

    if (result.data && result.data.quantity > 1) {
      getDb()
        .prepare<[number, string]>(
          'UPDATE cart_items SET quantity = ? WHERE product_id = ?',
        )
        .run(result.data.quantity - 1, productId);

      return successResult();
    }

    return deleteCartItem(productId);
  } catch (error) {
    console.error('Failed to update cartItem', error);
    return errorResult();
  }
}

export function deleteCartItem(id: string) {
  try {
    getDb().prepare<[string]>('DELETE FROM cart_items WHERE id = ?').run(id);

    return successResult();
  } catch (error) {
    console.error('Failed to delete cartItem', error);
    return errorResult();
  }
}
