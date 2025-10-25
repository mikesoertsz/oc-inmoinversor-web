import { redirect } from "next/navigation";
import { isSuperAdmin } from "@/lib/auth/admin-helpers";
import AdminUserManagement from "./admin-user-management";

export default async function AdminUsersPage() {
  // Check if current user is super admin
  const isSuper = await isSuperAdmin();

  if (!isSuper) {
    redirect("/admin?error=insufficient_privileges");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Admin User Management
        </h2>
        <p className="text-muted-foreground">
          Manage admin users and their permissions. Only super admins can access
          this page.
        </p>
      </div>

      <AdminUserManagement />
    </div>
  );
}
