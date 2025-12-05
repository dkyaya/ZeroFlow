// app/api/summary/route.js
// Returns a real daily summary (calories + macros + foods) for the authenticated user.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function calculateTarget(user) {
  if (!user) return { calories: 2000, protein: 150, fat: 67, carbs: 200 };

  const isMetric = user.unitSystem === "metric";
  const weightKg = isMetric ? user.weight : user.weight / 2.20462;
  const heightCm = isMetric ? user.height : user.height * 2.54;
  const age = user.age ?? 30;
  const sexAdj = user.sex === "female" ? -161 : 5;

  // Mifflin-St Jeor BMR
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + sexAdj;

  const activityFactor = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725,
  }[user.activityLevel] ?? 1.2;

  // Goal-based calorie adjustment
  const goalCalAdj = {
    lose: -500,      // Deficit for weight loss
    maintain: 0,
    gain: 300,       // Surplus for muscle gain
    performance: 200,
  }[user.goal] ?? 0;

  const dailyCalories = Math.max(1200, Math.round(bmr * activityFactor + goalCalAdj));

  // GOAL-BASED MACRO SPLITS
  // These percentages are tailored to each goal
  let proteinPct, carbsPct, fatPct;

  switch (user.goal) {
    case "lose":
      // High protein to preserve muscle, moderate carbs, moderate fat
      proteinPct = 0.35;
      carbsPct = 0.35;
      fatPct = 0.30;
      break;
    case "gain":
      // High protein for muscle building, high carbs for energy, lower fat
      proteinPct = 0.30;
      carbsPct = 0.50;
      fatPct = 0.20;
      break;
    case "performance":
      // Balanced with emphasis on carbs for athletic performance
      proteinPct = 0.25;
      carbsPct = 0.50;
      fatPct = 0.25;
      break;
    case "maintain":
    default:
      // Standard balanced split
      proteinPct = 0.30;
      carbsPct = 0.40;
      fatPct = 0.30;
      break;
  }

  // Calculate grams: protein 4cal/g, carbs 4cal/g, fat 9cal/g
  const proteinGrams = Math.round((dailyCalories * proteinPct) / 4);
  const carbsGrams = Math.round((dailyCalories * carbsPct) / 4);
  const fatGrams = Math.round((dailyCalories * fatPct) / 9);

  return {
    calories: dailyCalories,
    protein: proteinGrams,
    carbs: carbsGrams,
    fat: fatGrams,
  };
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get("userId");
    let activeUser = null;

    if (userIdCookie) {
      activeUser = await prisma.user.findUnique({
        where: { id: parseInt(userIdCookie.value) },
      });
    }

    if (!activeUser) {
      activeUser = await prisma.user.findFirst({
        orderBy: { id: "desc" },
      });
    }

    if (!activeUser) {
      return NextResponse.json(
        { error: "No users found. Please register first." },
        { status: 404 }
      );
    }

    const { start, end } = getTodayRange();

    // Weekly Range (Last 7 days)
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date();
    weekEnd.setHours(23, 59, 59, 999);

    const logs = await prisma.dailyFoodLog.findMany({
      where: {
        userId: activeUser.id,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    const workoutLogs = await prisma.workoutLog.findMany({
      where: {
        userId: activeUser.id,
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    const weeklyWorkoutLogs = await prisma.workoutLog.findMany({
      where: {
        userId: activeUser.id,
        date: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      orderBy: { date: "asc" },
    });

    // Calculate calories burned today
    const caloriesBurnedToday = workoutLogs.reduce(
      (sum, w) => sum + (w.caloriesBurned || 0),
      0
    );

    // Aggregate Weekly Stats
    const weeklyStatsMap = {};
    for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toLocaleDateString("en-US", { weekday: "short" });
      weeklyStatsMap[dateKey] = 0;
    }
    weeklyWorkoutLogs.forEach((w) => {
      const day = new Date(w.date).toLocaleDateString("en-US", { weekday: "short" });
      if (weeklyStatsMap[day] !== undefined) {
        weeklyStatsMap[day] += w.caloriesBurned;
      }
    });
    const daysOrder = [];
    for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
      daysOrder.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    }
    const weeklyStats = daysOrder.map((day) => ({
      day,
      calories: weeklyStatsMap[day],
    }));

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

    const targets = calculateTarget(activeUser);

    return NextResponse.json(
      {
        user: {
          id: activeUser.id,
          firstName: activeUser.firstName,
          preferredName: activeUser.preferredName,
          goal: activeUser.goal,
        },
        caloriesTarget: targets.calories,
        macrosTarget: {
          protein: targets.protein,
          fat: targets.fat,
          carbs: targets.carbs,
        },
        caloriesConsumed: totals.calories,
        caloriesBurnedToday,
        macros: {
          protein: totals.protein,
          carbs: totals.carbs,
          fat: totals.fat,
        },
        workouts: workoutLogs.map((w) => ({
          id: w.id,
          type: w.type,
          duration: w.duration,
          caloriesBurned: w.caloriesBurned,
          rpe: w.rpe,
          notes: w.notes,
        })),
        weeklyWorkoutStats: weeklyStats,
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
    return NextResponse.json(
      { error: "Failed to load summary" },
      { status: 500 }
    );
  }
}
