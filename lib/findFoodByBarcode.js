// lib/findFoodByBarcode.js
import { FOOD_DB } from "./food";

export function findFoodByBarcode(code) {
  return FOOD_DB.find(item => item.barcode === code) || null;
}
