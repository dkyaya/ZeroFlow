import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      preferredName,
      email,
      password,
      height,
      weight,
      age,
      sex,
      goal,
      activityLevel,
      unitSystem,
    } = data;

    // Basic validation
    if (
      !firstName || !lastName || !email || !password ||
      !height || !weight || !age || !sex || !goal ||
      !activityLevel || !unitSystem
    ) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        preferredName: preferredName || null,
        email,
        password: hashed,
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
        sex,
        goal,
        activityLevel,
        unitSystem,
      },
    });

    return NextResponse.json(
      { message: "User created.", userId: user.id },
      { status: 201 }
    );

  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
