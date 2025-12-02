// app/api/food/logs/route.js
// Returns today's logged foods for the most recent user (no auth yet).

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export async function GET() {
  try {
    const user = await prisma.user.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ logs: [] }, { status: 200 });
    }

    const { start, end } = getTodayRange();

    const logs = await prisma.dailyFoodLog.findMany({
      where: {
        userId: user.id,
        date: { gte: start, lte: end },
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ logs }, { status: 200 });
  } catch (err) {
    console.error("Get logs error:", err);
    return NextResponse.json({ error: "Failed to load logs" }, { status: 500 });
  }
}
