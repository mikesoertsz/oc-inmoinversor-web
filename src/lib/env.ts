// Type-safe environment configuration
export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
} as const;

// Validate required environment variables
if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  throw new Error("Missing required Supabase environment variables");
}

// Only validate service role key in server environment
if (typeof window === "undefined" && !env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing required SUPABASE_SERVICE_ROLE_KEY environment variable"
  );
}
