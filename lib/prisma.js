import { PrismaClient } from "@prisma/client";

let prisma;

// Prevent multiple Prisma instances in dev (Next.js hot reload)
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
