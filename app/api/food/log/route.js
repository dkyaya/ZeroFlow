// app/api/food/log/route.js
// Adds a new food log entry for the current day.
// FPV uses a placeholder userId: 1.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { name, calories } = await request.json();

    // Placeholder user (because FPV does not include full auth)
    const USER_ID = 1;

    // Create a food log entry
    const log = await prisma.foodLog.create({
      data: {
        name,
        calories: Number(calories),
        userId: USER_ID,
      },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (err) {
    console.error("Food log error:", err);
    return NextResponse.json(
      { error: "Failed to log food" },
      { status: 500 }
    );
  }
}
