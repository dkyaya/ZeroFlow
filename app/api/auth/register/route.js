import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const { firstName, lastName, preferredName, email, password } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        preferredName: preferredName || null,
        email,
        password: hashed,
      },
    });

    return NextResponse.json({ message: "User created" }, { status: 201 });

  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
