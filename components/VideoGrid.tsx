'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  author: string;
  views: string;
  publishedAt: string;
  thumbnail: string;
  tags: string[];
  slug: string;
}

interface VideoGridProps {
  videos: VideoItem[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
      {videos.map((video, index) => (
        <motion.article
          key={video.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          className="glass-card overflow-hidden border border-white/10 shadow-glow"
        >
          <Link href={`/video/${video.slug}`} className="group block overflow-hidden">
            <div className="relative overflow-hidden">
              <img src={video.thumbnail} alt={video.title} className="h-[240px] w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute right-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-slate-200">HD</span>
            </div>
          </Link>
          <div className="p-5">
            <Link href={`/video/${video.slug}`} className="text-lg font-semibold text-white hover:text-sky-300">{video.title}</Link>
            <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">{video.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>{video.author}</span>
              <span className="mx-1">•</span>
              <span>{video.views}</span>
              <span className="mx-1">•</span>
              <span>{video.publishedAt}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {video.tags.map((tag) => (
                <span key={tag} className="glass-chip">#{tag}</span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
