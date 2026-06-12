import Sidebar from '@/components/Sidebar';
import VideoGrid from '@/components/VideoGrid';

const favoriteVideos = [
  {
    id: '7',
    title: 'Premium SaaS Media Tiles',
    description: 'Идеальный пример медиа-контента для премиального UX.',
    author: 'Nina Vale',
    views: '16K',
    publishedAt: '5 дней назад',
    thumbnail: '/thumbnails/saas-media.jpg',
    tags: ['design', 'music'],
    slug: 'premium-saas-media-tiles',
  },
];

export default function FavoritesPage() {
  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="favorites" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-white">Избранное</h1>
                <p className="mt-2 text-slate-400">Ваши сохраненные видео и персональные подборки.</p>
              </div>
              <button className="glass-btn bg-sky-500/25 text-sky-100 hover:bg-sky-500/40">Управление</button>
            </div>
          </div>
          <VideoGrid videos={favoriteVideos} />
        </section>
      </div>
    </main>
  );
}
