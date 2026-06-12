import Sidebar from '@/components/Sidebar';

export default function ProfilePage() {
  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="profile" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-slate-800 ring-1 ring-sky-400/15"></div>
                <div>
                  <h1 className="text-3xl font-semibold text-white">Veronika Blaze</h1>
                  <p className="mt-2 text-slate-400">Создатель премиальных медиа-опытов.</p>
                </div>
              </div>
              <button className="glass-btn bg-sky-500/25 text-sky-100 hover:bg-sky-500/40">Редактировать профиль</button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold text-white">Загруженные видео</h2>
              <p className="mt-3 text-slate-400">12 видео</p>
            </div>
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold text-white">Плейлисты</h2>
              <p className="mt-3 text-slate-400">5 коллекций</p>
            </div>
            <div className="glass-panel p-5">
              <h2 className="text-lg font-semibold text-white">Избранное</h2>
              <p className="mt-3 text-slate-400">8 видео</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold text-white">История просмотров</h2>
                <p className="mt-2 text-slate-400">Последние просмотренные видео, чтобы вы могли продолжить в любой момент.</p>
              </div>
              <div className="grid gap-3">
                <div className="rounded-[1.75rem] bg-slate-950/80 p-4 border border-white/10">
                  <p className="text-sm text-slate-400">Glassmorphism Motion Story</p>
                  <p className="mt-2 text-sm text-slate-200">12% просмотрено</p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-950/80 p-4 border border-white/10">
                  <p className="text-sm text-slate-400">Modern Media Platform Workflow</p>
                  <p className="mt-2 text-sm text-slate-200">38% просмотрено</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
