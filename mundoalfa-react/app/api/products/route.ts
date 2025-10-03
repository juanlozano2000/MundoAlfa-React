export const runtime = "nodejs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

type ProductRow = {
  id: number;
  base_name: string;
  brand: string | null;
  image: string | null;
  sku: string | null;
  category: string | null;
  price: number | null;
  currency: string | null;
  model: string | null;
};

const baseSelect = `
  SELECT
    p.id,
    p.base_name,
    p.brand,
    p.image,
    p.sku,
    c.name AS category,
    p.price,
    COALESCE(p.currency, 'ARS') AS currency,
    m.name AS model
  FROM products p
  LEFT JOIN categories c ON c.id = p.category_id
  LEFT JOIN models     m ON m.id = p.model_id
`;

const orderBy = ` ORDER BY p.base_name `;

const stmtAll = db.prepare(baseSelect + orderBy);
const stmtByModel = db.prepare(baseSelect + ` WHERE m.name = ? COLLATE NOCASE ` + orderBy);
const stmtByModelAndCategory = db.prepare(baseSelect + ` WHERE m.name = ? COLLATE NOCASE AND c.id = ? ` + orderBy);
const stmtByCategoryOnly = db.prepare(baseSelect + ` WHERE c.id = ? ` + orderBy);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawModel = (searchParams.get("model") || "").trim();
  const categoryId = searchParams.get("category");
  const q = (searchParams.get("q") || "").trim();

  const model =
    rawModel === "" || rawModel.toLowerCase() === "(todos los modelos)"
      ? null
      : rawModel;

  let rows: ProductRow[];
  if (model && categoryId) rows = stmtByModelAndCategory.all(model, Number(categoryId)) as ProductRow[];
  else if (model)          rows = stmtByModel.all(model) as ProductRow[];
  else if (categoryId)     rows = stmtByCategoryOnly.all(Number(categoryId)) as ProductRow[];
  else                     rows = stmtAll.all() as ProductRow[];

  if (q) {
    const Q = q.toLowerCase();
    const norm = (s: string | null) => (s ?? "").toLowerCase();
    rows = rows.filter((r: ProductRow) =>
      r.base_name.toLowerCase().includes(Q) ||
      norm(r.brand).includes(Q) ||
      norm(r.sku).includes(Q)
    );
  }

  return NextResponse.json(rows, { headers: { "Cache-Control": "no-store" } });
}
