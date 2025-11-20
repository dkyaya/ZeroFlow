// app/api/auth/register/route.js
// Handles user registration for ZeroFlow (Final Project Version)
// Creates a new user in the database after hashing the password.

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma"; 
// Assumes you will create /lib/prisma.js to export a Prisma instance.

export async function POST(request) {
  try {
    // Parse JSON data sent from the registration form.
    const { name, email, password } = await request.json();

    // Check if an account already exists for this email.
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password before saving to database.
    const hashed = await bcrypt.hash(password, 10);

    // Create the new user in the database.
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });

    // Respond successfully.
    return NextResponse.json({ message: "User created" }, { status: 201 });

  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
