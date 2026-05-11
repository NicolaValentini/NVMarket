import { NextResponse } from 'next/server';

import { getDb } from '../../../lib/db';
import type { Supermarket } from '@/lib';

export async function GET() {
  try {
    const db = getDb();
    const supermarkets = db
      .prepare('SELECT * FROM supermarkets ORDER BY name ASC')
      .all() as Supermarket[];

    return NextResponse.json(supermarkets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch supermarkets' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name } = (await request.json()) as { name: string };

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const db = getDb();
    const result = db
      .prepare('INSERT INTO supermarkets (name) VALUES (?)')
      .run(name.trim());

    const supermarket = db
      .prepare('SELECT * FROM supermarkets WHERE id = ?')
      .get(result.lastInsertRowid) as Supermarket;

    return NextResponse.json(supermarket, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create supermarket' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = (await request.json()) as { id: number };

    if (!id) {
      return NextResponse.json({ error: 'Id is required' }, { status: 400 });
    }

    const db = getDb();
    db.prepare('DELETE FROM supermarkets WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete supermarket' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name } = (await request.json()) as {
      id: number;
      name: string;
    };

    if (!id || !name?.trim()) {
      return NextResponse.json(
        { error: 'Id and name are required' },
        { status: 400 },
      );
    }

    const db = getDb();
    db.prepare('UPDATE supermarkets SET name = ? WHERE id = ?').run(
      name.trim(),
      id,
    );

    const supermarket = db
      .prepare('SELECT * FROM supermarkets WHERE id = ?')
      .get(id) as Supermarket;

    return NextResponse.json(supermarket);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update supermarket' },
      { status: 500 },
    );
  }
}
