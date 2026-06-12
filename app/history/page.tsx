import Sidebar from '@/components/Sidebar';

const history = [
  { title: 'Glassmorphism Motion Story', progress: '12%', time: '2 часа назад' },
  { title: 'Modern Media Platform Workflow', progress: '38%', time: '1 день назад' },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="history" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-white">История</h1>
                <p className="mt-2 text-slate-400">Возвращайтесь к просмотрам и продолжайте воспроизведение.</p>
              </div>
              <button className="glass-btn bg-sky-500/25 text-sky-100 hover:bg-sky-500/40">Очистить историю</button>
            </div>
          </div>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.title} className="glass-panel p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.time}</p>
                  </div>
                  <span className="glass-chip bg-slate-900/80 border-white/10 text-slate-300">{item.progress}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
