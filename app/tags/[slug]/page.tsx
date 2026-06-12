import Sidebar from '@/components/Sidebar';

const sampleVideos = [
  {
    id: '8',
    title: 'Дизайн для медиа 2026',
    description: 'Тренды и подходы к медиа-продуктам следующего поколения.',
    author: 'Nikita Star',
    views: '9.2K',
    publishedAt: '3 дня назад',
    thumbnail: '/thumbnails/design-media.jpg',
    tags: ['design'],
    slug: 'design-media-2026',
  },
];

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="tags" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <h1 className="text-3xl font-semibold text-white">#{slug}</h1>
            <p className="mt-2 text-slate-400">Видео по этой теме и связанные подборки.</p>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white">Видео в теге</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {sampleVideos.map((video) => (
                <a key={video.id} href={`/video/${video.slug}`} className="glass-panel p-4 transition hover:-translate-y-1 hover:border-sky-300/40">
                  <div className="mb-3 overflow-hidden rounded-[1.75rem]">
                    <img src={video.thumbnail} alt={video.title} className="h-44 w-full object-cover" />
                  </div>
                  <p className="text-lg font-semibold text-white">{video.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{video.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
