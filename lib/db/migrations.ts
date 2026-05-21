import 'server-only';
import { getDb } from './connection';

export function runMigrations(): void {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL DEFAULT '#4d9feb'
    );

    CREATE TABLE IF NOT EXISTS product_tags (
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (product_id, tag_id)
    );

    CREATE TABLE IF NOT EXISTS supermarkets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL DEFAULT '#4d9feb'
    );

    CREATE TABLE IF NOT EXISTS prices (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      supermarket_id TEXT NOT NULL REFERENCES supermarkets(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      yuka INTEGER NOT NULL DEFAULT 0,
      favorite BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL DEFAULT 1
    );
  `);
}
