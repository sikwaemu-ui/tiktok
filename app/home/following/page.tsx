import HomeLayout from "@/components/HomeLayout";

export default function FollowingPage() {
  return (
    <HomeLayout>
      <div className="p-6 pt-20 lg:pt-6">
        <h1 className="text-2xl font-bold mb-4">Following</h1>
        <p className="text-gray-600">
          Videos from accounts you follow will appear here.
        </p>
      </div>
    </HomeLayout>
  );
}
