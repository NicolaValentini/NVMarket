import 'server-only';

import { getDb, getTagsByProductId } from '../../db';
import { errorResult, successResult } from '../../utils';
import {
  Product,
  ProductWithQuantity,
  ProductWithQuantityAndTags,
  ProductWithTag,
} from '../../types';

export function getProductsWithQuantity() {
  try {
    return successResult(
      getDb()
        .prepare<[], ProductWithQuantity>(
          `SELECT DISTINCT p.*, c.quantity AS quantity
           FROM products p
           LEFT JOIN cart_items c ON p.id = c.product_id
           ORDER BY p.name ASC`,
        )
        .all(),
    );
  } catch (error) {
    console.error('Failed to fetch products', error);
    return errorResult<ProductWithQuantity[]>();
  }
}

export function getProductsWithQuantityAndTags() {
  try {
    const result = getProductsWithQuantity();

    if (result.isError) {
      throw new Error('Failed to fetch products with quantity');
    }

    return successResult(
      result.data?.map(
        (product): ProductWithQuantityAndTags => ({
          ...product,
          tags: getTagsByProductId(product.id)?.data ?? [],
        }),
      ) ?? [],
    );
  } catch (error) {
    console.error('Failed to fetch products', error);
    return errorResult<ProductWithQuantityAndTags[]>();
  }
}

export function getProductsWithQuantityAndTagsBySupermarket(
  supermarketId: string,
) {
  try {
    const result = successResult(
      getDb()
        .prepare<[string], ProductWithQuantity>(
          `SELECT DISTINCT p.*, c.quantity AS quantity
           FROM products p
           LEFT JOIN cart_items c ON p.id = c.product_id
           INNER JOIN prices pr ON pr.product_id = p.id
           WHERE pr.supermarket_id = ?
           ORDER BY p.name ASC`,
        )
        .all(supermarketId),
    );

    if (result.isError) throw new Error('Failed to fetch filtered products');

    return successResult(
      result.data?.map(
        (product): ProductWithQuantityAndTags => ({
          ...product,
          tags: getTagsByProductId(product.id)?.data ?? [],
        }),
      ) ?? [],
    );
  } catch (error) {
    console.error('Failed to fetch products by supermarket', error);
    return errorResult<ProductWithQuantityAndTags[]>();
  }
}

export function getProductById(id: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], Product>(
          `SELECT *
           FROM products
           WHERE id = ?`,
        )
        .get(id),
    );
  } catch (error) {
    console.error('Failed to fetch product', error);
    return errorResult<Product | undefined>();
  }
}

export function getProductWithTagsById(id: string) {
  try {
    const result = getProductById(id);

    if (result.isError) {
      throw new Error('Failed to fetch product without tags');
    }

    if (!result.data) {
      return successResult(undefined);
    }

    return successResult({
      ...result.data,
      tags: getTagsByProductId(result.data.id)?.data ?? [],
    });
  } catch (error) {
    console.error('Failed to fetch product', error);
    return errorResult<ProductWithTag | undefined>();
  }
}

export function getProductByName(name: string) {
  try {
    return successResult(
      getDb()
        .prepare<[string], Product>(
          `SELECT *
           FROM products
           WHERE name = ?`,
        )
        .get(name.trim().toUpperCase()),
    );
  } catch (error) {
    console.error('Failed to fetch product', error);
    return errorResult<Product | undefined>();
  }
}

export function createProduct(name: string, tags: string[]) {
  try {
    const id = crypto.randomUUID();

    const insertProduct = getDb().prepare<[string, string]>(
      `INSERT INTO products (id, name)
       VALUES (?, ?)`,
    );

    const insertTag = getDb().prepare<[string, string]>(
      `INSERT INTO product_tags (product_id, tag_id)
       VALUES (?, ?)`,
    );

    const transaction = getDb().transaction(() => {
      insertProduct.run(id, name.trim().toUpperCase());
      for (const tagId of tags) {
        insertTag.run(id, tagId);
      }
    });

    transaction();

    return successResult();
  } catch (error) {
    console.error('Failed to create product', error);
    return errorResult();
  }
}

export function updateProduct(id: string, name: string, tags: string[]) {
  try {
    const updateProduct = getDb().prepare<[string, string]>(
      `UPDATE products
       SET name = ?
       WHERE id = ?`,
    );

    const deleteTags = getDb().prepare<[string]>(
      `DELETE
       FROM product_tags
       WHERE product_id = ?`,
    );

    const insertTag = getDb().prepare<[string, string]>(
      `INSERT INTO product_tags (product_id, tag_id)
       VALUES (?, ?)`,
    );

    const transaction = getDb().transaction(() => {
      updateProduct.run(name.trim().toUpperCase(), id);
      deleteTags.run(id);
      for (const tagId of tags) {
        insertTag.run(id, tagId);
      }
    });

    transaction();

    return successResult();
  } catch (error) {
    console.error('Failed to update product', error);
    return errorResult();
  }
}

export function deleteProduct(id: string) {
  try {
    getDb()
      .prepare<[string]>(
        `DELETE
         FROM products
         WHERE id = ?`,
      )
      .run(id);

    return successResult();
  } catch (error) {
    console.error('Failed to delete product', error);
    return errorResult();
  }
}
