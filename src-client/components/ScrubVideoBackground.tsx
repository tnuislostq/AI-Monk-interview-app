import React, { useEffect, useRef, useState } from 'react';

interface ScrubVideoBackgroundProps {
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  videoLoaded?: boolean;
  setVideoLoaded?: (loaded: boolean) => void;
}

export const ScrubVideoBackground: React.FC<ScrubVideoBackgroundProps> = ({
  onTimeUpdate,
  setVideoLoaded,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekRef = useRef<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const SENSITIVITY = 0.8;
  const VIDEO_URL =
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';

  useEffect(() => {
    const handleSeek = () => {
      const video = videoRef.current;
      if (!video) return;

      if (pendingSeekRef.current) {
        pendingSeekRef.current = false;
        video.currentTime = targetTimeRef.current;
      } else {
        isSeekingRef.current = false;
      }
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime, video.duration || 0);
    };

    const handleLoadedMetadata = () => {
      const video = videoRef.current;
      if (!video) return;
      setDuration(video.duration);
      targetTimeRef.current = video.currentTime || 0;
      setIsLoaded(true);
      setVideoLoaded?.(true);
      onTimeUpdate?.(video.currentTime, video.duration || 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      // Calculate time offset based on user prompt specification:
      // (delta / window.innerWidth) * SENSITIVITY * video.duration
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = newTarget;
      } else {
        pendingSeekRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    // Mobile touch scrubbing support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || Number.isNaN(video.duration) || e.touches.length === 0) return;

      const currentX = e.touches[0].clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const newTarget = Math.max(0, Math.min(video.duration, targetTimeRef.current + timeOffset));
      targetTimeRef.current = newTarget;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = newTarget;
      } else {
        pendingSeekRef.current = true;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('seeked', handleSeek);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (video) {
        video.removeEventListener('seeked', handleSeek);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onTimeUpdate, setVideoLoaded]);

  return (
    <>
      {/* Full-screen video element strictly adhering to prompt specifications:
          position: fixed; inset: 0; z-index: 0; object-fit: cover; object-position: 70% center; */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 w-full h-full pointer-events-none select-none"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          objectFit: 'cover',
          objectPosition: '70% center',
        }}
      />

      {/* Floating 3D Mountain Leaves (matching the user's reference image) */}
      <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-0"
            style={{
              top: `${15 + (i * 14)}%`,
              right: `${-10 + (i * 4)}%`,
              animation: `driftLeaf ${11 + i * 3.5}s cubic-bezier(0.25, 0.1, 0.25, 1) infinite`,
              animationDelay: `${i * 2.2}s`,
            }}
          >
            {/* Zen leaf SVG */}
            <svg
              className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-600/80 drop-shadow-sm transform rotate-45"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Subtle bottom scrubber indicator & prompt hint */}
      <div className="fixed bottom-3 right-5 sm:bottom-4 sm:right-8 z-10 pointer-events-none select-none flex items-center gap-2 text-[11px] sm:text-xs text-black/60 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono tracking-tight">
          {currentTime.toFixed(1)}s / {duration ? `${duration.toFixed(1)}s` : '--'}
        </span>
        <span className="hidden sm:inline text-black/40">|</span>
        <span className="hidden sm:inline">↔ Move mouse horizontally to scrub</span>
      </div>
    </>
  );
};
