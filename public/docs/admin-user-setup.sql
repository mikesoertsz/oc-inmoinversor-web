-- Admin User Setup Script for mike@inmoinversor.com
-- This script ensures mike@inmoinversor.com has super_admin access everywhere

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

-- Ensure RLS policies allow super_admin access to everything
-- Update existing policies to include super_admin role

-- Policy for admin_users table - super_admin can do everything
DROP POLICY IF EXISTS "Super admins can manage all admin users" ON public.admin_users;
CREATE POLICY "Super admins can manage all admin users" ON public.admin_users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
        )
    );

-- Policy for regular admins - they can view their own record
DROP POLICY IF EXISTS "Admins can view own profile" ON public.admin_users;
CREATE POLICY "Admins can view own profile" ON public.admin_users
    FOR SELECT USING (
        auth.uid() = id OR
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
        )
    );

-- Grant additional permissions for super_admin
-- This ensures mike@inmoinversor.com has access to everything

-- Create a function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = user_id AND role = 'super_admin' AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION is_super_admin(UUID) TO authenticated;

-- Verify the setup
SELECT 
  au.email,
  au.role,
  au.is_active,
  au.created_at,
  au.updated_at
FROM public.admin_users au
WHERE au.email = 'mike@inmoinversor.com';

-- Show current user permissions
SELECT 
  'mike@inmoinversor.com setup complete' as status,
  'super_admin role assigned' as role_status,
  'full access granted' as access_status;
