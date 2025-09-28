export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const stmt = db.prepare(`SELECT id, name FROM models ORDER BY name`);

export async function GET() {
  return NextResponse.json(stmt.all(), { headers: { "Cache-Control": "no-store" } });
}
