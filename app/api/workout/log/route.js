import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { type, duration, caloriesBurned, rpe, notes } = await request.json();

    if (!type || !duration || !caloriesBurned) {
      return NextResponse.json(
        { error: "Missing required fields (type, duration, caloriesBurned)" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get("userId");
    let activeUser = null;

    if (userIdCookie) {
      activeUser = await prisma.user.findUnique({
        where: { id: parseInt(userIdCookie.value) },
      });
    }

    // Fallback to last user if no cookie or cookie invalid
    if (!activeUser) {
       activeUser = await prisma.user.findFirst({
          orderBy: { id: "desc" },
       });
    }

    if (!activeUser) {
      return NextResponse.json(
        { error: "No users found. Please register first." },
        { status: 404 }
      );
    }

    const workout = await prisma.workoutLog.create({
      data: {
        userId: activeUser.id,
        type,
        duration: parseInt(duration),
        caloriesBurned: parseInt(caloriesBurned),
        rpe: rpe ? parseInt(rpe) : null,
        notes,
      },
    });

    return NextResponse.json({ success: true, workout }, { status: 201 });

  } catch (err) {
    console.error("Workout log error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
