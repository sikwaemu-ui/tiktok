"use client";

import { useState } from "react";
import { sampleUsers, sampleVideos } from "@/data/sampleUsers";
import HomeLayout from "@/components/HomeLayout";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"videos" | "liked">("videos");
  
  // Use first sample user as the profile owner
  const userProfile = sampleUsers[0]; // realjaylinn
  const userVideos = sampleVideos.filter(video => video.username === userProfile.username);

  return (
    <HomeLayout>
      <div className="p-6 pt-20 lg:pt-6 max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
              <img 
                src={userProfile.avatar}
                alt={userProfile.displayName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${userProfile.displayName}&background=random&size=96`;
                }}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                <h1 className="text-2xl font-bold">@{userProfile.username}</h1>
                {userProfile.verified && (
                  <span className="text-blue-400 text-lg">✓</span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{userProfile.bio}</p>
              
              {/* Stats */}
              <div className="flex gap-6 justify-center sm:justify-start mb-4">
                <div className="text-center">
                  <div className="font-bold text-lg">{userVideos.length}</div>
                  <div className="text-gray-500 text-sm">Videos</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{userProfile.followers}</div>
                  <div className="text-gray-500 text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{userProfile.following}</div>
                  <div className="text-gray-500 text-sm">Following</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center sm:justify-start">
                <button className="px-6 py-2 bg-[var(--zm-green)] text-white rounded-full font-semibold hover:bg-[var(--zm-black)] transition-colors">
                  Follow
                </button>
                <button className="px-6 py-2 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 transition-colors">
                  Message
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                  ⋯
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 py-3 font-semibold transition-colors ${
                activeTab === "videos"
                  ? "text-[var(--zm-green)] border-b-2 border-[var(--zm-green)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab("liked")}
              className={`flex-1 py-3 font-semibold transition-colors ${
                activeTab === "liked"
                  ? "text-[var(--zm-green)] border-b-2 border-[var(--zm-green)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Liked
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "videos" ? (
              <div className="grid grid-cols-3 gap-1">
                {userVideos.map((video) => (
                  <div key={video.id} className="relative aspect-[9/16] bg-gray-200 rounded overflow-hidden group">
                    <img 
                      src={video.thumbnail}
                      alt={video.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/seed/${video.id}/300/533.jpg`;
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <div className="flex items-center gap-1 text-white text-xs">
                        <span>▶️</span>
                        <span>{(parseFloat(video.views.replace(/[^0-9.]/g, '')) / 1000000).toFixed(1)}M</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">🔒</div>
                <p>This user's liked videos are private</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
