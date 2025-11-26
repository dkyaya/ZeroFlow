// app/api/food/log/route.js
// Adds a new food log entry for the current day.
// FPV uses a placeholder userId: 1 because full auth is not implemented.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { name, calories } = await request.json();

    // Basic validation for FPV
    if (!name || !calories) {
      return NextResponse.json(
        { error: "Food name and calories are required" },
        { status: 400 }
      );
    }

    const cal = Number(calories);
    if (isNaN(cal) || cal <= 0) {
      return NextResponse.json(
        { error: "Calories must be a positive number" },
        { status: 400 }
      );
    }

    // Placeholder user (FPV simplification)
    const USER_ID = 1;

    const log = await prisma.foodLog.create({
      data: {
        name,
        calories: cal,
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
