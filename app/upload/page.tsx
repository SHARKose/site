'use client';

import { useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  return (
    <main className="min-h-screen px-4 py-6 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        <Sidebar active="upload" />
        <section className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-white">Загрузить видео</h1>
                <p className="mt-2 text-slate-400">
                  Drag & Drop загрузка с автоматической генерацией превью и управлением приватностью.
                </p>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-6 cursor-pointer rounded-[1.75rem] border border-dashed p-8 text-center transition-colors ${
                dragging
                  ? 'border-sky-400 bg-sky-500/10'
                  : 'border-white/10 bg-slate-950/60 hover:border-white/25 hover:bg-slate-900/60'
              }`}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-sky-300">✓ Файл выбран</p>
                  <p className="text-slate-400">{selectedFile.name}</p>
                  <p className="text-sm text-slate-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(1)} МБ
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-lg text-slate-200">Перетащите видео сюда или выберите файл</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="glass-btn mt-5 bg-sky-500/25 text-sky-100 hover:bg-sky-500/40"
                  >
                    Выбрать файл
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <section className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white">Параметры публикации</h2>
              <div className="mt-5 space-y-4 text-slate-300">
                <label className="block text-sm font-medium">Заголовок</label>
                <input
                  className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none"
                  placeholder="Название видео"
                />
                <label className="block text-sm font-medium">Описание</label>
                <textarea
                  className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none"
                  rows={5}
                  placeholder="Описание видео"
                />
                <label className="block text-sm font-medium">Теги</label>
                <input
                  className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none"
                  placeholder="design, music, travel"
                />
                <label className="block text-sm font-medium">Приватность</label>
                <select className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none">
                  <option>Публичное</option>
                  <option>Только по ссылке</option>
                  <option>Приватное</option>
                </select>
              </div>
            </section>

            <section className="glass-card p-6">
              <h2 className="text-xl font-semibold text-white">Дополнительные настройки</h2>
              <div className="mt-5 space-y-4 text-slate-300">
                <label className="block text-sm font-medium">Выбрать плейлист</label>
                <select className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none">
                  <option>Без плейлиста</option>
                  <option>Design Stories</option>
                  <option>Premium Releases</option>
                </select>
                <label className="block text-sm font-medium">Автоматическое превью</label>
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/90 p-4">
                  <p className="text-sm text-slate-300">
                    Система создаст динамическое превью на основе ключевых кадров.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!selectedFile}
                  className="glass-btn mt-4 w-full bg-sky-500/25 text-sky-100 hover:bg-sky-500/40 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Опубликовать
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
