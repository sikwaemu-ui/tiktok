export default function LivePage() {
  return (
    <div className="p-6 pt-20 lg:pt-6">
      <h1 className="text-2xl font-bold mb-4">LIVE</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 rounded-lg bg-red-200"
          />
        ))}
      </div>
    </div>
  );
}
