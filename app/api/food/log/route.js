// app/api/food/log/route.js
// Logs a food entry using the USDA search results (calories + macros + quantity).

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fdcId = null,
      name,
      calories,
      protein = 0,
      carbs = 0,
      fat = 0,
      quantity = 1,
    } = body || {};

    if (!name || calories === undefined) {
      return NextResponse.json(
        { error: "Food name and calories are required" },
        { status: 400 }
      );
    }

    const qty = parseInt(quantity, 10);
    if (!Number.isInteger(qty) || qty <= 0) {
      return NextResponse.json(
        { error: "Quantity must be a positive integer" },
        { status: 400 }
      );
    }

    const calPerUnit = Number(calories);
    if (isNaN(calPerUnit) || calPerUnit <= 0) {
      return NextResponse.json(
        { error: "Calories must be a positive number" },
        { status: 400 }
      );
    }

    const macroProtein = Math.round(Number(protein) || 0);
    const macroCarbs = Math.round(Number(carbs) || 0);
    const macroFat = Math.round(Number(fat) || 0);

    // Resolve the active user (most recent) or create a placeholder
    let activeUser = await prisma.user.findFirst({
      orderBy: { id: "desc" },
      select: { id: true },
    });

    if (!activeUser) {
      activeUser = await prisma.user.create({
        data: {
          firstName: "User",
          lastName: "Placeholder",
          email: `placeholder-${Date.now()}@example.com`,
          password: "placeholder",
          height: 0,
          weight: 0,
          age: 0,
          sex: "unknown",
          goal: "maintain",
          activityLevel: "light",
          unitSystem: "metric",
        },
        select: { id: true },
      });
    }

    const entry = await prisma.dailyFoodLog.create({
      data: {
        userId: activeUser.id,
        foodId: fdcId ? Number(fdcId) : null,
        name: name.trim(),
        calories: Math.round(calPerUnit),
        protein: macroProtein,
        carbs: macroCarbs,
        fat: macroFat,
        quantity: qty,
        date: new Date(),
      },
    });

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (err) {
    console.error("Food log error:", err);
    return NextResponse.json(
      { error: "Failed to log food" },
      { status: 500 }
    );
  }
}
