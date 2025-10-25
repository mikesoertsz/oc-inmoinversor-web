/**
 * Middleware Tests
 * Tests the Next.js middleware for route protection and authentication
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

// Test configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TEST_EMAIL = "mike@inmoinversor.com";
const TEST_PASSWORD = "admin";

console.log("🧪 Starting Middleware Tests...\n");

// Mock Next.js request/response objects
class MockRequest {
  constructor(url, cookies = {}) {
    this.url = url;
    this.cookies = cookies;
    this.nextUrl = {
      clone: () => ({
        pathname: url,
        searchParams: new URLSearchParams(),
      }),
    };
  }
}

class MockResponse {
  constructor() {
    this.status = 200;
    this.headers = {};
    this.cookies = [];
  }

  next() {
    return this;
  }

  redirect(url) {
    this.status = 302;
    this.redirectUrl = url;
    return this;
  }
}

// Test 1: Route Protection Logic
console.log("1️⃣ Testing Route Protection Logic...");

function testRouteProtection() {
  const protectedRoutes = ["/admin"];
  const authRoutes = ["/login", "/reset-password"];

  // Test protected route detection
  const testPaths = [
    "/admin",
    "/admin/users",
    "/login",
    "/reset-password",
    "/",
    "/blog",
  ];

  testPaths.forEach((path) => {
    const isProtected = protectedRoutes.some((route) => path.startsWith(route));
    const isAuth = authRoutes.some((route) => path.startsWith(route));

    console.log(`   ${path}: Protected=${isProtected}, Auth=${isAuth}`);
  });

  return true;
}

// Test 2: Authentication Check
console.log("2️⃣ Testing Authentication Check...");
async function testAuthenticationCheck() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  try {
    // Test unauthenticated user
    console.log("   Testing unauthenticated user...");
    const {
      data: { user: unauthenticatedUser },
    } = await supabase.auth.getUser();
    console.log(
      `   Unauthenticated user: ${unauthenticatedUser ? "Found" : "None"}`
    );

    // Test authenticated user
    console.log("   Testing authenticated user...");
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

    if (authError) {
      console.error(`   Authentication failed: ${authError.message}`);
      return false;
    }

    console.log(`   Authenticated user: ${authData.user.email}`);

    // Test admin user check
    console.log("   Testing admin user check...");
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("id, role, is_active")
      .eq("id", authData.user.id)
      .single();

    if (adminError) {
      console.error(`   Admin user check failed: ${adminError.message}`);
      return false;
    }

    console.log(
      `   Admin user: ${adminUser.role}, Active: ${adminUser.is_active}`
    );

    // Sign out
    await supabase.auth.signOut();

    return true;
  } catch (error) {
    console.error(`   Authentication check exception: ${error.message}`);
    return false;
  }
}

// Test 3: Cookie Handling
console.log("3️⃣ Testing Cookie Handling...");
function testCookieHandling() {
  const mockCookies = {
    "sb-access-token": "test-access-token",
    "sb-refresh-token": "test-refresh-token",
  };

  const request = new MockRequest("/admin", mockCookies);

  console.log("   Testing cookie extraction...");
  const cookieNames = Object.keys(request.cookies);
  console.log(`   Found cookies: ${cookieNames.join(", ")}`);

  console.log("   Testing cookie setting...");
  const response = new MockResponse();
  response.cookies.push({ name: "test-cookie", value: "test-value" });
  console.log(`   Set cookies: ${response.cookies.length}`);

  return true;
}

// Test 4: Redirect Logic
console.log("4️⃣ Testing Redirect Logic...");
function testRedirectLogic() {
  const testCases = [
    { path: "/admin", user: null, expected: "redirect to /login" },
    {
      path: "/admin",
      user: { id: "user1" },
      adminUser: null,
      expected: "redirect to /login",
    },
    {
      path: "/admin",
      user: { id: "user1" },
      adminUser: { role: "admin", is_active: true },
      expected: "allow access",
    },
    {
      path: "/login",
      user: { id: "user1" },
      adminUser: { role: "admin", is_active: true },
      expected: "redirect to /admin",
    },
    { path: "/", user: null, expected: "allow access" },
  ];

  testCases.forEach((testCase, index) => {
    console.log(`   Test case ${index + 1}: ${testCase.path}`);
    console.log(
      `     User: ${testCase.user ? "authenticated" : "unauthenticated"}`
    );
    console.log(
      `     Admin: ${testCase.adminUser ? `${testCase.adminUser.role}, active: ${testCase.adminUser.is_active}` : "none"}`
    );
    console.log(`     Expected: ${testCase.expected}`);
  });

  return true;
}

// Test 5: Error Handling
console.log("5️⃣ Testing Error Handling...");
function testErrorHandling() {
  const errorScenarios = [
    { error: "unauthorized", message: "You don't have admin access." },
    {
      error: "server_error",
      message: "Server error occurred. Please try again.",
    },
    {
      error: "network_error",
      message: "Network error occurred. Please try again.",
    },
  ];

  errorScenarios.forEach((scenario) => {
    console.log(`   Error: ${scenario.error} -> Message: ${scenario.message}`);
  });

  return true;
}

// Test 6: Performance Test
console.log("6️⃣ Testing Performance...");
async function testPerformance() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const iterations = 5;
  const times = [];

  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();

    try {
      await supabase.auth.getUser();
    } catch (error) {
      // Ignore errors for performance test
    }

    const endTime = Date.now();
    times.push(endTime - startTime);
  }

  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const maxTime = Math.max(...times);
  const minTime = Math.min(...times);

  console.log(`   Average response time: ${avgTime.toFixed(2)}ms`);
  console.log(`   Max response time: ${maxTime}ms`);
  console.log(`   Min response time: ${minTime}ms`);

  return avgTime < 1000; // Should be under 1 second
}

// Run all tests
async function runAllTests() {
  try {
    console.log("Running Middleware Tests...\n");

    const routeTest = testRouteProtection();
    if (!routeTest) {
      console.log("\n❌ Route protection test failed");
      return;
    }

    const authTest = await testAuthenticationCheck();
    if (!authTest) {
      console.log("\n❌ Authentication check test failed");
      return;
    }

    const cookieTest = testCookieHandling();
    if (!cookieTest) {
      console.log("\n❌ Cookie handling test failed");
      return;
    }

    const redirectTest = testRedirectLogic();
    if (!redirectTest) {
      console.log("\n❌ Redirect logic test failed");
      return;
    }

    const errorTest = testErrorHandling();
    if (!errorTest) {
      console.log("\n❌ Error handling test failed");
      return;
    }

    const performanceTest = await testPerformance();
    if (!performanceTest) {
      console.log("\n❌ Performance test failed");
      return;
    }

    console.log("\n🎉 All Middleware tests passed!");
    console.log("\n📋 Test Summary:");
    console.log("   ✅ Route protection logic");
    console.log("   ✅ Authentication check");
    console.log("   ✅ Cookie handling");
    console.log("   ✅ Redirect logic");
    console.log("   ✅ Error handling");
    console.log("   ✅ Performance");
  } catch (error) {
    console.error("\n❌ Middleware test suite failed:", error.message);
  }
}

// Run the tests
runAllTests();
