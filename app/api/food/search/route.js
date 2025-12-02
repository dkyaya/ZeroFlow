// app/api/food/search/route.js
// USDA API-backed search with macros/portions from USDA response.

import { NextResponse } from "next/server";

const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_SEARCH_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

// USDA nutrient IDs
const NUTRIENTS = {
  calories: 1008,
  protein: 1003,
  carbs: 1005,
  fat: 1004,
};

function extractMacros(foodNutrients = []) {
  const macros = { calories: 0, protein: 0, carbs: 0, fat: 0 };

  for (const n of foodNutrients) {
    const id =
      n.nutrientId ??
      n.nutrient?.id ??
      Number(n.nutrientNumber ?? n.number ?? n.nutrient?.number);
    const name = (n.nutrient?.name || n.nutrientName || "").toLowerCase();
    const amount = n.amount ?? n.value ?? 0;

    if (id === NUTRIENTS.calories || name.includes("energy")) macros.calories = amount;
    if (id === NUTRIENTS.protein || name === "protein") macros.protein = amount;
    if (id === NUTRIENTS.carbs || name.includes("carbohydrate")) macros.carbs = amount;
    if (id === NUTRIENTS.fat || name === "fat") macros.fat = amount;
  }

  return macros;
}

export async function GET(request) {
  try {
    if (!USDA_API_KEY) {
      return NextResponse.json(
        { error: "USDA API key missing. Set USDA_API_KEY in .env." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();
    const page = Number(searchParams.get("page")) || 1;
    const limit = Math.min(50, Number(searchParams.get("limit")) || 25);

    if (!query) {
      return NextResponse.json({ results: [], page, total: 0 });
    }

    const url = new URL(USDA_SEARCH_URL);
    url.searchParams.set("api_key", USDA_API_KEY);
    url.searchParams.set("query", query);
    url.searchParams.set("pageSize", String(limit));
    url.searchParams.set("pageNumber", String(page));
    // request specific nutrients so macros are included
    Object.values(NUTRIENTS).forEach((id) => {
      url.searchParams.append("nutrients", String(id));
    });

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      const errTxt = await res.text().catch(() => "");
      throw new Error(`USDA API error (${res.status}): ${errTxt}`);
    }
    const data = await res.json();
    const foods = data.foods || [];

    const results = foods.map((food) => ({
      fdcId: food.fdcId,
      name: food.description,
      brandName: food.brandOwner || food.brandName || null,
      dataType: food.dataType,
      macros: extractMacros(food.foodNutrients),
      portions: food.foodPortions?.slice(0, 3)?.map((p) => ({
        amount: p.amount,
        measureUnit: p.measureUnit?.abbreviation || p.measureUnit?.name,
        portionDescription: p.modifier || p.portionDescription,
        gramWeight: p.gramWeight,
      })) || [],
    }));

    return NextResponse.json({
      results,
      page,
      total: data.totalHits ?? results.length,
    });
  } catch (err) {
    console.error("Food search error:", err);
    return NextResponse.json({ error: "Failed to search foods" }, { status: 500 });
  }
}
