import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getUser() {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get("userId");
  if (!userIdCookie) return null;
  return prisma.user.findUnique({ where: { id: parseInt(userIdCookie.value) } });
}

export async function GET() {
  try {
    const user = await getUser();
    // Fallback to last user if not found (dev mode)
    const activeUser = user || await prisma.user.findFirst({ orderBy: { id: "desc" } });

    if (!activeUser) return NextResponse.json({ favorites: [] });

    const favorites = await prisma.favoriteFood.findMany({
      where: { userId: activeUser.id },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ favorites });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, calories, protein, carbs, fat, quantity } = await request.json();
    const user = await getUser();
    const activeUser = user || await prisma.user.findFirst({ orderBy: { id: "desc" } });

    if (!activeUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const favorite = await prisma.favoriteFood.create({
      data: {
        userId: activeUser.id,
        name,
        calories,
        protein,
        carbs,
        fat,
        quantity: quantity || 1,
      },
    });

    return NextResponse.json({ favorite });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }
}



