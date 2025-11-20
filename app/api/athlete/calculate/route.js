// app/api/athlete/calculate/route.js
// FPV athlete calculator: returns higher protein + adjusted calories.
// This is intentionally simple for the final project.

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { weight, activity } = await request.json();

    // Base calories estimate (FPV version)
    let calories = weight * 15;

    // Adjust for training intensity
    if (activity === "light") calories += 200;
    if (activity === "moderate") calories += 400;
    if (activity === "intense") calories += 600;

    // Athlete protein recommendation (simplified)
    const protein = Math.round(weight * 1.2);

    return NextResponse.json({
      calories,
      protein,
    });
  } catch (err) {
    console.error("Athlete calc error:", err);
    return NextResponse.json(
      { error: "Failed to calculate athlete metrics" },
      { status: 500 }
    );
  }
}
