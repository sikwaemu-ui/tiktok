/**
 * Auth Layout Route
 * Wraps all auth routes with minimal layout (no Sidebar/TopNav)
 * Only renders the children content
 */

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: AuthLayoutProps) {
  return <>{children}</>;
}
