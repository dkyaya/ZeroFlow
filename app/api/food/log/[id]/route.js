// app/api/food/log/[id]/route.js
// Update a logged food entry (today) for the most recent user.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request, { params }) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      calories,
      protein,
      carbs,
      fat,
      quantity,
    } = body || {};

    const updates = {};
    if (name) updates.name = name.trim();
    if (calories !== undefined) updates.calories = Math.round(Number(calories) || 0);
    if (protein !== undefined) updates.protein = Math.round(Number(protein) || 0);
    if (carbs !== undefined) updates.carbs = Math.round(Number(carbs) || 0);
    if (fat !== undefined) updates.fat = Math.round(Number(fat) || 0);
    if (quantity !== undefined) {
      const qty = parseInt(quantity, 10);
      if (!Number.isInteger(qty) || qty <= 0) {
        return NextResponse.json(
          { error: "Quantity must be a positive integer" },
          { status: 400 }
        );
      }
      updates.quantity = qty;
    }

    const updated = await prisma.dailyFoodLog.update({
      where: { id },
      data: updates,
    });

    return NextResponse.json({ success: true, log: updated }, { status: 200 });
  } catch (err) {
    console.error("Update food log error:", err);
    return NextResponse.json({ error: "Failed to update log" }, { status: 500 });
  }
}

export async function DELETE(_request, context) {
  try {
    const params = await context?.params;
    const id = Number(params?.id);
    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await prisma.dailyFoodLog.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Delete food log error:", err);
    return NextResponse.json({ error: "Failed to delete log" }, { status: 500 });
  }
}
