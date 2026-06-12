import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';
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

async function getAllVideos() {
  return prisma.video.findMany({
    where: { privacy: 'PUBLIC' },
    orderBy: { publishedAt: 'desc' },
    include: { author: true, tags: true },
  });
}

export default async function MediaPage() {
  const videos = await getAllVideos();

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="media" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-white">Все видео</h1>
                <p className="mt-2 text-slate-400">Полный каталог медиа с гибкими режимами просмотра.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] bg-slate-900/80 px-4 py-3 ring-1 ring-sky-400/10">
                <button className="glass-btn bg-sky-500/25 text-sky-100 hover:bg-sky-500/40">Сетка</button>
                <button className="glass-btn bg-slate-900/70 text-slate-100 hover:bg-sky-500/30">Список</button>
                <button className="glass-btn bg-slate-900/70 text-slate-100 hover:bg-sky-500/30">Хронология</button>
              </div>
            </div>
          </div>

          <VideoGrid
            videos={videos.map((video) => ({
              id: video.id,
              title: video.title,
              description: video.description,
              author: video.author.name,
              views: `${video.views.toLocaleString('ru-RU')} просмотров`,
              publishedAt: formatAgo(video.publishedAt),
              thumbnail: video.thumbnailUrl,
              tags: video.tags.map((tag) => tag.name),
              slug: video.slug,
            }))}
          />
        </section>
      </div>
    </main>
  );
}
