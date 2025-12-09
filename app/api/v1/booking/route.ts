import { NextRequest } from "next/server";
import { getPool } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const pool = getPool();
  return new Response(JSON.stringify({ error: "testingGET" }), {
    status: 500,
  });
}
