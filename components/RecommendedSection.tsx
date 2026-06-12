import Link from 'next/link';

interface RecommendedSectionProps {
  videos: {
    id: string;
    title: string;
    author: string;
    thumbnail: string;
    slug: string;
  }[];
}

export default function RecommendedSection({ videos }: RecommendedSectionProps) {
  return (
    <section className="glass-card p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Рекомендуемое</h2>
        <p className="text-sm text-slate-400">Видео, выбранные для вашего следующего просмотра.</p>
      </div>
      <div className="space-y-4">
        {videos.map((video) => (
          <Link key={video.id} href={`/video/${video.slug}`} className="glass-panel flex items-center gap-3 p-3 transition hover:border-sky-300/40 hover:bg-slate-900/90">
            <img src={video.thumbnail} alt={video.title} className="h-20 w-28 rounded-3xl object-cover" />
            <div>
              <p className="font-semibold text-white">{video.title}</p>
              <p className="text-sm text-slate-400">{video.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
