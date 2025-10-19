# Supabase Development Reference Guide

_Last Updated: January 2025_

## Overview

This document serves as the primary reference for integrating Supabase with Next.js 15+ applications. It focuses on development patterns, database design, authentication flows, and best practices to guide developers in creating robust, scalable applications with Supabase.

## Table of Contents

1. [Database Design Patterns](#database-design-patterns)
2. [Authentication & Authorization](#authentication--authorization)
3. [CRUD Operations & API Design](#crud-operations--api-design)
4. [Client Setup & Configuration](#client-setup--configuration)
5. [Data Fetching Patterns](#data-fetching-patterns)
6. [Security Best Practices](#security-best-practices)
7. [Testing Strategies](#testing-strategies)
8. [Common Anti-Patterns & Corrections](#common-anti-patterns--corrections)
9. [AI Agent Training Guidelines](#ai-agent-training-guidelines)

---

## Database Design Patterns

### Table Structure Best Practices

#### ✅ Proper Table Design

```sql
-- ✅ CORRECT: Well-structured table with proper constraints
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

#### ✅ Automatic Timestamp Management

```sql
-- ✅ CORRECT: Automatic updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

#### ❌ Anti-Pattern: Poor Table Design

```sql
-- ❌ WRONG: Missing constraints and proper types
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT,
  created_at TIMESTAMP
);
```

### Row Level Security (RLS) Patterns

#### ✅ Comprehensive RLS Policies

```sql
-- ✅ CORRECT: Proper RLS setup with multiple policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

#### ❌ Anti-Pattern: Missing RLS

```sql
-- ❌ WRONG: No RLS enabled - security risk
CREATE TABLE public.sensitive_data (
  id UUID PRIMARY KEY,
  user_data TEXT,
  private_info TEXT
);
-- No RLS policies = data exposed to all users
```

### Database Relationships

#### ✅ Proper Foreign Key Relationships

```sql
-- ✅ CORRECT: Well-defined relationships with proper constraints
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS policy for posts
CREATE POLICY "Users can view all posts" ON public.posts
    FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);
```

---

## Authentication & Authorization

### Supabase Client Setup

#### ✅ Next.js 15+ Client Configuration

```typescript
// ✅ CORRECT: Proper client setup for Next.js 15+
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

#### ✅ Server-Side Client Configuration

```typescript
// ✅ CORRECT: Server client with proper cookie handling
// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component context - can be ignored with middleware
          }
        },
      },
    }
  );
}
```

### Authentication Context Pattern

#### ✅ Modern Auth Context

```typescript
// ✅ CORRECT: Auth context with proper typing
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

#### ❌ Anti-Pattern: Improper Auth Context

```typescript
// ❌ WRONG: Missing error handling and proper typing
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); // No error handling
}
```

### Middleware Authentication

#### ✅ Secure Middleware Pattern

```typescript
// ✅ CORRECT: Proper middleware with session management
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

---

## CRUD Operations & API Design

### API Route Patterns

#### ✅ Proper API Route Structure

```typescript
// ✅ CORRECT: Typed API routes with proper error handling
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from("posts")
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### ✅ Dynamic Route Handling

```typescript
// ✅ CORRECT: Proper dynamic route with Next.js 15+ params
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### ❌ Anti-Pattern: Poor API Design

```typescript
// ❌ WRONG: Missing error handling and validation
export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*");
  return NextResponse.json(data); // No error handling
}
```

### Client-Side CRUD Operations

#### ✅ Proper Client-Side Data Management

```typescript
// ✅ CORRECT: Client component with proper error handling
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) throw error;
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

#### ❌ Anti-Pattern: Poor Client-Side Handling

```typescript
// ❌ WRONG: No error handling or loading states
"use client";

import { useState, useEffect } from "react";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts); // No error handling
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

---

## Client Setup & Configuration

### Environment Configuration

#### ✅ Proper Environment Setup

```typescript
// ✅ CORRECT: Type-safe environment configuration
// lib/env.ts
export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
} as const;

// Validate required environment variables
if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  throw new Error("Missing required Supabase environment variables");
}
```

#### ✅ Database Types Generation

```typescript
// ✅ CORRECT: Generated database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "user" | "moderator";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          role?: "admin" | "user" | "moderator";
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: "admin" | "user" | "moderator";
        };
      };
    };
  };
}
```

### Client Factory Pattern

#### ✅ Reusable Client Factory

```typescript
// ✅ CORRECT: Factory pattern for different client types
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

export function createSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component context
          }
        },
      },
    }
  );
}
```

---

## Data Fetching Patterns

### Server-Side Data Fetching

#### ✅ Server Component Data Fetching

```typescript
// ✅ CORRECT: Server component with Supabase data fetching
import { createClient } from "@/lib/supabase/server";

export default async function PostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

### Client-Side Data Fetching

#### ✅ React Query Integration

```typescript
// ✅ CORRECT: Client-side fetching with React Query
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export default function PostsManager() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("posts").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => deletePost.mutate(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

#### ❌ Anti-Pattern: Direct Client Fetching

```typescript
// ❌ WRONG: Direct fetching without proper state management
"use client";

import { useState, useEffect } from "react";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

---

## Security Best Practices

### Row Level Security (RLS)

#### ✅ Comprehensive RLS Policies

```sql
-- ✅ CORRECT: Proper RLS setup for different access levels
-- Enable RLS on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Posts are viewable by everyone" ON public.posts
    FOR SELECT USING (true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own posts
CREATE POLICY "Users can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts" ON public.posts
    FOR DELETE USING (auth.uid() = author_id);

-- Admins can do everything
CREATE POLICY "Admins can manage all posts" ON public.posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

### Input Validation

#### ✅ Server-Side Validation

```typescript
// ✅ CORRECT: API route with proper validation
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  author_id: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate input
    const validatedData = CreatePostSchema.parse(body);

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user can only create posts for themselves
    if (validatedData.author_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([validatedData])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Environment Security

#### ✅ Secure Environment Configuration

```typescript
// ✅ CORRECT: Secure environment variable handling
// lib/config.ts
export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!, // Server-only
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL!,
    environment: process.env.NODE_ENV!,
  },
} as const;

// Validate configuration
const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

---

## Testing Strategies

### API Route Testing

#### ✅ Comprehensive API Testing

```typescript
// ✅ CORRECT: API route testing with proper mocking
import { NextRequest } from "next/server";
import { GET, POST } from "@/app/api/posts/route";

// Mock Supabase server client
jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          data: [
            {
              id: "1",
              title: "Test Post",
              content: "Test Content",
              author_id: "user-1",
              created_at: "2024-01-01T00:00:00Z",
            },
          ],
          error: null,
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          data: [
            {
              id: "2",
              title: "New Post",
              content: "New Content",
              author_id: "user-1",
              created_at: "2024-01-01T00:00:00Z",
            },
          ],
          error: null,
        })),
      })),
    })),
    auth: {
      getUser: jest.fn(() => ({
        data: { user: { id: "user-1" } },
      })),
    },
  })),
}));

describe("/api/posts", () => {
  describe("GET", () => {
    it("should return posts", async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveLength(1);
      expect(data[0].title).toBe("Test Post");
    });
  });

  describe("POST", () => {
    it("should create new post", async () => {
      const request = new NextRequest("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: "New Post",
          content: "New Content",
          author_id: "user-1",
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.title).toBe("New Post");
    });
  });
});
```

### Component Testing

#### ✅ Client Component Testing

```typescript
// ✅ CORRECT: Component testing with proper mocking
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsManager from "./PostsManager";

// Mock Supabase client
jest.mock("@/lib/supabase/client", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          data: [
            {
              id: "1",
              title: "Test Post",
              content: "Test Content",
              created_at: "2024-01-01T00:00:00Z",
            },
          ],
          error: null,
        })),
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          error: null,
        })),
      })),
    })),
  })),
}));

function TestWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("PostsManager", () => {
  it("should render posts", async () => {
    render(
      <TestWrapper>
        <PostsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
    });
  });

  it("should delete post when delete button is clicked", async () => {
    render(
      <TestWrapper>
        <PostsManager />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
    });

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Test Post")).not.toBeInTheDocument();
    });
  });
});
```

#### ❌ Anti-Pattern: Poor Testing

```typescript
// ❌ WRONG: Testing implementation details
import { render } from "@testing-library/react";
import PostsManager from "./PostsManager";

describe("PostsManager", () => {
  it("should have correct CSS classes", () => {
    const { container } = render(<PostsManager />);
    expect(container.querySelector(".posts-container")).toHaveClass("grid");
  });
});
```

---

## Common Anti-Patterns & Corrections

### Critical Anti-Patterns to Avoid

#### 1. Missing Row Level Security (RLS)

**❌ Anti-Pattern:**

```sql
-- ❌ WRONG: No RLS enabled - major security risk
CREATE TABLE public.sensitive_data (
  id UUID PRIMARY KEY,
  user_data TEXT,
  private_info TEXT
);
-- Anyone can access all data!
```

**✅ Corrected Pattern:**

```sql
-- ✅ CORRECT: RLS enabled with proper policies
CREATE TABLE public.sensitive_data (
  id UUID PRIMARY KEY,
  user_data TEXT,
  private_info TEXT,
  user_id UUID REFERENCES auth.users(id)
);

ALTER TABLE public.sensitive_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own data" ON public.sensitive_data
    FOR ALL USING (auth.uid() = user_id);
```

#### 2. Improper Client Configuration

**❌ Anti-Pattern:**

```typescript
// ❌ WRONG: Using old Supabase client pattern
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**✅ Corrected Pattern:**

```typescript
// ✅ CORRECT: Using SSR-compatible client
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

#### 3. Missing Error Handling in API Routes

**❌ Anti-Pattern:**

```typescript
// ❌ WRONG: No error handling
export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select("*");
  return NextResponse.json(data);
}
```

**✅ Corrected Pattern:**

```typescript
// ✅ CORRECT: Comprehensive error handling
export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### 4. Poor Authentication Context

**❌ Anti-Pattern:**

```typescript
// ❌ WRONG: Missing error handling and proper typing
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); // No error handling
}
```

**✅ Corrected Pattern:**

```typescript
// ✅ CORRECT: Proper typing and error handling
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

#### 5. Inadequate Input Validation

**❌ Anti-Pattern:**

```typescript
// ❌ WRONG: No server-side validation
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase.from("posts").insert([body]).select();

  return NextResponse.json(data[0]);
}
```

**✅ Corrected Pattern:**

```typescript
// ✅ CORRECT: Server-side validation with Zod
import { z } from "zod";

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  author_id: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate input
    const validatedData = CreatePostSchema.parse(body);

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user can only create posts for themselves
    if (validatedData.author_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([validatedData])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## AI Agent Training Guidelines

### Core Principles for AI Agents

#### 1. Security-First Approach

- **Always enable RLS** on all tables with sensitive data
- **Validate all inputs** on the server side with Zod
- **Check authentication** before any data operations
- **Use proper environment variable handling** for sensitive data

#### 2. Supabase Client Best Practices

- **Use SSR-compatible clients** (`@supabase/ssr` package)
- **Separate client and server configurations** properly
- **Handle cookies correctly** in middleware
- **Use proper TypeScript types** for database operations

#### 3. Database Design Rules

- **Use UUIDs for primary keys** instead of auto-incrementing integers
- **Enable RLS on all tables** with user data
- **Create proper foreign key relationships** with CASCADE options
- **Use proper timestamp management** with triggers

#### 4. API Route Guidelines

- **Always handle errors** in API routes
- **Validate inputs** with Zod schemas
- **Check authentication** before operations
- **Use proper HTTP status codes**
- **Return consistent error formats**

#### 5. Authentication Patterns

- **Use proper auth context** with error handling
- **Handle loading states** in auth components
- **Implement proper session management** in middleware
- **Use type-safe auth operations**

### Code Generation Rules

#### DO:

- ✅ Enable RLS on all tables with user data
- ✅ Use `@supabase/ssr` package for Next.js 15+
- ✅ Validate all inputs with Zod schemas
- ✅ Handle errors in all API routes
- ✅ Use proper TypeScript types for database operations
- ✅ Implement proper authentication checks
- ✅ Use UUIDs for primary keys
- ✅ Create comprehensive RLS policies

#### DON'T:

- ❌ Skip RLS on sensitive tables
- ❌ Use old `@supabase/supabase-js` client in Next.js 15+
- ❌ Skip server-side input validation
- ❌ Ignore error handling in API routes
- ❌ Use `any` types for database operations
- ❌ Skip authentication checks
- ❌ Use auto-incrementing integers for primary keys
- ❌ Create overly permissive RLS policies

### Quality Checklist for AI Agents

Before generating any Supabase code, ensure:

1. **Security**: Is RLS enabled on sensitive tables?
2. **Validation**: Is input validation implemented with Zod?
3. **Authentication**: Are auth checks in place?
4. **Error Handling**: Is error handling comprehensive?
5. **Types**: Are proper TypeScript types used?
6. **Client Configuration**: Is the correct Supabase client used?
7. **Database Design**: Are proper relationships and constraints in place?
8. **Testing**: Are testable patterns used?

### Common Scenarios

#### Creating a New Table

```sql
-- ✅ CORRECT: Proper table creation with RLS
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all posts" ON public.posts
    FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);
```

#### Creating an API Route

```typescript
// ✅ CORRECT: API route with validation and auth
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const CreatePostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate input
    const validatedData = CreatePostSchema.parse(body);

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([{ ...validatedData, author_id: user.id }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### Creating a Client Component

```typescript
// ✅ CORRECT: Client component with proper error handling
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Summary

This reference guide provides comprehensive patterns and anti-patterns for integrating Supabase with Next.js 15+ applications. Key principles:

1. **Security-First Architecture** - Always enable RLS and validate inputs
2. **Proper Client Configuration** - Use SSR-compatible Supabase clients
3. **Comprehensive Error Handling** - Handle errors in all operations
4. **Type Safety** - Use proper TypeScript types for all operations
5. **Authentication Patterns** - Implement secure auth flows
6. **Database Design** - Use proper relationships and constraints

By following these guidelines, AI agents and developers can create secure, maintainable, and performant Supabase applications that avoid common pitfalls and follow modern best practices.
