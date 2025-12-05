// app/api/summary/weekly/route.js
// Returns weekly summary data for the Summary page

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getActiveUser() {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get("userId");
  
  if (userIdCookie) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userIdCookie.value) },
    });
    if (user) return user;
  }
  
  return prisma.user.findFirst({ orderBy: { id: "desc" } });
}

export async function GET() {
  try {
    const user = await getActiveUser();
    
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }

    // Last 7 days
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date();
    weekEnd.setHours(23, 59, 59, 999);

    const foodLogs = await prisma.dailyFoodLog.findMany({
      where: {
        userId: user.id,
        date: { gte: weekStart, lte: weekEnd },
      },
      orderBy: { date: "asc" },
    });

    const workoutLogs = await prisma.workoutLog.findMany({
      where: {
        userId: user.id,
        date: { gte: weekStart, lte: weekEnd },
      },
      orderBy: { date: "asc" },
    });

    // Aggregate by day
    const dailyStats = [];
    for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);
      
      const dayFoods = foodLogs.filter(f => {
        const fDate = new Date(f.date);
        return fDate >= dayStart && fDate <= dayEnd;
      });
      
      const dayWorkouts = workoutLogs.filter(w => {
        const wDate = new Date(w.date);
        return wDate >= dayStart && wDate <= dayEnd;
      });

      const calories = dayFoods.reduce((sum, f) => sum + f.calories, 0);
      const protein = dayFoods.reduce((sum, f) => sum + f.protein, 0);
      const carbs = dayFoods.reduce((sum, f) => sum + f.carbs, 0);
      const fat = dayFoods.reduce((sum, f) => sum + f.fat, 0);
      const burned = dayWorkouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
      const workoutMins = dayWorkouts.reduce((sum, w) => sum + w.duration, 0);

      dailyStats.push({
        date: dayStart.toISOString().split("T")[0],
        dayName: dayStart.toLocaleDateString("en-US", { weekday: "short" }),
        calories,
        protein,
        carbs,
        fat,
        burned,
        workoutMins,
        foodCount: dayFoods.length,
        workoutCount: dayWorkouts.length,
      });
    }

    // Weekly totals
    const weeklyTotals = {
      calories: dailyStats.reduce((sum, d) => sum + d.calories, 0),
      protein: dailyStats.reduce((sum, d) => sum + d.protein, 0),
      carbs: dailyStats.reduce((sum, d) => sum + d.carbs, 0),
      fat: dailyStats.reduce((sum, d) => sum + d.fat, 0),
      burned: dailyStats.reduce((sum, d) => sum + d.burned, 0),
      workoutMins: dailyStats.reduce((sum, d) => sum + d.workoutMins, 0),
      daysLogged: dailyStats.filter(d => d.foodCount > 0).length,
      workoutsLogged: dailyStats.filter(d => d.workoutCount > 0).length,
    };

    // Averages
    const daysWithData = dailyStats.filter(d => d.foodCount > 0).length || 1;
    const weeklyAverages = {
      calories: Math.round(weeklyTotals.calories / daysWithData),
      protein: Math.round(weeklyTotals.protein / daysWithData),
      carbs: Math.round(weeklyTotals.carbs / daysWithData),
      fat: Math.round(weeklyTotals.fat / daysWithData),
    };

    return NextResponse.json({
      user: {
        firstName: user.firstName,
        preferredName: user.preferredName,
        goal: user.goal,
      },
      dailyStats,
      weeklyTotals,
      weeklyAverages,
    });
  } catch (err) {
    console.error("Weekly summary error:", err);
    return NextResponse.json({ error: "Failed to load weekly summary" }, { status: 500 });
  }
}

