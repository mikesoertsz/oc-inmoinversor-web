# Admin Authentication Implementation Plan

_Last Updated: January 2025_

## Overview

This document outlines the implementation plan for creating a secure admin authentication system for the inmoinversor web application. The system will use Supabase for authentication and provide protected access to admin-only features including YouTube API data management.

## Requirements Summary

1. ✅ Create login and backend admin routes
2. ✅ Backend for staff to access private protected data (YouTube API)
3. ✅ Login page with forgot password functionality
4. ✅ Default user: mike@inmoinversor.com / admin
5. ✅ Admin as restricted route
6. ✅ No changes to existing components (navbar, etc.)
7. ✅ Use DEFAULT ShadCN components only (no custom styling)

## Implementation Checklist

### Phase 1: Supabase Setup & Dependencies

- [x] **1.1** Install Supabase packages
  - [x] `@supabase/ssr` (for Next.js 15+ compatibility)
  - [x] `@supabase/supabase-js` (core client)
- [x] **1.2** Create Supabase project and get credentials
- [x] **1.3** Set up environment variables
  - [x] `NEXT_PUBLIC_SUPABASE_URL`
  - [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [x] `SUPABASE_SERVICE_ROLE_KEY` (server-only)

### Phase 2: Database Schema & Security

- [ ] **2.1** Create admin users table with RLS
  ```sql
  CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
  );
  ```
- [ ] **2.2** Enable Row Level Security (RLS)
- [ ] **2.3** Create RLS policies for admin access
- [ ] **2.4** Set up automatic timestamp triggers
- [ ] **2.5** Create default admin user (mike@inmoinversor.com)

### Phase 3: Supabase Client Configuration

- [ ] **3.1** Create client-side Supabase client (`src/lib/supabase/client.ts`)
- [ ] **3.2** Create server-side Supabase client (`src/lib/supabase/server.ts`)
- [ ] **3.3** Create environment configuration (`src/lib/env.ts`)
- [ ] **3.4** Generate TypeScript database types

### Phase 4: Authentication Context & Hooks

- [ ] **4.1** Create AuthContext with proper typing
- [ ] **4.2** Implement useAuth hook
- [ ] **4.3** Add AuthProvider to root layout
- [ ] **4.4** Handle loading states and error handling

### Phase 5: Middleware & Route Protection

- [ ] **5.1** Create middleware for session management
- [ ] **5.2** Implement route protection logic
- [ ] **5.3** Handle redirects for unauthorized access
- [ ] **5.4** Configure middleware to protect `/admin` routes

### Phase 6: Login Page Implementation

- [ ] **6.1** Create login page (`src/app/login/page.tsx`)
- [ ] **6.2** Implement login form with ShadCN components
  - [ ] Email input field
  - [ ] Password input field
  - [ ] Login button
  - [ ] Forgot password link
- [ ] **6.3** Add form validation with Zod
- [ ] **6.4** Implement forgot password functionality
- [ ] **6.5** Handle login errors and success states

### Phase 7: Admin Dashboard

- [ ] **7.1** Create admin layout (`src/app/admin/layout.tsx`)
- [ ] **7.2** Create admin dashboard page (`src/app/admin/page.tsx`)
- [ ] **7.3** Implement logout functionality
- [ ] **7.4** Add basic admin navigation (minimal, no styling changes)
- [ ] **7.5** Create placeholder for YouTube API data display

### Phase 8: API Route Protection

- [ ] **8.1** Protect existing YouTube API routes
  - [ ] `/api/youtube/channel-stats`
  - [ ] `/api/youtube/latest-video`
  - [ ] `/api/youtube/recent-videos`
- [ ] **8.2** Add authentication checks to API routes
- [ ] **8.3** Implement proper error handling for unauthorized access
- [ ] **8.4** Create admin-specific API routes if needed

### Phase 9: Testing & Validation

- [ ] **9.1** Test login functionality with default user
- [ ] **9.2** Test forgot password flow
- [ ] **9.3** Test route protection (unauthorized access)
- [ ] **9.4** Test admin dashboard access
- [ ] **9.5** Test API route protection
- [ ] **9.6** Verify no existing components are affected

### Phase 10: Documentation & Cleanup

- [ ] **10.1** Document admin credentials
- [ ] **10.2** Create admin user management instructions
- [ ] **10.3** Verify all requirements are met
- [ ] **10.4** Clean up any temporary files

## File Structure

```
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Browser client
│   │   ├── server.ts          # Server client
│   │   └── types.ts           # Database types
│   ├── auth/
│   │   ├── auth-context.tsx   # Auth context
│   │   └── auth-provider.tsx  # Auth provider
│   └── env.ts                 # Environment config
├── app/
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── admin/
│   │   ├── layout.tsx         # Admin layout
│   │   └── page.tsx           # Admin dashboard
│   └── api/
│       └── auth/              # Auth API routes
├── components/
│   └── auth/
│       ├── login-form.tsx     # Login form component
│       └── protected-route.tsx # Route protection
└── middleware.ts              # Route protection middleware
```

## Security Considerations

### Database Security

- ✅ Row Level Security (RLS) enabled on all admin tables
- ✅ Proper foreign key relationships
- ✅ Input validation with Zod schemas
- ✅ UUID primary keys instead of auto-incrementing integers

### Authentication Security

- ✅ Server-side session validation
- ✅ Proper cookie handling in middleware
- ✅ Protected API routes with authentication checks
- ✅ Secure environment variable handling

### Route Protection

- ✅ Middleware-based route protection
- ✅ Server-side authentication checks
- ✅ Proper redirect handling for unauthorized access
- ✅ Admin role verification

## Default Admin User Setup

```sql
-- Create default admin user
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  uuid_generate_v4(),
  'mike@inmoinversor.com',
  crypt('admin', gen_salt('bf')),
  now(),
  now(),
  now()
);

-- Add to admin_users table
INSERT INTO public.admin_users (
  id,
  email,
  full_name,
  role
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'mike@inmoinversor.com'),
  'mike@inmoinversor.com',
  'Mike Admin',
  'admin'
);
```

## API Route Protection Pattern

```typescript
// Example protected API route
export async function GET() {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin role
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (adminError || !adminUser) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Proceed with protected operation
    // ... existing API logic
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Success Criteria

- [ ] Admin can login with mike@inmoinversor.com / admin
- [ ] Forgot password functionality works
- [ ] Admin dashboard is accessible only to authenticated admin users
- [ ] Existing YouTube API routes are protected
- [ ] No existing components (navbar, etc.) are modified
- [ ] All ShadCN components used are default (no custom styling)
- [ ] Unauthorized users are redirected to login
- [ ] Session management works correctly
- [ ] All security best practices are followed

## Notes

- This implementation follows the Supabase integration guide patterns
- All components will use default ShadCN styling without modifications
- Existing functionality will remain unchanged
- Focus on security-first approach with proper RLS and validation
- Admin interface will be minimal and functional, not designed

---

**Implementation Priority**: High
**Estimated Time**: 4-6 hours
**Dependencies**: Supabase project setup, environment variables
**Risk Level**: Low (isolated implementation, no existing code changes)
