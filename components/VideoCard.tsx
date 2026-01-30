"use client";

import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function VideoCard({ video }: any) {
  const { isDarkMode } = useDarkMode();
  const ref = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const vid = ref.current;
    if (!vid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? vid.play() : vid.pause();
      },
      { threshold: 0.6 }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const formatNumber = (num: string) => {
    const number = parseFloat(num.replace(/[^0-9.]/g, ''));
    if (num.includes('M')) return `${(number / 1000000).toFixed(1)}M`;
    if (num.includes('K')) return `${(number / 1000).toFixed(1)}K`;
    return num;
  };

  return (
    <div className="flex snap-start justify-center py-4 sm:py-8">
      {/* Video */}
      <div
        className="
          relative
          h-[80vh]
          w-full
          max-w-[420px]
          overflow-hidden
          bg-gray-600
          sm:rounded-xl
        "
      >
        <video
          ref={ref}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />

        {/* Video Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              <img 
                src={video.avatar} 
                alt={video.displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${video.displayName}&background=random`;
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">
                  @{video.username}
                </span>
                {video.verified && (
                  <span className="text-blue-400 text-xs">✓</span>
                )}
              </div>
              <span className="text-gray-300 text-xs">{video.displayName}</span>
            </div>
            <button
              onClick={handleFollow}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                isFollowing 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-[var(--zm-red)] text-white hover:bg-red-600'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Caption */}
          <p className="text-white text-sm mb-2 line-clamp-2">
            {video.caption}
          </p>

          {/* Music Info */}
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <span>🎵</span>
            <span>Original sound - @{video.username}</span>
          </div>
        </div>

        {/* View Count */}
        <div className="absolute top-4 right-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
          👁 {formatNumber(video.views)} views
        </div>
      </div>

      {/* Action rail (desktop only) */}
      <div className="ml-4 hidden flex-col items-center gap-4 sm:flex">
        {/* Like Button */}
        <div className="flex flex-col items-center">
          <button 
            onClick={handleLike}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
          <span className="text-xs text-gray-600">{formatNumber(video.likes)}</span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center">
          <button className="text-2xl hover:scale-110 transition-transform">
            💬
          </button>
          <span className="text-xs text-gray-600">{formatNumber(video.comments)}</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <button className="text-2xl hover:scale-110 transition-transform">
            ↗️
          </button>
          <span className="text-xs text-gray-600">{formatNumber(video.shares || '0')}</span>
        </div>

        {/* Save Button */}
        <div className="flex flex-col items-center">
          <button className="text-2xl hover:scale-110 transition-transform">
            📌
          </button>
          <span className="text-xs text-gray-600">Save</span>
        </div>

        {/* More Options */}
        <button className="text-2xl hover:scale-110 transition-transform">
          ⋯
        </button>
      </div>

      {/* Mobile Actions */}
      <div className="fixed bottom-20 right-4 flex gap-4 sm:hidden">
        <button 
          onClick={handleLike}
          className="text-2xl"
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <button className="text-2xl">💬</button>
        <button className="text-2xl">↗️</button>
      </div>
    </div>
  );
}
