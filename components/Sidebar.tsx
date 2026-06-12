import Link from 'next/link';
import { Home, LayoutGrid, List, Hash, Heart, Clock3, UploadCloud, User } from 'lucide-react';

const links = [
  { href: '/', label: 'Главная', icon: Home, key: 'home' },
  { href: '/media', label: 'Все видео', icon: LayoutGrid, key: 'media' },
  { href: '/playlists', label: 'Плейлисты', icon: List, key: 'playlists' },
  { href: '/tags', label: 'Хештеги', icon: Hash, key: 'tags' },
  { href: '/favorites', label: 'Избранное', icon: Heart, key: 'favorites' },
  { href: '/history', label: 'История', icon: Clock3, key: 'history' },
  { href: '/upload', label: 'Загрузить видео', icon: UploadCloud, key: 'upload' },
  { href: '/profile', label: 'Профиль', icon: User, key: 'profile' },
];

interface SidebarProps {
  active: string;
}

export default function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="glass-card p-5 xl:h-[calc(100vh-48px)] border-sky-400/10 shadow-glow">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/10">
            MH
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-sky-300/75">MediaHub</p>
            <p className="mt-1 text-lg font-semibold">Видео платформа</p>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-400">Премиум интерфейс с глубоким набором функций для публикации и просмотра.</p>
      </div>
      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;
          const activeItem = item.key === active;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm transition ${activeItem ? 'bg-slate-900/80 text-sky-200 ring-1 ring-sky-400/15' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon className="h-5 w-5 text-sky-300" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
