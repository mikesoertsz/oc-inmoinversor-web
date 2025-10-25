/**
 * Database Setup Script
 * Creates the necessary tables and admin user for authentication
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

// Test configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔧 Starting Database Setup...\n");

// Create Supabase client with service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// SQL to create admin_users table
const createAdminUsersTable = `
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Super admins can manage all admin users" ON public.admin_users;
CREATE POLICY "Super admins can manage all admin users" ON public.admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
        )
    );

DROP POLICY IF EXISTS "Admins can view own profile" ON public.admin_users;
CREATE POLICY "Admins can view own profile" ON public.admin_users
    FOR SELECT USING (
        auth.uid() = id OR
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
        )
    );
`;

// SQL to create admin user
const createAdminUser = `
-- First, create the user in auth.users if it doesn't exist
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  uuid_generate_v4(),
  'mike@inmoinversor.com',
  crypt('admin', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  true,
  'authenticated'
) ON CONFLICT (email) DO UPDATE SET
  encrypted_password = crypt('admin', gen_salt('bf')),
  email_confirmed_at = now(),
  updated_at = now(),
  is_super_admin = true;

-- Get the user ID for the admin_users table
WITH user_id AS (
  SELECT id FROM auth.users WHERE email = 'mike@inmoinversor.com'
)
-- Insert or update in admin_users table with super_admin role
INSERT INTO public.admin_users (
  id,
  email,
  full_name,
  role,
  is_active,
  created_at,
  updated_at
) 
SELECT 
  user_id.id,
  'mike@inmoinversor.com',
  'Mike Admin',
  'super_admin',
  true,
  now(),
  now()
FROM user_id
ON CONFLICT (id) DO UPDATE SET
  role = 'super_admin',
  is_active = true,
  updated_at = now();
`;

async function setupDatabase() {
  try {
    console.log("1️⃣ Creating admin_users table...");
    const { error: tableError } = await supabase.rpc("exec_sql", {
      sql: createAdminUsersTable,
    });

    if (tableError) {
      console.error("❌ Failed to create table:", tableError.message);
      return false;
    }
    console.log("✅ admin_users table created successfully");

    console.log("\n2️⃣ Creating admin user...");
    const { error: userError } = await supabase.rpc("exec_sql", {
      sql: createAdminUser,
    });

    if (userError) {
      console.error("❌ Failed to create admin user:", userError.message);
      return false;
    }
    console.log("✅ Admin user created successfully");

    console.log("\n3️⃣ Verifying setup...");
    const { data: adminUsers, error: verifyError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", "mike@inmoinversor.com");

    if (verifyError) {
      console.error("❌ Failed to verify admin user:", verifyError.message);
      return false;
    }

    if (adminUsers && adminUsers.length > 0) {
      const user = adminUsers[0];
      console.log("✅ Admin user verified:");
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.is_active}`);
      console.log(`   ID: ${user.id}`);
    } else {
      console.log("❌ Admin user not found after creation");
      return false;
    }

    return true;
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    return false;
  }
}

// Alternative approach using direct SQL execution
async function setupDatabaseAlternative() {
  try {
    console.log("1️⃣ Creating admin_users table (alternative method)...");

    // Try to create table using direct SQL
    const { error: tableError } = await supabase
      .from("admin_users")
      .select("count")
      .limit(1);

    if (
      tableError &&
      tableError.message.includes(
        'relation "public.admin_users" does not exist'
      )
    ) {
      console.log("❌ admin_users table does not exist");
      console.log(
        "💡 You need to run the SQL setup script in your Supabase dashboard:"
      );
      console.log("   1. Go to your Supabase project dashboard");
      console.log("   2. Navigate to SQL Editor");
      console.log("   3. Run the SQL from public/docs/admin-user-setup.sql");
      console.log("   4. Or use the Supabase CLI to run the migration");
      return false;
    }

    console.log("✅ admin_users table exists");

    console.log("\n2️⃣ Checking admin user...");
    const { data: adminUsers, error: verifyError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", "mike@inmoinversor.com");

    if (verifyError) {
      console.error("❌ Failed to check admin user:", verifyError.message);
      return false;
    }

    if (adminUsers && adminUsers.length > 0) {
      const user = adminUsers[0];
      console.log("✅ Admin user found:");
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.is_active}`);
      console.log(`   ID: ${user.id}`);
      return true;
    } else {
      console.log("❌ Admin user not found");
      console.log(
        "💡 You need to create the admin user using the SQL setup script"
      );
      return false;
    }
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    return false;
  }
}

// Run the setup
async function runSetup() {
  console.log("🔧 Database Setup Script");
  console.log("═".repeat(50));

  const success = await setupDatabaseAlternative();

  if (success) {
    console.log("\n🎉 Database setup completed successfully!");
    console.log("✅ You can now test the authentication system");
  } else {
    console.log("\n❌ Database setup failed");
    console.log("\n📋 Next Steps:");
    console.log("   1. Go to your Supabase project dashboard");
    console.log("   2. Navigate to SQL Editor");
    console.log(
      "   3. Copy and run the SQL from: public/docs/admin-user-setup.sql"
    );
    console.log("   4. Run the authentication tests again");
  }
}

runSetup();
