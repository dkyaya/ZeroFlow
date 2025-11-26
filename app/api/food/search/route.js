// app/api/food/search/route.js
// Enhanced ZeroFlow food search:
// - fuzzy search (typo-tolerant)
// - scoring for better ranking
// - optional category filtering (future ready)
// - pagination
// - extremely TF-safe & fast

import { NextResponse } from "next/server";
import foods from "@/data/foods.json";

// Basic fuzzy match helper (lightweight, no external libs)
function fuzzyMatch(query, target) {
  query = query.toLowerCase();
  target = target.toLowerCase();

  let qi = 0;
  for (let ti = 0; ti < target.length && qi < query.length; ti++) {
    if (target[ti] === query[qi]) {
      qi++;
    }
  }
  return qi === query.length;
}

// Scoring function
// Higher = better match
function scoreMatch(query, name) {
  name = name.toLowerCase();
  query = query.toLowerCase();

  if (name === query) return 100;            // perfect match
  if (name.startsWith(query)) return 75;     // strong match
  if (name.includes(query)) return 50;       // decent match
  if (fuzzyMatch(query, name)) return 25;    // typo match
  return 0;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q")?.trim().toLowerCase() || "";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 30;

    // Future-ready category filter
    const category = searchParams.get("category");

    // If blank search, return empty list (fast)
    if (!query) {
      return NextResponse.json({
        results: [],
        page,
        total: 0,
      });
    }

    // Filter foods
    let filtered = foods
      .map((item) => ({
        ...item,
        score: scoreMatch(query, item.name),
      }))
      .filter((item) => item.score > 0);

    // Optional category filter (if you add categories later)
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Sort by score DESC
    filtered.sort((a, b) => b.score - a.score);

    // Pagination
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return NextResponse.json({
      results: paginated,
      page,
      total: filtered.length,
    });

  } catch (err) {
    console.error("Enhanced food search error:", err);
    return NextResponse.json(
      { error: "Failed to search foods" },
      { status: 500 }
    );
  }
}
