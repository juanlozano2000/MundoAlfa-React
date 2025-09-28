// lib/db.ts
import Database, { type Database as BetterDb } from "better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "data", "mundoAlfa.db");
export const db: BetterDb = new Database(dbPath, { fileMustExist: true, readonly: true });
