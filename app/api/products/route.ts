import { NextResponse } from 'next/server';

import { getDb } from '../../../lib/db/connection';
import type { Product, ProductWithTags, Tag } from '@/lib';

export async function GET() {
  try {
    const db = getDb();
    const products = db
      .prepare('SELECT * FROM products ORDER BY name ASC')
      .all() as Product[];

    const result: ProductWithTags[] = products.map(product => {
      const tags = db
        .prepare(
          `SELECT t.* FROM tags t
                             JOIN product_tags pt ON pt.tag_id = t.id
           WHERE pt.product_id = ?
           ORDER BY t.name ASC`,
        )
        .all(product.id) as Tag[];

      return { ...product, tags };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, notes, tag_ids } = (await request.json()) as {
      name: string;
      notes?: string;
      tag_ids?: number[];
    };

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const db = getDb();

    const insertProduct = db.transaction(() => {
      const result = db
        .prepare('INSERT INTO products (name, notes) VALUES (?, ?)')
        .run(name.trim(), notes?.trim() ?? null);

      const productId = result.lastInsertRowid;

      if (tag_ids?.length) {
        const insertTag = db.prepare(
          'INSERT INTO product_tags (product_id, tag_id) VALUES (?, ?)',
        );
        for (const tagId of tag_ids) {
          insertTag.run(productId, tagId);
        }
      }

      return productId;
    });

    const productId = insertProduct();

    const product = db
      .prepare('SELECT * FROM products WHERE id = ?')
      .get(productId) as Product;

    const tags = db
      .prepare(
        `SELECT t.* FROM tags t
         JOIN product_tags pt ON pt.tag_id = t.id
         WHERE pt.product_id = ?
         ORDER BY t.name ASC`,
      )
      .all(productId) as Tag[];

    return NextResponse.json({ ...product, tags }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 },
    );
  }
}
