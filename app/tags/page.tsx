import Sidebar from '@/components/Sidebar';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

async function getTags() {
  return prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { videos: true },
  });
}

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="tags" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <h1 className="text-3xl font-semibold text-white">Хештеги</h1>
            <p className="mt-2 text-slate-400">Поиск по темам и быстрый доступ к связанным видео.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tags.map((tag) => (
              <a key={tag.slug} href={`/tags/${tag.slug}`} className="glass-panel p-5 transition hover:-translate-y-1 hover:border-sky-300/40">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-white">#{tag.name}</h2>
                    <p className="mt-2 text-slate-400">{tag.videos.length} видео</p>
                  </div>
                  <span className="glass-chip bg-slate-900/80 border-white/10 text-slate-200">Перейти</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
