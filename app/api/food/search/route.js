// app/api/food/search/route.js
// Simple FPV search that returns foods from a small built-in list.
// Replaces a full database or external API for the final project.

import { NextResponse } from "next/server";

// Small built-in food list for FPV
const FOODS = [
  { name: "Banana", calories: 105 },
  { name: "Apple", calories: 95 },
  { name: "Chicken Breast (100g)", calories: 165 },
  { name: "Rice (1 cup)", calories: 205 },
  { name: "Egg", calories: 78 },
  { name: "Oatmeal (1 cup)", calories: 150 },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = FOODS.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  return NextResponse.json(results);
}
