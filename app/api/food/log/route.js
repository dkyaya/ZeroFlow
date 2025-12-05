// app/api/food/log/route.js
// Logs a food entry using the USDA search results (calories + macros + quantity).

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

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

    // Allow decimal quantities (servings like 0.5, 1.5, etc.)
    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) {
      return NextResponse.json(
        { error: "Quantity must be a positive number" },
        { status: 400 }
      );
    }

    const calPerUnit = Number(calories);
    if (isNaN(calPerUnit) || calPerUnit < 0) {
      return NextResponse.json(
        { error: "Calories must be a non-negative number" },
        { status: 400 }
      );
    }

    const macroProtein = Math.round(Number(protein) || 0);
    const macroCarbs = Math.round(Number(carbs) || 0);
    const macroFat = Math.round(Number(fat) || 0);

    // Resolve the active user from cookie or fallback
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get("userId");
    let activeUser = null;

    if (userIdCookie) {
      activeUser = await prisma.user.findUnique({
        where: { id: parseInt(userIdCookie.value) },
        select: { id: true },
      });
    }

    if (!activeUser) {
      activeUser = await prisma.user.findFirst({
        orderBy: { id: "desc" },
        select: { id: true },
      });
    }

    if (!activeUser) {
      return NextResponse.json(
        { error: "No user found. Please register first." },
        { status: 401 }
      );
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
