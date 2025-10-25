// Test Supabase connection
import { createClient } from "./client";

export async function testSupabaseConnection() {
  try {
    const supabase = createClient();

    // Test basic connection
    const { data, error } = await supabase
      .from("admin_users")
      .select("count")
      .limit(1);

    if (error) {
      console.error("Supabase connection error:", error);
      return { success: false, error: error.message };
    }

    console.log("Supabase connection successful");
    return { success: true, data };
  } catch (error) {
    console.error("Supabase connection failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
