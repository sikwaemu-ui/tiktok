import HomeLayout from "@/components/HomeLayout";

export default function UploadPage() {
  return (
    <HomeLayout>
      <div className="p-6 pt-20 lg:pt-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Upload</h1>

        <input
          type="file"
          className="w-full rounded border p-3"
        />

        <button className="mt-4 w-full rounded bg-[var(--zm-green)] py-2 text-white font-semibold">
          Upload Video
        </button>
      </div>
    </HomeLayout>
  );
}
