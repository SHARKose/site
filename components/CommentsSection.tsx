export default function CommentsSection() {
  return (
    <section className="glass-card p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Комментарии</h2>
        <p className="text-sm text-slate-400">Поддержите автора, задав вопрос или оставив отзыв.</p>
      </div>
      <div className="space-y-4">
        <article className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 ring-1 ring-white/10"></div>
            <div>
              <p className="font-medium text-white">Alex Reid</p>
              <p className="text-xs text-slate-500">2 часа назад</p>
            </div>
          </div>
          <p className="mt-3 text-slate-300">Этот контент выглядит очень стильно, особенно анимации и структура.</p>
        </article>
        <article className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800 ring-1 ring-white/10"></div>
            <div>
              <p className="font-medium text-white">Lena Hart</p>
              <p className="text-xs text-slate-500">6 часов назад</p>
            </div>
          </div>
          <p className="mt-3 text-slate-300">Идеальная платформа для авторов и зрителей, всё выгляди современно.</p>
        </article>
      </div>
    </section>
  );
}
