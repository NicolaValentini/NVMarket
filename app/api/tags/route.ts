import { NextResponse } from 'next/server';

import type { Tag } from '@/lib';
import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = getDb();
    const tags = db
      .prepare('SELECT * FROM tags ORDER BY name ASC')
      .all() as Tag[];

    return NextResponse.json(tags);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, color } = (await request.json()) as {
      name: string;
      color: string;
    };

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const db = getDb();
    const result = db
      .prepare('INSERT INTO tags (name, color) VALUES (?, ?)')
      .run(name.trim(), color ?? '#4d9feb');

    const tag = db
      .prepare('SELECT * FROM tags WHERE id = ?')
      .get(result.lastInsertRowid) as Tag;

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create tag' },
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
    db.prepare('DELETE FROM tags WHERE id = ?').run(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, color } = (await request.json()) as {
      id: number;
      name: string;
      color: string;
    };

    if (!id || !name?.trim()) {
      return NextResponse.json(
        { error: 'Id and name are required' },
        { status: 400 },
      );
    }

    const db = getDb();
    db.prepare('UPDATE tags SET name = ?, color = ? WHERE id = ?').run(
      name.trim(),
      color,
      id,
    );

    const tag = db.prepare('SELECT * FROM tags WHERE id = ?').get(id) as Tag;

    return NextResponse.json(tag);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update tag' },
      { status: 500 },
    );
  }
}
