import fs from "fs";
import csv from "csv-parser";
import { prisma } from "../lib/prisma.js";

async function loadCSV(path) {
  return new Promise((resolve) => {
    const rows = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows));
  });
}

async function main() {
  console.log("Loading CSVs...");

  const foods = await loadCSV("fdc_csv/food.csv");
  const foodNutrients = await loadCSV("fdc_csv/food_nutrient.csv");
  const nutrients = await loadCSV("fdc_csv/nutrient.csv");
  const portions = await loadCSV("fdc_csv/food_portion.csv");

  console.log("Importing nutrients...");
  for (const n of nutrients) {
    await prisma.nutrient.create({
      data: {
        id: Number(n.id),
        name: n.name,
        unitName: n.unit_name,
      },
    });
  }

  console.log("Importing foods...");
  for (const f of foods) {
    await prisma.food.create({
      data: {
        fdcId: Number(f.fdc_id),
        description: f.description,
        dataType: f.data_type,
        brandName: f.brand_name || null,
      },
    });
  }

  console.log("Importing food nutrients...");
  for (const fn of foodNutrients) {
    await prisma.foodNutrient.create({
      data: {
        foodId: Number(fn.fdc_id),
        nutrientId: Number(fn.nutrient_id),
        amount: Number(fn.amount),
      },
    });
  }

  console.log("Importing food portions...");
  for (const p of portions) {
    await prisma.foodPortion.create({
      data: {
        foodId: Number(p.fdc_id),
        amount: p.amount ? Number(p.amount) : null,
        measureUnit: p.measure_unit_name || null,
        portionDescription: p.portion_description || null,
        gramWeight: p.gram_weight ? Number(p.gram_weight) : null,
      },
    });
  }

  console.log("DONE!");
}

main();
