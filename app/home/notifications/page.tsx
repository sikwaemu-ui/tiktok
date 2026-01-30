import HomeLayout from "@/components/HomeLayout";

export default function NotificationsPage() {
  return (
    <HomeLayout>
      <div className="max-w-2xl mx-auto p-6 pt-20 lg:pt-6">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {i === 0 && "New follower"}
                    {i === 1 && "Someone liked your video"}
                    {i === 2 && "New comment on your video"}
                    {i === 3 && "Someone mentioned you"}
                    {i === 4 && "Video upload completed"}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {i === 0 && "@user123 started following you"}
                    {i === 1 && "@creator456 liked your video 'Amazing content'"}
                    {i === 2 && "@viewer789 commented: 'Great video!'"}
                    {i === 3 && "@friend456 mentioned you in a comment"}
                    {i === 4 && "Your video 'My latest creation' is now live"}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {i === 0 && "2 minutes ago"}
                    {i === 1 && "15 minutes ago"}
                    {i === 2 && "1 hour ago"}
                    {i === 3 && "2 hours ago"}
                    {i === 4 && "3 hours ago"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}
