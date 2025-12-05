// app/api/user/route.js
// GET and PUT endpoints for user profile/settings

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getActiveUser() {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get("userId");
  
  if (userIdCookie) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userIdCookie.value) },
    });
    if (user) return user;
  }
  
  // Fallback to most recent user (dev mode)
  return prisma.user.findFirst({ orderBy: { id: "desc" } });
}

export async function GET() {
  try {
    const user = await getActiveUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "No user found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      email: user.email,
      height: user.height,
      weight: user.weight,
      age: user.age,
      sex: user.sex,
      goal: user.goal,
      activityLevel: user.activityLevel,
      unitSystem: user.unitSystem,
    });
  } catch (err) {
    console.error("Get user error:", err);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = await getActiveUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "No user found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      firstName,
      lastName,
      preferredName,
      height,
      weight,
      age,
      sex,
      goal,
      activityLevel,
      unitSystem,
    } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(preferredName !== undefined && { preferredName }),
        ...(height !== undefined && { height: parseInt(height) }),
        ...(weight !== undefined && { weight: parseInt(weight) }),
        ...(age !== undefined && { age: parseInt(age) }),
        ...(sex !== undefined && { sex }),
        ...(goal !== undefined && { goal }),
        ...(activityLevel !== undefined && { activityLevel }),
        ...(unitSystem !== undefined && { unitSystem }),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        preferredName: updatedUser.preferredName,
        height: updatedUser.height,
        weight: updatedUser.weight,
        age: updatedUser.age,
        sex: updatedUser.sex,
        goal: updatedUser.goal,
        activityLevel: updatedUser.activityLevel,
        unitSystem: updatedUser.unitSystem,
      },
    });
  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

