import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Protected dashboard page - requires authentication
 */
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-bold">Protected Dashboard</h1>
        <p className="mb-6 text-gray-600">
          This page requires authentication. You are logged in as:
        </p>
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <p className="font-semibold">Email:</p>
          <p className="text-gray-700">{session.user.email}</p>
        </div>
        <form action={handleSignOut}>
          <button
            type="submit"
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
