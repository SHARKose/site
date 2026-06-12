import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const videos = await prisma.video.findMany({
    where: { privacy: 'PUBLIC' },
    orderBy: { publishedAt: 'desc' },
    take: 12,
    include: { author: true, tags: true },
  });

  return NextResponse.json(videos.map((video) => ({
    id: video.id,
    title: video.title,
    slug: video.slug,
    views: video.views,
    author: video.author.name,
    tags: video.tags.map((tag) => tag.name),
    thumbnailUrl: video.thumbnailUrl,
  })));
}
