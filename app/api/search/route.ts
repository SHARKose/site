import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Добавь эту строку:
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? '';

  const results = await prisma.video.findMany({
    where: {
      privacy: 'PUBLIC',
      title: { contains: query, mode: 'insensitive' },
    },
    take: 10,
    include: { author: true },
  });

  return NextResponse.json(results.map((video) => ({
    id: video.id,
    title: video.title,
    slug: video.slug,
    author: video.author.name,
    views: video.views,
  })));
}