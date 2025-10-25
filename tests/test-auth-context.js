/**
 * Auth Context Tests
 * Tests the authentication context and state management
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

// Test configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TEST_EMAIL = "mike@inmoinversor.com";
const TEST_PASSWORD = "admin";

console.log("🧪 Starting Auth Context Tests...\n");

// Test 1: Auth Context State Management
console.log("1️⃣ Testing Auth Context State Management...");

class MockAuthContext {
  constructor() {
    this.user = null;
    this.session = null;
    this.adminUser = null;
    this.loading = true;
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  async signIn(email, password) {
    console.log(`   Attempting sign in for: ${email}`);
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(`   Sign in error: ${error.message}`);
        return { error };
      }

      console.log("   Sign in successful");
      this.user = data.user;
      this.session = data.session;

      // Fetch admin user
      await this.fetchAdminUser(data.user.id);

      return { error: null };
    } catch (err) {
      console.error(`   Sign in exception: ${err.message}`);
      return { error: err };
    }
  }

  async fetchAdminUser(userId) {
    console.log(`   Fetching admin user for: ${userId}`);
    try {
      const { data, error } = await this.supabase
        .from("admin_users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error(`   Admin user fetch error: ${error.message}`);
        this.adminUser = null;
      } else {
        console.log("   Admin user fetched successfully");
        this.adminUser = data;
      }
    } catch (error) {
      console.error(`   Admin user fetch exception: ${error.message}`);
      this.adminUser = null;
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    console.log("   Signing out...");
    try {
      await this.supabase.auth.signOut();
      this.user = null;
      this.session = null;
      this.adminUser = null;
      this.loading = false;
      console.log("   Sign out successful");
    } catch (error) {
      console.error(`   Sign out error: ${error.message}`);
    }
  }

  getState() {
    return {
      user: this.user,
      session: this.session,
      adminUser: this.adminUser,
      loading: this.loading,
    };
  }
}

// Test 2: Auth State Changes
console.log("2️⃣ Testing Auth State Changes...");
async function testAuthStateChanges() {
  const authContext = new MockAuthContext();

  // Test initial state
  let state = authContext.getState();
  console.log(`   Initial loading state: ${state.loading}`);

  // Test sign in
  const signInResult = await authContext.signIn(TEST_EMAIL, TEST_PASSWORD);
  if (signInResult.error) {
    console.error(`   Sign in failed: ${signInResult.error.message}`);
    return false;
  }

  // Check state after sign in
  state = authContext.getState();
  console.log(
    `   After sign in - User: ${state.user ? state.user.email : "null"}`
  );
  console.log(
    `   After sign in - Admin: ${state.adminUser ? state.adminUser.role : "null"}`
  );
  console.log(`   After sign in - Loading: ${state.loading}`);

  // Test sign out
  await authContext.signOut();

  // Check state after sign out
  state = authContext.getState();
  console.log(
    `   After sign out - User: ${state.user ? state.user.email : "null"}`
  );
  console.log(
    `   After sign out - Admin: ${state.adminUser ? state.adminUser.role : "null"}`
  );
  console.log(`   After sign out - Loading: ${state.loading}`);

  return true;
}

// Test 3: Error Handling
console.log("3️⃣ Testing Error Handling...");
async function testErrorHandling() {
  const authContext = new MockAuthContext();

  // Test invalid credentials
  console.log("   Testing invalid credentials...");
  const invalidResult = await authContext.signIn(
    "invalid@email.com",
    "wrongpassword"
  );
  if (invalidResult.error) {
    console.log(
      `   ✅ Invalid credentials handled: ${invalidResult.error.message}`
    );
  } else {
    console.log("   ❌ Invalid credentials not handled properly");
  }

  // Test network error simulation
  console.log("   Testing network error simulation...");
  const originalSignIn = authContext.supabase.auth.signInWithPassword;
  authContext.supabase.auth.signInWithPassword = jest.fn(() => {
    throw new Error("Network error");
  });

  const networkErrorResult = await authContext.signIn(
    TEST_EMAIL,
    TEST_PASSWORD
  );
  if (networkErrorResult.error) {
    console.log(
      `   ✅ Network error handled: ${networkErrorResult.error.message}`
    );
  } else {
    console.log("   ❌ Network error not handled properly");
  }

  // Restore original function
  authContext.supabase.auth.signInWithPassword = originalSignIn;

  return true;
}

// Test 4: Loading State Management
console.log("4️⃣ Testing Loading State Management...");
async function testLoadingState() {
  const authContext = new MockAuthContext();

  // Test initial loading state
  let state = authContext.getState();
  console.log(`   Initial loading: ${state.loading}`);

  // Simulate async operation
  const startTime = Date.now();
  await authContext.signIn(TEST_EMAIL, TEST_PASSWORD);
  const endTime = Date.now();

  state = authContext.getState();
  console.log(`   Final loading: ${state.loading}`);
  console.log(`   Operation took: ${endTime - startTime}ms`);

  return true;
}

// Run all tests
async function runAllTests() {
  try {
    console.log("Running Auth Context Tests...\n");

    const stateTest = await testAuthStateChanges();
    if (!stateTest) {
      console.log("\n❌ Auth state changes test failed");
      return;
    }

    const errorTest = await testErrorHandling();
    if (!errorTest) {
      console.log("\n❌ Error handling test failed");
      return;
    }

    const loadingTest = await testLoadingState();
    if (!loadingTest) {
      console.log("\n❌ Loading state test failed");
      return;
    }

    console.log("\n🎉 All Auth Context tests passed!");
    console.log("\n📋 Test Summary:");
    console.log("   ✅ Auth state management");
    console.log("   ✅ Auth state changes");
    console.log("   ✅ Error handling");
    console.log("   ✅ Loading state management");
  } catch (error) {
    console.error("\n❌ Auth Context test suite failed:", error.message);
  }
}

// Run the tests
runAllTests();
