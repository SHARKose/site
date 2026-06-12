'use client';

import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, thumbnail, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!videoRef.current || playerRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      fluid: true,
      preload: 'auto',
      poster: thumbnail,
      playbackRates: [0.5, 1, 1.5, 2],
      html5: { nativeControlsForTouch: false },
    });

    playerRef.current = player;

    player.on('loadedmetadata', () => {
      const savedTime = localStorage.getItem(`mediahub-progress-${title}`);
      if (savedTime) {
        player.currentTime(Number(savedTime));
      }
    });

    player.on('timeupdate', () => {
      localStorage.setItem(`mediahub-progress-${title}`, String(player.currentTime()));
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [thumbnail, title]);

  return (
    <div className="relative overflow-hidden">
      {isClient ? (
        <div data-vjs-player>
          <video ref={videoRef} className="video-js vjs-big-play-centered">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="h-[420px] w-full rounded-b-[2rem] bg-slate-900"></div>
      )}
    </div>
  );
}
