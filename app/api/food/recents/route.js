import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get("userId");
    let activeUser = null;

    if (userIdCookie) {
      activeUser = await prisma.user.findUnique({
        where: { id: parseInt(userIdCookie.value) },
      });
    }

    // Fallback
    if (!activeUser) {
      activeUser = await prisma.user.findFirst({
        orderBy: { id: "desc" },
      });
    }

    if (!activeUser) {
      return NextResponse.json({ recents: [] });
    }

    const logs = await prisma.dailyFoodLog.findMany({
      where: { userId: activeUser.id },
      orderBy: { id: "desc" },
      take: 50,
    });

    // Deduplicate by name
    const unique = [];
    const seen = new Set();
    for (const log of logs) {
      const normalized = log.name.trim().toLowerCase();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        unique.push({
            ...log,
            quantity: 1 // Default to 1 for quick add, or use log.quantity? Use 1 implies base.
        });
        if (unique.length >= 8) break;
      }
    }

    return NextResponse.json({ recents: unique });

  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch recents" }, { status: 500 });
  }
}



