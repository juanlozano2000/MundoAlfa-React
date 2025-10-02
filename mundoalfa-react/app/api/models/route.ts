export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stmt = db.prepare(`SELECT id, name FROM models ORDER BY name`);

export async function GET() {
  const rows = stmt.all();
  return NextResponse.json(rows, { headers: { "Cache-Control": "no-store" } });
}
