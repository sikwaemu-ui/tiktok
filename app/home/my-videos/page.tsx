import HomeLayout from "@/components/HomeLayout";

export default function MyVideosPage() {
  return (
    <HomeLayout>
      <div className="p-6 pt-20 lg:pt-6">
        <h1 className="text-2xl font-bold mb-4">My Videos</h1>
        
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="relative aspect-[9/16] bg-gray-200 rounded overflow-hidden group">
              <div className="w-full h-full bg-gray-300 group-hover:scale-105 transition-transform"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <div className="flex items-center gap-1 text-white text-xs">
                  <span>▶️</span>
                  <span>{Math.floor(Math.random() * 1000)}K</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
