import { notFound } from 'next/navigation';
import VideoPlayer from '@/components/VideoPlayer';
import Sidebar from '@/components/Sidebar';
import RelatedVideos from '@/components/RelatedVideos';
import CommentsSection from '@/components/CommentsSection';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

const formatAgo = (publishedAt: Date) => {
  const diff = Date.now() - publishedAt.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'Сегодня';
  if (days === 1) return '1 день назад';
  if (days < 7) return `${days} дня назад`;
  return publishedAt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

export async function generateStaticParams() {
  const videos = await prisma.video.findMany({
    where: { privacy: 'PUBLIC' },
    select: { slug: true },
  });

  return videos.map((video) => ({ slug: video.slug }));
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = await prisma.video.findUnique({
    where: { slug },
    include: {
      author: true,
      tags: true,
      comments: { include: { author: true }, orderBy: { createdAt: 'desc' } },
      qualityUrls: true,
    },
  });

  if (!video) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="home" />

        <div className="space-y-6">
          <div className="glass-card overflow-hidden border border-white/10 shadow-glow">
            <VideoPlayer videoUrl={video.videoUrl} thumbnail={video.thumbnailUrl} title={video.title} />
            <div className="p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-white">{video.title}</h1>
                  <p className="mt-3 max-w-2xl text-slate-300">{video.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="glass-btn bg-sky-500/25 text-sky-100 hover:bg-sky-500/40">Лайк</button>
                  <button className="rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 transition hover:border-sky-300/60">Скачать</button>
                  <button className="rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm text-slate-200 transition hover:border-sky-300/60">Поделиться</button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:grid-cols-2">
                <div>
                  <p><span className="font-semibold text-slate-100">Автор: </span>{video.author.name}</p>
                  <p><span className="font-semibold text-slate-100">Дата публикации: </span>{formatAgo(video.publishedAt)}</p>
                </div>
                <div>
                  <p><span className="font-semibold text-slate-100">Просмотров: </span>{video.views.toLocaleString('ru-RU')}</p>
                  <p><span className="font-semibold text-slate-100">Лайков: </span>{video.likeCount.toLocaleString('ru-RU')}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <a key={tag.id} href={`/tags/${tag.slug}`} className="glass-chip">#{tag.name}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <RelatedVideos />
            <CommentsSection />
          </div>
        </div>
      </div>
    </main>
  );
}
