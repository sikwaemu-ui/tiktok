"use client";

import { useCallback, useState } from "react";
import VideoCard from "@/components/VideoCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { sampleVideos } from "@/data/sampleUsers";

export default function Home() {
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
      {/* Trending Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-lg font-bold text-[var(--zm-green)] mb-3">🔥 Trending Now</h2>
        <div className="flex gap-2 flex-wrap">
          {["#ZambianDance", "#TikTok", "#Comedy", "#Fitness", "#Zambia"].map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-[var(--zm-green)] hover:text-white transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
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
