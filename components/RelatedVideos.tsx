import Link from 'next/link';

const related = [
  {
    id: '3',
    title: 'Принципы UI Motion для платформ',
    author: 'Lena Hart',
    thumbnail: '/thumbnails/ui-motion.jpg',
    slug: 'ui-motion-principles',
    duration: '12:15',
  },
  {
    id: '4',
    title: 'Стратегия релиза медиа-контента',
    author: 'Roman Bolt',
    thumbnail: '/thumbnails/media-strategy.jpg',
    slug: 'media-release-strategy',
    duration: '9:38',
  },
];

export default function RelatedVideos() {
  return (
    <section className="glass-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Похожие видео</h2>
          <p className="text-sm text-slate-400">Новые идеи и похожие рекомендации.</p>
        </div>
        <span className="text-sm text-slate-400">2</span>
      </div>
      <div className="space-y-4">
        {related.map((video) => (
          <Link key={video.id} href={`/video/${video.slug}`} className="glass-panel flex items-center gap-3 p-3 transition hover:border-sky-300/40 hover:bg-slate-900/90">
            <img src={video.thumbnail} alt={video.title} className="h-20 w-28 rounded-3xl object-cover" />
            <div>
              <p className="font-semibold text-white">{video.title}</p>
              <p className="text-sm text-slate-400">{video.author}</p>
              <span className="mt-2 inline-flex rounded-full bg-slate-900/90 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">{video.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
