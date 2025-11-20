// app/api/auth/login/route.js
// Handles user login.
// Verifies email + password and returns a simple success response.
// (CS50 FPV version does NOT implement full JWT/cookies yet.)

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    // Parse JSON login data.
    const { email, password } = await request.json();

    // Look up user in the database.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password with hashed password in DB.
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If we reach here, login is successful.
    // For FPV: We return success without implementing sessions yet.
    return NextResponse.json(
      { message: "Login successful", userId: user.id },
      { status: 200 }
    );

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
