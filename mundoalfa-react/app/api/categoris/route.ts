export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stmtForModel = db.prepare(`
  SELECT DISTINCT c.id, c.name
  FROM categories c
  JOIN products p ON p.category_id = c.id
  JOIN fitments f ON f.product_id = p.id
  JOIN models m   ON m.id = f.model_id
  WHERE m.name = ?
  ORDER BY c.name
`);
const stmtAll = db.prepare(`SELECT id, name FROM categories ORDER BY name`);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model");
  const rows = model ? stmtForModel.all(model) : stmtAll.all();
  return NextResponse.json(rows, { headers: { "Cache-Control": "no-store" } });
}
