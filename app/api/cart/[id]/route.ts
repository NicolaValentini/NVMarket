import { NextResponse } from 'next/server';

import type { CartItem } from '@/lib';
import { getDb } from '../../../../lib/db/connection';

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { quantity } = (await request.json()) as { quantity: number };

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'quantity must be at least 1' },
        { status: 400 },
      );
    }

    const db = getDb();

    const existing = db
      .prepare('SELECT * FROM cart_items WHERE id = ?')
      .get(Number(id)) as CartItem | undefined;

    if (!existing) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 },
      );
    }

    db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(
      quantity,
      Number(id),
    );

    const updated = db
      .prepare('SELECT * FROM cart_items WHERE id = ?')
      .get(Number(id)) as CartItem;

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update cart item' },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = getDb();

    const existing = db
      .prepare('SELECT * FROM cart_items WHERE id = ?')
      .get(Number(id)) as CartItem | undefined;

    if (!existing) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 },
      );
    }

    db.prepare('DELETE FROM cart_items WHERE id = ?').run(Number(id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete cart item' },
      { status: 500 },
    );
  }
}
