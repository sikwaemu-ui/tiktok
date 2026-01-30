import HomeLayout from "@/components/HomeLayout";

export default function ExplorePage() {
  return (
    <HomeLayout>
      <div className="p-6 pt-20 lg:pt-6">
        <h1 className="text-2xl font-bold mb-4">Explore</h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-9/16 rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
