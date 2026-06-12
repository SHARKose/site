import { PrismaClient } from '@prisma/client';

// Это "синглтон" — он гарантирует, что при разработке (hot reload)
// не создастся сотня подключений к базе, которые "съедят" лимит Neon.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;