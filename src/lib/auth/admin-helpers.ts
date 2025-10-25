import { createClient } from "@/lib/supabase/server";
import type { AdminUser } from "@/lib/supabase/types";

/**
 * Check if the current user has super admin privileges
 */
export async function isSuperAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("role, is_active")
      .eq("id", user.id)
      .single();

    return adminUser?.role === "super_admin" && adminUser?.is_active === true;
  } catch (error) {
    console.error("Error checking super admin status:", error);
    return false;
  }
}

/**
 * Check if the current user has admin privileges (admin or super_admin)
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("role, is_active")
      .eq("id", user.id)
      .in("role", ["admin", "super_admin"])
      .single();

    return adminUser?.is_active === true;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Get the current admin user with full details
 */
export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single();

    return adminUser;
  } catch (error) {
    console.error("Error getting current admin user:", error);
    return null;
  }
}

/**
 * Check if a user has specific admin role
 */
export function hasRole(
  adminUser: AdminUser | null,
  role: "admin" | "super_admin"
): boolean {
  return adminUser?.role === role && adminUser?.is_active === true;
}

/**
 * Check if a user has super admin or specific role
 */
export function hasRoleOrSuperAdmin(
  adminUser: AdminUser | null,
  role: "admin" | "super_admin"
): boolean {
  return (
    adminUser?.is_active === true &&
    (adminUser?.role === "super_admin" || adminUser?.role === role)
  );
}
