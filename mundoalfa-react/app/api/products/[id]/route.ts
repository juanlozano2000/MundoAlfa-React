export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stmt = db.prepare(`
  SELECT
    p.*,
    c.name AS category,
    m.name AS model,
    COALESCE(p.currency, 'ARS') AS currency
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
  LEFT JOIN models     m ON m.id = p.model_id
  WHERE p.id = ?
`);

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = stmt.get(Number(id));
  return NextResponse.json({ product: row }, { headers: { "Cache-Control": "no-store" } });
}
