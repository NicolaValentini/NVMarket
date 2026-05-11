import { NextResponse } from 'next/server';

import type { Price, PriceWithDetails } from '@/lib';
import { getDb } from '../../../../lib/db/connection';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { brand, price, notes, supermarket_id } = (await request.json()) as {
      brand?: string;
      price: number;
      notes?: string;
      supermarket_id: number;
    };

    if (price == null || !supermarket_id) {
      return NextResponse.json(
        { error: 'price and supermarket_id are required' },
        { status: 400 },
      );
    }

    const db = getDb();

    const existing = db
      .prepare('SELECT * FROM prices WHERE id = ?')
      .get(Number(id)) as Price | undefined;

    if (!existing) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 });
    }

    db.prepare(
      `UPDATE prices
       SET supermarket_id = ?, brand = ?, price = ?, notes = ?,
           updated_at = datetime('now')
       WHERE id = ?`,
    ).run(
      supermarket_id,
      brand?.trim() ?? null,
      price,
      notes?.trim() ?? null,
      Number(id),
    );

    const updated = db
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
      .get(Number(id)) as PriceWithDetails;

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update price' },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = getDb();

    const existing = db
      .prepare('SELECT * FROM prices WHERE id = ?')
      .get(Number(id)) as Price | undefined;

    if (!existing) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 });
    }

    db.prepare('DELETE FROM prices WHERE id = ?').run(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete price' },
      { status: 500 },
    );
  }
}
