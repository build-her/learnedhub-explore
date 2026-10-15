import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import AdminHeader from "@/components/AdminHeader";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  // Verify cookie signature and expiry on every request
  // Logged-out or invalid visitors see a plain 404 (notFound)
  if (!sessionToken || !verifyAdminSessionToken(sessionToken)) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-tint">
      <AdminHeader />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

