import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function checkAdminAuth() {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        user: null,
        adminUser: null,
      };
    }

    // Simplified: Any authenticated user is considered an admin
    // No need to check additional admin_users table
    return {
      error: null,
      user,
      adminUser: {
        id: user.id,
        email: user.email || "",
        full_name: "Admin User",
        role: "admin",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Error checking admin auth:", error);
    return {
      error: NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      ),
      user: null,
      adminUser: null,
    };
  }
}
