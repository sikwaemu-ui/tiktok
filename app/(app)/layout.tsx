import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <TopNav />

      <main className="min-h-screen bg-transparent relative z-10">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </>
  );
}
