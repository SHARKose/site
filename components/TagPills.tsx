interface TagPillsProps {
  tags: string[];
}

export default function TagPills({ tags }: TagPillsProps) {
  return (
    <section className="glass-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Популярные теги</h2>
          <p className="text-sm text-slate-400">Навигация по темам и быстрый доступ.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <a key={tag} href={`/tags/${tag}`} className="glass-chip">
            #{tag}
          </a>
        ))}
      </div>
    </section>
  );
}
