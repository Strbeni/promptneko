import { NextResponse } from "next/server";

export async function POST() {
  // Purged: Security override endpoints are permanently removed in production-ready build.
  return NextResponse.json({ error: "Endpoint permanently removed for production security" }, { status: 403 });
}
