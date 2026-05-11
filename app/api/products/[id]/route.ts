import { NextResponse } from 'next/server';

import { getDb } from '../../../../lib/db/connection';
import type { Product, ProductWithTags, Tag } from '@/lib';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = getDb();

    const product = db
      .prepare('SELECT * FROM products WHERE id = ?')
      .get(Number(id)) as Product | undefined;

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const tags = db
      .prepare(
        `SELECT t.* FROM tags t
         JOIN product_tags pt ON pt.tag_id = t.id
         WHERE pt.product_id = ?
         ORDER BY t.name ASC`,
      )
      .all(product.id) as Tag[];

    return NextResponse.json({ ...product, tags } as ProductWithTags);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { name, notes, tag_ids } = (await request.json()) as {
      name: string;
      notes?: string;
      tag_ids?: number[];
    };

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const db = getDb();

    const updateProduct = db.transaction(() => {
      db.prepare('UPDATE products SET name = ?, notes = ? WHERE id = ?').run(
        name.trim(),
        notes?.trim() ?? null,
        Number(id),
      );

      db.prepare('DELETE FROM product_tags WHERE product_id = ?').run(
        Number(id),
      );

      if (tag_ids?.length) {
        const insertTag = db.prepare(
          'INSERT INTO product_tags (product_id, tag_id) VALUES (?, ?)',
        );
        for (const tagId of tag_ids) {
          insertTag.run(Number(id), tagId);
        }
      }
    });

    updateProduct();

    const product = db
      .prepare('SELECT * FROM products WHERE id = ?')
      .get(Number(id)) as Product;

    const tags = db
      .prepare(
        `SELECT t.* FROM tags t
         JOIN product_tags pt ON pt.tag_id = t.id
         WHERE pt.product_id = ?
         ORDER BY t.name ASC`,
      )
      .all(Number(id)) as Tag[];

    return NextResponse.json({ ...product, tags } as ProductWithTags);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = getDb();

    const product = db
      .prepare('SELECT * FROM products WHERE id = ?')
      .get(Number(id)) as Product | undefined;

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 },
    );
  }
}
