// lib/searchFoods.js
import Fuse from "fuse.js";
import { FOOD_DB } from "./food";

const fuse = new Fuse(FOOD_DB, {
  keys: ["name", "category"],
  includeScore: true,
  threshold: 0.35,
});

export function searchFoods(query) {
  if (!query.trim()) return [];
  return fuse.search(query).slice(0, 8).map(r => r.item);
}
