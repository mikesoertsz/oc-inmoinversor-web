"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, adminUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Check if user is authenticated
    if (!user) {
      router.push(redirectTo);
      return;
    }

    // Check if admin access is required
    if (requireAdmin && (!adminUser || !adminUser.is_active)) {
      router.push(redirectTo);
      return;
    }
  }, [user, adminUser, loading, requireAdmin, redirectTo, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or admin access required
  if (!user || (requireAdmin && (!adminUser || !adminUser.is_active))) {
    return null;
  }

  return <>{children}</>;
}
