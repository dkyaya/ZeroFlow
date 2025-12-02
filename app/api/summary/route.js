// app/api/summary/route.js
// Returns a real daily summary (calories + macros + foods) for the most recent user.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function calculateTarget(user) {
  if (!user) return 0;

  const isMetric = user.unitSystem === "metric";
  const weightKg = isMetric ? user.weight : user.weight / 2.20462;
  const heightCm = isMetric ? user.height : user.height * 2.54;
  const age = user.age ?? 30;
  const sexAdj = user.sex === "female" ? -161 : 5;

  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + sexAdj;

  const activityFactor = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725,
  }[user.activityLevel] ?? 1.2;

  const goalAdj = {
    lose: -400,
    maintain: 0,
    gain: 400,
    performance: 200,
  }[user.goal] ?? 0;

  return Math.max(1200, Math.round(bmr * activityFactor + goalAdj));
}

export async function GET() {
  try {
    const activeUser = await prisma.user.findFirst({
      orderBy: { id: "desc" },
    });

    if (!activeUser) {
      return NextResponse.json(
        { error: "No users found. Please register first." },
        { status: 404 }
      );
    }

    const { start, end } = getTodayRange();

    const logs = await prisma.dailyFoodLog.findMany({
      where: {
        userId: activeUser.id,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    const totals = logs.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const caloriesTarget = calculateTarget(activeUser);

    return NextResponse.json(
      {
        user: {
          id: activeUser.id,
          firstName: activeUser.firstName,
          preferredName: activeUser.preferredName,
        },
        caloriesTarget,
        caloriesConsumed: totals.calories,
        macros: {
          protein: totals.protein,
          carbs: totals.carbs,
          fat: totals.fat,
        },
        workouts: [], // workouts not yet implemented
        foods: logs.map((item) => ({
          id: item.id,
          name: item.name,
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          quantity: item.quantity,
        })),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Summary API error:", err);
    return NextResponse.json({ error: "Failed to load summary" }, { status: 500 });
  }
}
