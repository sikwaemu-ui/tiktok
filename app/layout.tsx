/**
 * Root Layout
 * Provides the HTML structure and global styles
 * All routes render within this layout
 */

import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "TikTok",
  description: "Share and discover videos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
