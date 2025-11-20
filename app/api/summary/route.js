// app/api/summary/route.js
// Returns the user's daily nutrition summary.
// This is used by the dashboard to show calories eaten, target calories, and foods logged today.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Utility: get today's date boundaries (midnight to midnight)
function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export async function GET() {
  try {
    // For FPV: We do NOT implement sessions/login state.
    // We simply use a placeholder user ID (example: user #1).
    // This will later be replaced with a real authentication system.
    const USER_ID = 1;

    const { start, end } = getTodayRange();

    // Fetch all foods logged today by this user.
    const logs = await prisma.foodLog.findMany({
      where: {
        userId: USER_ID,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    // Calculate total calories consumed.
    const caloriesConsumed = logs.reduce(
      (total, item) => total + item.calories,
      0
    );

    // For FPV, give every user a simple 2,200 calorie target.
    // Later, this will be replaced with a full TDEE engine.
    const caloriesTarget = 2200;

    // Format response data.
    return NextResponse.json(
      {
        caloriesTarget,
        caloriesConsumed,
        foods: logs.map((item) => ({
          name: item.name,
          calories: item.calories,
        })),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Summary API error:", err);
    return NextResponse.json(
      { error: "Failed to load summary" },
      { status: 500 }
    );
  }
}
