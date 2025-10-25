// Generated database types for Supabase
export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "super_admin";
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          role?: "admin" | "super_admin";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "admin" | "super_admin";
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      admin_users_view: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "super_admin";
          is_active: boolean;
          created_at: string;
          updated_at: string;
          has_auth_account: boolean;
        };
        Relationships: [];
      };
    };
    Functions: {
      create_default_admin: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      handle_new_user: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_updated_at_column: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Type helpers for easier usage
export type AdminUser = Database["public"]["Tables"]["admin_users"]["Row"];
export type AdminUserInsert =
  Database["public"]["Tables"]["admin_users"]["Insert"];
export type AdminUserUpdate =
  Database["public"]["Tables"]["admin_users"]["Update"];
export type AdminUserView =
  Database["public"]["Views"]["admin_users_view"]["Row"];

// Auth types
export type UserRole = "admin" | "super_admin";
export type AdminUserWithAuth = AdminUser & {
  has_auth_account: boolean;
};
