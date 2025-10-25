// Supabase client exports
export { createClient } from "./client";
export { createClient as createServerClient } from "./server";

// Type exports
export type {
  Database,
  AdminUser,
  AdminUserInsert,
  AdminUserUpdate,
  AdminUserView,
  UserRole,
  AdminUserWithAuth,
} from "./types";
