"use client";

import { useCallback, useState } from "react";
import VideoCard from "@/components/VideoCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { sampleVideos } from "@/data/sampleUsers";
import { useDarkMode } from "@/contexts/DarkModeContext";

export default function ForYou() {
  const { isDarkMode } = useDarkMode();
  const [videos, setVideos] = useState(sampleVideos);
  const [loading, setLoading] = useState(false);

  // Simulate loading more videos
  const loadMoreVideos = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Shuffle and add more videos (in real app, this would be an API call)
    const moreVideos = sampleVideos.map(video => ({
      ...video,
      id: `${video.id}_${Date.now()}`,
      likes: Math.floor(Math.random() * 5000000).toString(),
      comments: Math.floor(Math.random() * 100000).toString(),
      views: Math.floor(Math.random() * 10000000).toString(),
    }));
    
    setVideos(prev => [...prev, ...moreVideos]);
    setLoading(false);
  }, [loading]);

  // Use infinite scroll hook
  useInfiniteScroll(loadMoreVideos);

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className={`rounded-xl p-6 shadow-sm ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h1 className="text-2xl font-bold text-[var(--zm-green)] mb-2">For You</h1>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Videos curated specially for you
        </p>
      </div>

      {/* Video Feed */}
      <div className="grid grid-cols-1 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--zm-green)]"></div>
        </div>
      )}
    </div>
  );
}
