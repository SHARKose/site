import Sidebar from '@/components/Sidebar';

export default function PlaylistsPage() {
  const playlists = [
    { id: '1', title: 'Premium Releases', description: 'Избранные видео для вдохновения.', count: 8 },
    { id: '2', title: 'UI Motion', description: 'Плейлист с лучшими видео о motion-дизайне.', count: 5 },
  ];

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="playlists" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-white">Плейлисты</h1>
                <p className="mt-2 text-slate-400">Управляйте коллекциями, делитесь и сохраняйте подборки.</p>
              </div>
              <button className="glass-btn bg-sky-500/25 text-sky-100 hover:bg-sky-500/40">Создать плейлист</button>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="glass-panel p-5 transition hover:-translate-y-1 hover:border-sky-300/30">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{playlist.title}</h2>
                    <p className="mt-2 text-slate-400">{playlist.description}</p>
                  </div>
                  <span className="glass-chip bg-slate-900/80 border-white/10 text-slate-300">{playlist.count} видео</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="glass-btn bg-sky-500/20 text-sky-100 hover:bg-sky-500/35">Просмотреть</button>
                  <button className="rounded-3xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/70">Поделиться</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
