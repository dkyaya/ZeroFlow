// app/api/workout/log/route.js
// Placeholder endpoint for future workout logging.

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Workout logging is not implemented yet." },
    { status: 501 }
  );
}
