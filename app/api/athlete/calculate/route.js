// app/api/athlete/calculate/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { weight, activity } = await request.json();

    if (typeof weight !== "number" || weight <= 0) {
      return NextResponse.json(
        { error: "Weight must be a positive number." },
        { status: 400 }
      );
    }

    const activityBump = {
      light: 200,
      moderate: 400,
      intense: 600,
    }[activity] ?? 0;

    // FPV simplified athlete calorie estimate
    const calories = weight * 15 + activityBump;

    // FPV simplified protein target (grams/day)
    const protein_g = Math.round(weight * 1.2);

    return NextResponse.json({ calories, protein_g });
  } catch (err) {
    console.error("Athlete calc error:", err);
    return NextResponse.json(
      { error: "Failed to calculate athlete metrics" },
      { status: 500 }
    );
  }
}