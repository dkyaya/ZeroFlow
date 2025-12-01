// app/api/summary/route.js
// Provides the daily nutrition summary for the dashboard.
// FPV uses a placeholder userId (1) because authentication is not implemented yet.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper: returns today's time window (00:00 → 23:59)
function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export async function GET() {
  try {
    // FPV placeholder user
    const USER_ID = 1;

    const { start, end } = getTodayRange();

    // Fetch the user info (placeholder userId = 1 for FPV)
    const user = await prisma.user.findUnique({
      where: { id: USER_ID },
      select: {
        firstName: true,
        preferredName: true,
      },
    });

    // Fetch all food logs from today
    const logs = await prisma.foodLog.findMany({
      where: {
        userId: USER_ID,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    // Sum calories for today's intake
    const caloriesConsumed = logs.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    // FPV static calorie target
    const caloriesTarget = 2200;

    return NextResponse.json(
      {
        user,
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
