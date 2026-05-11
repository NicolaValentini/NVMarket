import { NextResponse } from 'next/server';

import { getDb } from '../../../lib/db/connection';
import type { CartItem, CartItemWithDetails } from '@/lib';

export async function GET() {
  try {
    const db = getDb();

    const items = db
      .prepare(
        `SELECT
          ci.*,
          p.name AS product_name,
          MIN(pr.price) AS best_price,
          s.name AS best_supermarket
         FROM cart_items ci
         JOIN products p ON p.id = ci.product_id
         LEFT JOIN prices pr ON pr.product_id = ci.product_id
         LEFT JOIN supermarkets s ON s.id = pr.supermarket_id
           AND pr.price = (
             SELECT MIN(price) FROM prices WHERE product_id = ci.product_id
           )
         GROUP BY ci.id
         ORDER BY p.name ASC`,
      )
      .all() as CartItemWithDetails[];

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { product_id, quantity } = (await request.json()) as {
      product_id: number;
      quantity?: number;
    };

    if (!product_id) {
      return NextResponse.json(
        { error: 'product_id is required' },
        { status: 400 },
      );
    }

    const db = getDb();

    // Se il prodotto è già nel carrello incrementa la quantità
    const existing = db
      .prepare('SELECT * FROM cart_items WHERE product_id = ?')
      .get(product_id) as CartItem | undefined;

    if (existing) {
      db.prepare(
        'UPDATE cart_items SET quantity = quantity + ? WHERE product_id = ?',
      ).run(quantity ?? 1, product_id);
    } else {
      db.prepare(
        'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
      ).run(product_id, quantity ?? 1);
    }

    const item = db
      .prepare(
        `SELECT
          ci.*,
          p.name AS product_name,
          MIN(pr.price) AS best_price,
          s.name AS best_supermarket
         FROM cart_items ci
         JOIN products p ON p.id = ci.product_id
         LEFT JOIN prices pr ON pr.product_id = ci.product_id
         LEFT JOIN supermarkets s ON s.id = pr.supermarket_id
           AND pr.price = (
             SELECT MIN(price) FROM prices WHERE product_id = ci.product_id
           )
         WHERE ci.product_id = ?
         GROUP BY ci.id`,
      )
      .get(product_id) as CartItemWithDetails;

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const db = getDb();
    db.prepare('DELETE FROM cart_items').run();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 },
    );
  }
}
