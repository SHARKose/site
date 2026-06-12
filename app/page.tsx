import { Prisma } from '@prisma/client';
import VideoGrid from '@/components/VideoGrid';
import Sidebar from '@/components/Sidebar';
import TagPills from '@/components/TagPills';
import RecommendedSection from '@/components/RecommendedSection';
import { prisma } from '@/lib/prisma';

// Эта строка заставляет Next.js выполнять этот запрос только 
// при запросе реального пользователя, предотвращая зависание билда
export const dynamic = 'force-dynamic';

const formatAgo = (publishedAt: Date) => {
  const diff = Date.now() - publishedAt.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return 'Сегодня';
  if (days === 1) return '1 день назад';
  if (days < 7) return `${days} дня назад`;
  return publishedAt.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};

async function getHomeData() {
  const [videos, tags] = await prisma.$transaction([
    prisma.video.findMany({
      where: { privacy: 'PUBLIC' },
      orderBy: { publishedAt: 'desc' },
      take: 8,
      include: { author: true, tags: true },
    }),
    prisma.tag.findMany({
      orderBy: { name: 'asc' },
      take: 12,
    }),
  ]);

  return {
    videos: videos ?? [],
    tags: tags ?? [],
  };
}

export default async function Home() {
  const { videos, tags } = await getHomeData();

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="home" />

        <section className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-sm uppercase tracking-[0.32em] text-sky-300/75">Рекомендуемые</span>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Премиум видео платформа</h1>
                <p className="mt-3 max-w-2xl text-slate-300">Открывайте, публикуйте и делитесь видео с высококлассным интерфейсом и умным поиском.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 rounded-[1.75rem] bg-slate-900/80 px-4 py-3 shadow-glow ring-1 ring-sky-400/10">
                <span className="text-slate-300">Сортировка:</span>
                <select className="rounded-full bg-slate-950/90 px-4 py-2 text-slate-100 outline-none ring-1 ring-slate-700 transition focus:ring-sky-400">
                  <option>Новые</option>
                  <option>Популярные</option>
                  <option>По просмотрам</option>
                  <option>По дате</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <VideoGrid
                videos={videos?.map((video) => ({
                  id: video.id,
                  title: video.title,
                  description: video.description,
                  author: video.author.name,
                  views: `${video.views.toLocaleString('ru-RU')} просмотров`,
                  publishedAt: formatAgo(video.publishedAt),
                  thumbnail: video.thumbnailUrl,
                  tags: video.tags.map((tag) => tag.name),
                  slug: video.slug,
                })) ?? []}
              />
            </div>
            <div className="space-y-6">
              <TagPills tags={tags?.map((tag) => tag.name) ?? []} />
              <RecommendedSection
                videos={videos?.slice(0, 4).map((video) => ({
                  id: video.id,
                  title: video.title,
                  author: video.author.name,
                  thumbnail: video.thumbnailUrl,
                  slug: video.slug,
                })) ?? []}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}