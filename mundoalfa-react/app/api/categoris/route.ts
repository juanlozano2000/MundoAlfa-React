export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stmtForModel = db.prepare(`
  SELECT c.id, c.name
  FROM categories c
  WHERE EXISTS (
    SELECT 1
    FROM products p
    JOIN models m ON m.id = p.model_id
    WHERE p.category_id = c.id
      AND m.name = ? COLLATE NOCASE
  )
  ORDER BY c.name
`);

const stmtAll = db.prepare(`
  SELECT id, name
  FROM categories
  ORDER BY name
`);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawModel = (searchParams.get("model") || "").trim();
  const model = rawModel === "" || rawModel.toLowerCase() === "(todos los modelos)"
    ? null
    : rawModel;

  const rows = model ? stmtForModel.all(model) : stmtAll.all();
  return NextResponse.json(rows, { headers: { "Cache-Control": "no-store" } });
}
