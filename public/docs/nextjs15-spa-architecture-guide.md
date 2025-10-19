# Next.js 15+ SPA Development Reference Guide

_Last Updated: January 2025_

## Overview

This document serves as the primary reference for building components and functionality in Next.js 15+ SPAs. It focuses on development patterns, anti-patterns, and best practices to guide AI agents and developers in creating maintainable, performant applications.

## Table of Contents

1. [Component Development Patterns](#component-development-patterns)
2. [Data Fetching & API Integration](#data-fetching--api-integration)
3. [State Management Patterns](#state-management-patterns)
4. [Form Handling & Validation](#form-handling--validation)
5. [Performance Optimization](#performance-optimization)
6. [Security Best Practices](#security-best-practices)
7. [Error Handling & Loading States](#error-handling--loading-states)
8. [Testing Patterns](#testing-patterns)
9. [Common Anti-Patterns & Corrections](#common-anti-patterns--corrections)
10. [AI Agent Training Guidelines](#ai-agent-training-guidelines)

---

## Component Development Patterns

### Server vs Client Components

**Rule**: Use Server Components by default, Client Components only when necessary.

#### ✅ Server Component Pattern

```typescript
// ✅ CORRECT: Server Component for data fetching
export default async function ProductList() {
  const products = await getProducts(); // Server-side data fetching

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### ✅ Client Component Pattern

```typescript
// ✅ CORRECT: Client Component only when needed
"use client";

import { useState } from "react";

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

#### ❌ Anti-Pattern: Unnecessary Client Components

```typescript
// ❌ WRONG: Unnecessary client component
"use client";

export default function StaticContent() {
  return (
    <div>
      <h1>Welcome to our site</h1>
      <p>This is static content that doesn't need client-side rendering.</p>
    </div>
  );
}
```

### Component Composition

#### ✅ Proper Component Structure

```typescript
// ✅ CORRECT: Composable components with proper typing
interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

#### ❌ Anti-Pattern: Monolithic Components

```typescript
// ❌ WRONG: Everything in one component
export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  // 200+ lines of mixed concerns
  return (
    <div>{/* Header, filters, table, modal, form all in one component */}</div>
  );
}
```

### Error Boundaries

#### ✅ Proper Error Handling

```typescript
// ✅ CORRECT: Error boundary component
"use client";

import { useEffect } from "react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

## Data Fetching & API Integration

### Server-Side Data Fetching

#### ✅ Server Component Data Fetching

```typescript
// ✅ CORRECT: Server Component data fetching
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}
```

#### ✅ Modern Caching with Next.js 15+

```typescript
// ✅ CORRECT: Using Next.js 15+ cache and revalidate
import { cache } from "react";

const getCachedUser = cache(async (id: string) => {
  const user = await fetch(`https://api.example.com/users/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return user.json();
});

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getCachedUser(params.id);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Client-Side Data Fetching

#### ✅ React Query Pattern

```typescript
// ✅ CORRECT: Client-side data fetching with proper libraries
"use client";
import { useQuery } from "@tanstack/react-query";

export default function UserProfile({ userId }: { userId: string }) {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

#### ❌ Anti-Pattern: Overusing useEffect

```typescript
// ❌ WRONG: Unnecessary client-side fetching
"use client";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### API Routes

#### ✅ Proper API Route Structure

```typescript
// ✅ CORRECT: Typed API routes with validation
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["admin", "user", "moderator"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateUserSchema.parse(body);

    const user = await createUser(validatedData);
    return NextResponse.json(user, { status: 201 });
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

## State Management Patterns

### Local State Management

#### ✅ useState for Simple State

```typescript
// ✅ CORRECT: Local state for component-specific data
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### ✅ useReducer for Complex State

```typescript
// ✅ CORRECT: useReducer for complex state logic
"use client";
import { useReducer } from "react";

interface FormState {
  name: string;
  email: string;
  errors: Record<string, string>;
}

function formReducer(state: FormState, action: any): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    default:
      return state;
  }
}

export default function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
    errors: {},
  });

  return (
    <form>
      <input
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
        }
      />
    </form>
  );
}
```

### Global State Management

#### ✅ Zustand for Global State

```typescript
// ✅ CORRECT: Zustand for global state
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

#### ❌ Anti-Pattern: Overusing Context

```typescript
// ❌ WRONG: Context for simple local state
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Used for a single component that could use local state
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle
    </button>
  );
}
```

---

## Form Handling & Validation

### Server Actions

#### ✅ Modern Form Handling with Server Actions

```typescript
// ✅ CORRECT: Server Action with validation
import { z } from "zod";
import { revalidatePath } from "next/cache";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

async function submitContact(formData: FormData) {
  "use server";

  const validatedData = ContactSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  // Process the validated data
  await saveContact(validatedData);
  revalidatePath("/contact");
}

export default function ContactForm() {
  return (
    <form action={submitContact}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Client-Side Form Handling

#### ✅ React Hook Form with Zod

```typescript
// ✅ CORRECT: Client-side form with validation
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

#### ❌ Anti-Pattern: Client-Side Only Validation

```typescript
// ❌ WRONG: Only client-side validation
"use client";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only client-side validation
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    // Submit without server validation
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Performance Optimization

### Image Optimization

#### ✅ Next.js Image Component

```typescript
// ✅ CORRECT: Using Next.js Image component
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
      <h3>{product.name}</h3>
    </div>
  );
}
```

#### ❌ Anti-Pattern: Unoptimized Images

```typescript
// ❌ WRONG: Using regular img tags
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
    </div>
  );
}
```

### Code Splitting

#### ✅ Dynamic Imports

```typescript
// ✅ CORRECT: Dynamic imports for code splitting
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <div>Loading chart...</div>,
  ssr: false,
});

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
    </div>
  );
}
```

### Memoization

#### ✅ Proper Memoization

```typescript
// ✅ CORRECT: Memoization for expensive calculations
"use client";
import { useMemo, memo } from "react";

interface ProductListProps {
  products: Product[];
  filter: string;
}

const ProductList = memo(function ProductList({
  products,
  filter,
}: ProductListProps) {
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  return (
    <div>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});
```

---

## Security Best Practices

### Input Validation

#### ✅ Server-Side Validation

```typescript
// ✅ CORRECT: Server-side validation with Zod
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["admin", "user", "moderator"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateUserSchema.parse(body);

    const user = await createUser(validatedData);
    return NextResponse.json(user, { status: 201 });
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

### Authentication & Authorization

#### ✅ Protected Routes

```typescript
// ✅ CORRECT: Proper auth checks
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return <div>Admin content</div>;
}
```

### Security Headers

#### ✅ Middleware for Security

```typescript
// ✅ CORRECT: Using Next.js middleware for security
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for authentication
  const token = request.cookies.get("auth-token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Add security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

---

## Error Handling & Loading States

### Error Boundaries

#### ✅ Component Error Handling

```typescript
// ✅ CORRECT: Error boundary with proper typing
"use client";

import { useEffect } from "react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading States

#### ✅ Proper Loading Patterns

```typescript
// ✅ CORRECT: Loading states with Suspense
import { Suspense } from "react";

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent slug={params.slug} />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments slug={params.slug} />
      </Suspense>
    </div>
  );
}
```

#### ❌ Anti-Pattern: Missing Error Handling

```typescript
// ❌ WRONG: No error handling
export default function UserData() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(setUser); // No error handling
  }, []);

  return <div>{user?.name}</div>;
}
```

---

## Testing Patterns

### Component Testing

#### ✅ React Testing Library

```typescript
// ✅ CORRECT: Component testing with React Testing Library
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### API Route Testing

#### ✅ API Testing

```typescript
// ✅ CORRECT: API route testing
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("/api/users", () => {
  it("creates a new user", async () => {
    const request = new NextRequest("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.name).toBe("John Doe");
  });
});
```

#### ❌ Anti-Pattern: Testing Implementation Details

```typescript
// ❌ WRONG: Testing implementation details
import { render } from "@testing-library/react";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
  it("has correct CSS classes", () => {
    const { container } = render(<UserProfile user={mockUser} />);
    expect(container.querySelector(".user-profile")).toHaveClass("bg-white");
  });
});
```

---

## Anti-Pattern Corrections

### Common LLM-Generated Anti-Patterns

This section identifies and provides corrections for common anti-patterns found in LLM-generated Next.js code.

#### 1. Overusing useEffect for Data Fetching

**❌ Anti-Pattern:**

```typescript
"use client";
import { useEffect, useState } from "react";

export default function ProductPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  return <div>{product.name}</div>;
}
```

**✅ Corrected Pattern:**

```typescript
// Server Component for initial data
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  return <ProductClient product={product} />;
}

// Client Component for interactivity
("use client");
function ProductClient({ product }: { product: Product }) {
  const [likes, setLikes] = useState(product.likes);

  const handleLike = async () => {
    await fetch(`/api/products/${product.id}/like`, { method: "POST" });
    setLikes((prev) => prev + 1);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <button onClick={handleLike}>❤️ {likes}</button>
    </div>
  );
}
```

#### 2. Missing Error Handling

**❌ Anti-Pattern:**

```typescript
export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers); // No error handling
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

**✅ Corrected Pattern:**

```typescript
"use client";
import { useQuery } from "@tanstack/react-query";

export default function UserList() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("/api/users").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

#### 3. Inconsistent Component Patterns

**❌ Anti-Pattern:**

```typescript
// Inconsistent export patterns
export const Button = ({ children }) => <button>{children}</button>;
export default function Header() {
  return <header>Header</header>;
}
const Footer = () => <footer>Footer</footer>;
export { Footer };
```

**✅ Corrected Pattern:**

```typescript
// Consistent default export pattern
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary" }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}

export default function Header() {
  return <header>Header</header>;
}

export default function Footer() {
  return <footer>Footer</footer>;
}
```

#### 4. Using 'any' Type

**❌ Anti-Pattern:**

```typescript
export default function UserComponent({ user }: { user: any }) {
  return <div>{user.name}</div>; // No type safety
}
```

**✅ Corrected Pattern:**

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

export default function UserComponent({ user }: { user: User }) {
  return <div>{user.name}</div>; // Type safe
}
```

#### 5. Client-Side Only Validation

**❌ Anti-Pattern:**

```typescript
"use client";
import { useState } from "react";

export default function ContactForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only client-side validation
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    // Submit without server validation
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**✅ Corrected Pattern:**

```typescript
// Server Action with validation
import { z } from "zod";

const ContactSchema = z.object({
  email: z.string().email(),
});

async function submitContact(formData: FormData) {
  "use server";

  const validatedData = ContactSchema.parse({
    email: formData.get("email"),
  });

  // Process the validated data
  await saveContact(validatedData);
}

export default function ContactForm() {
  return (
    <form action={submitContact}>
      <input name="email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## AI Agent Training Guidelines

### Core Principles for AI Agents

#### 1. Server-First Approach

- **Always prefer Server Components** unless client-side interactivity is required
- **Use `"use client"` directive sparingly** - only when necessary
- **Leverage server-side data fetching** for initial page loads
- **Implement client components** only for user interactions

#### 2. TypeScript Best Practices

- **Never use `any` type** - always define proper interfaces
- **Use strict TypeScript configuration** with proper type checking
- **Define interfaces for all props and data structures**
- **Use generic types** for reusable components and hooks

#### 3. Component Architecture Rules

- **Follow consistent export patterns** - use default exports for components
- **Break down monolithic components** into smaller, focused components
- **Use proper component composition** instead of prop drilling
- **Implement error boundaries** for robust error handling

#### 4. Data Fetching Guidelines

- **Use Server Components for initial data** - avoid useEffect for data fetching
- **Implement proper error handling** for all data operations
- **Use React Query or SWR** for client-side data fetching
- **Validate all inputs** with Zod schemas

#### 5. Security Requirements

- **Always validate on the server** - never rely on client-side validation alone
- **Use proper authentication checks** for protected routes
- **Implement input sanitization** and validation
- **Set up security headers** and middleware

### Code Generation Rules

#### DO:

- ✅ Use Server Components by default
- ✅ Implement proper TypeScript interfaces
- ✅ Add error handling to all async operations
- ✅ Use Zod for input validation
- ✅ Follow consistent naming conventions
- ✅ Implement proper loading states
- ✅ Use Next.js Image component for images
- ✅ Add proper accessibility attributes

#### DON'T:

- ❌ Use `any` type in TypeScript
- ❌ Overuse useEffect for data fetching
- ❌ Create monolithic components
- ❌ Rely on client-side validation only
- ❌ Skip error handling
- ❌ Use regular `<img>` tags
- ❌ Create inconsistent component patterns
- ❌ Expose sensitive data in client components

### Quality Checklist for AI Agents

Before generating any code, ensure:

1. **Component Type**: Is this a Server or Client Component?
2. **TypeScript**: Are all types properly defined?
3. **Error Handling**: Is error handling implemented?
4. **Validation**: Is input validation in place?
5. **Performance**: Are images and assets optimized?
6. **Security**: Are security best practices followed?
7. **Accessibility**: Are accessibility attributes included?
8. **Testing**: Are testable patterns used?

### Common Scenarios

#### Creating a New Page Component

```typescript
// ✅ CORRECT: Server Component with proper typing
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <ProductClient product={product} />
    </div>
  );
}
```

#### Creating an Interactive Component

```typescript
// ✅ CORRECT: Client Component with proper typing
"use client";

interface InteractiveButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export default function InteractiveButton({
  onClick,
  children,
  disabled = false,
}: InteractiveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {children}
    </button>
  );
}
```

#### Creating an API Route

```typescript
// ✅ CORRECT: API route with validation and error handling
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateUserSchema.parse(body);

    const user = await createUser(validatedData);
    return NextResponse.json(user, { status: 201 });
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

## Summary

This reference guide provides comprehensive patterns and anti-patterns for building Next.js 15+ SPAs. Key principles:

1. **Server-First Architecture** - Use Server Components by default
2. **Type Safety** - Never use `any`, always define proper interfaces
3. **Error Handling** - Implement comprehensive error handling
4. **Security** - Always validate on the server
5. **Performance** - Optimize images and implement proper caching
6. **Consistency** - Follow established patterns throughout

By following these guidelines, AI agents and developers can create maintainable, performant, and secure Next.js 15+ applications that avoid common pitfalls and follow modern best practices.
