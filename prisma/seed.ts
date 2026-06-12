import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.playlistItem.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.viewHistory.deleteMany();
  await prisma.qualityUrl.deleteMany();
  await prisma.video.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();

  const [veronika, alex] = await Promise.all([
    prisma.user.create({
      data: {
        email: 'veronika@mediahub.com',
        username: 'veronika',
        name: 'Veronika Blaze',
        avatarUrl: '/avatars/veronika.jpg',
        bio: 'Curating premium media journeys.',
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'alex@mediahub.com',
        username: 'alex',
        name: 'Alex Reid',
        avatarUrl: '/avatars/alex.jpg',
        bio: 'Creator and storyteller.',
      },
    }),
  ]);

  const [designTag, musicTag, travelTag, productivityTag, cinemaTag] = await Promise.all([
    prisma.tag.create({ data: { name: 'design', slug: 'design' } }),
    prisma.tag.create({ data: { name: 'music', slug: 'music' } }),
    prisma.tag.create({ data: { name: 'travel', slug: 'travel' } }),
    prisma.tag.create({ data: { name: 'productivity', slug: 'productivity' } }),
    prisma.tag.create({ data: { name: 'cinema', slug: 'cinema' } }),
  ]);

  const video1 = await prisma.video.create({
    data: {
      title: 'Glassmorphism Motion Story',
      description: 'A cinematic walkthrough of modern UI motion with premium design systems.',
      slug: 'glassmorphism-motion-story',
      duration: 320,
      publishedAt: new Date('2026-05-16T10:00:00Z'),
      views: 18200,
      likeCount: 1400,
      thumbnailUrl: '/thumbnails/glassmorphism.jpg',
      videoUrl: '/videos/sample-1080.mp4',
      author: { connect: { id: veronika.id } },
      tags: { connect: [{ id: designTag.id }, { id: cinemaTag.id }] },
      qualityUrls: {
        create: [
          { quality: '1080p', url: '/videos/sample-1080.mp4' },
          { quality: '720p', url: '/videos/sample-720.mp4' },
          { quality: '480p', url: '/videos/sample-480.mp4' },
        ],
      },
    },
  });

  const video2 = await prisma.video.create({
    data: {
      title: 'Modern Media Platform Workflow',
      description: 'A deep dive into next-generation media publishing and curation.',
      slug: 'modern-media-platform-workflow',
      duration: 410,
      publishedAt: new Date('2026-04-11T14:00:00Z'),
      views: 24100,
      likeCount: 2100,
      thumbnailUrl: '/thumbnails/media-platform.jpg',
      videoUrl: '/videos/sample-4k.mp4',
      author: { connect: { id: alex.id } },
      tags: { connect: [{ id: productivityTag.id }, { id: travelTag.id }] },
      qualityUrls: {
        create: [
          { quality: '1080p', url: '/videos/sample-4k.mp4' },
          { quality: '720p', url: '/videos/sample-4k.mp4' },
          { quality: '480p', url: '/videos/sample-4k.mp4' },
        ],
      },
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        content: 'Потрясающий дизайн, очень качественная подача.',
        authorId: alex.id,
        videoId: video1.id,
      },
      {
        content: 'Очень вдохновляет, хочу больше подобных платформ.',
        authorId: veronika.id,
        videoId: video2.id,
      },
    ],
  });

  await prisma.favorite.create({
    data: {
      user: { connect: { id: alex.id } },
      video: { connect: { id: video1.id } },
    },
  });

  await prisma.viewHistory.createMany({
    data: [
      {
        userId: alex.id,
        videoId: video1.id,
        progress: 42,
      },
      {
        userId: alex.id,
        videoId: video2.id,
        progress: 18,
      },
    ],
  });

  await prisma.playlist.create({
    data: {
      title: 'Premium Releases',
      description: 'Подборка лучших видео для творческих и бизнес-аудиторий.',
      owner: { connect: { id: veronika.id } },
      items: {
        create: [
          { video: { connect: { id: video1.id } } },
          { video: { connect: { id: video2.id } } },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
