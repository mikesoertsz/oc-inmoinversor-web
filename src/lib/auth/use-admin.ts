import { useAuth } from "./auth-context";

/**
 * Hook to check if the current user is an admin
 * @returns Object with admin status and role information
 */
export function useAdmin() {
  const { user, adminUser, loading } = useAuth();

  const isAdmin = !!(user && adminUser && adminUser.is_active);
  const isSuperAdmin = isAdmin && adminUser?.role === "super_admin";
  const isRegularAdmin = isAdmin && adminUser?.role === "admin";

  return {
    isAdmin,
    isSuperAdmin,
    isRegularAdmin,
    adminUser,
    loading,
  };
}
