import { NextResponse } from 'next/server';

import { getDb } from '../../../lib/db/connection';
import type { PriceWithDetails } from '@/lib';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');
    const supermarketId = searchParams.get('supermarket_id');

    const db = getDb();

    let query = `
      SELECT
        p.*,
        pr.name AS product_name,
        s.name AS supermarket_name
      FROM prices p
      JOIN products pr ON pr.id = p.product_id
      JOIN supermarkets s ON s.id = p.supermarket_id
    `;

    const conditions: string[] = [];
    const values: number[] = [];

    if (productId) {
      conditions.push('p.product_id = ?');
      values.push(Number(productId));
    }

    if (supermarketId) {
      conditions.push('p.supermarket_id = ?');
      values.push(Number(supermarketId));
    }

    if (conditions.length) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY pr.name ASC, p.price ASC';

    const prices = db.prepare(query).all(...values) as PriceWithDetails[];

    return NextResponse.json(prices);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { product_id, supermarket_id, brand, price, notes } =
      (await request.json()) as {
        product_id: number;
        supermarket_id: number;
        brand?: string;
        price: number;
        notes?: string;
      };

    if (!product_id || !supermarket_id || price == null) {
      return NextResponse.json(
        { error: 'product_id, supermarket_id and price are required' },
        { status: 400 },
      );
    }

    const db = getDb();

    const result = db
      .prepare(
        `INSERT INTO prices (product_id, supermarket_id, brand, price, notes)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .run(
        product_id,
        supermarket_id,
        brand?.trim() ?? null,
        price,
        notes?.trim() ?? null,
      );

    const newPrice = db
      .prepare(
        `SELECT
          p.*,
          pr.name AS product_name,
          s.name AS supermarket_name
         FROM prices p
         JOIN products pr ON pr.id = p.product_id
         JOIN supermarkets s ON s.id = p.supermarket_id
         WHERE p.id = ?`,
      )
      .get(result.lastInsertRowid) as PriceWithDetails;

    return NextResponse.json(newPrice, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create price' },
      { status: 500 },
    );
  }
}
