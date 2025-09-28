// app/api/products/route.ts
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stmt = db.prepare(`
  SELECT p.id, p.base_name, p.brand, p.image, p.sku,
         MIN(f.price) AS min_price, MAX(f.price) AS max_price,
         COUNT(*) AS variants
  FROM products p
  JOIN categories c ON c.id = p.category_id
  JOIN fitments f   ON f.product_id = p.id
  JOIN models m     ON m.id = f.model_id
  WHERE (? IS NULL OR m.name = ?)
    AND (? IS NULL OR c.name = ?)
    AND (? IS NULL OR p.base_name LIKE ? OR p.brand LIKE ?)
  GROUP BY p.id
  ORDER BY p.base_name
`);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const model = searchParams.get("model");
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const like = q ? `%${q}%` : null;

  const rows = stmt.all(
    model, model,
    category, category,
    q, like, like
  );

  return NextResponse.json(rows, { headers: { "Cache-Control": "no-store" } });
}
