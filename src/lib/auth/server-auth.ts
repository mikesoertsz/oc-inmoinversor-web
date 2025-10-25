import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { AdminUser } from "@/lib/supabase/types";

/**
 * Server-side function to verify admin authentication
 * @returns Object with user, adminUser, and error response if unauthorized
 */
export async function verifyAdminAuth(): Promise<{
  user: { id: string; email?: string } | null;
  adminUser: AdminUser | null;
  error?: NextResponse;
}> {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        user: null,
        adminUser: null,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }

    // Check admin status
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (adminError || !adminUser || !adminUser.is_active) {
      return {
        user,
        adminUser: null,
        error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
      };
    }

    return {
      user,
      adminUser,
    };
  } catch (error) {
    console.error("Error verifying admin auth:", error);
    return {
      user: null,
      adminUser: null,
      error: NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      ),
    };
  }
}

/**
 * Server-side function to verify super admin authentication
 * @returns Object with user, adminUser, and error response if unauthorized
 */
export async function verifySuperAdminAuth(): Promise<{
  user: { id: string; email?: string } | null;
  adminUser: AdminUser | null;
  error?: NextResponse;
}> {
  const result = await verifyAdminAuth();

  if (result.error) {
    return result;
  }

  if (result.adminUser?.role !== "super_admin") {
    return {
      ...result,
      error: NextResponse.json(
        { error: "Super admin access required" },
        { status: 403 }
      ),
    };
  }

  return result;
}
