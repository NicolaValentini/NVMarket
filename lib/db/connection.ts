import 'server-only';

import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const DB_PATH = path.join(process.cwd(), 'data', 'nvmarket.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }

  return db;
}
