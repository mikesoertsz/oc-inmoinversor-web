/**
 * Authentication System Tests
 * Tests the complete auth flow including Supabase connection, sign-in, and admin user verification
 */

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

// Test configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TEST_EMAIL = "mike@inmoinversor.com";
const TEST_PASSWORD = "admin";

console.log("🧪 Starting Authentication System Tests...\n");

// Test 1: Environment Variables
console.log("1️⃣ Testing Environment Variables...");
if (!SUPABASE_URL) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL is missing");
  process.exit(1);
}
if (!SUPABASE_ANON_KEY) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");
  process.exit(1);
}
console.log("✅ Environment variables are set");
console.log(`   URL: ${SUPABASE_URL.substring(0, 30)}...`);
console.log(`   Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...\n`);

// Test 2: Supabase Client Creation
console.log("2️⃣ Testing Supabase Client Creation...");
let supabase;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("✅ Supabase client created successfully\n");
} catch (error) {
  console.error("❌ Failed to create Supabase client:", error.message);
  process.exit(1);
}

// Test 3: Database Connection
console.log("3️⃣ Testing Database Connection...");
async function testDatabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("count")
      .limit(1);

    if (error) {
      console.error("❌ Database connection failed:", error.message);
      return false;
    }
    console.log("✅ Database connection successful");
    return true;
  } catch (error) {
    console.error("❌ Database connection exception:", error.message);
    return false;
  }
}

// Test 4: Authentication
console.log("4️⃣ Testing Authentication...");
async function testAuthentication() {
  try {
    console.log(`   Attempting to sign in with: ${TEST_EMAIL}`);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (error) {
      console.error("❌ Authentication failed:", error.message);
      return null;
    }

    console.log("✅ Authentication successful");
    console.log(`   User ID: ${data.user.id}`);
    console.log(`   Email: ${data.user.email}`);
    return data.user;
  } catch (error) {
    console.error("❌ Authentication exception:", error.message);
    return null;
  }
}

// Test 5: Admin User Verification
console.log("5️⃣ Testing Admin User Verification...");
async function testAdminUserVerification(userId) {
  try {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("❌ Admin user verification failed:", error.message);
      return null;
    }

    console.log("✅ Admin user verification successful");
    console.log(`   Full Name: ${data.full_name}`);
    console.log(`   Role: ${data.role}`);
    console.log(`   Active: ${data.is_active}`);
    return data;
  } catch (error) {
    console.error("❌ Admin user verification exception:", error.message);
    return null;
  }
}

// Test 6: Auth State Changes
console.log("6️⃣ Testing Auth State Changes...");
async function testAuthStateChanges() {
  return new Promise((resolve) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`   Auth state change: ${event}`);
      if (session) {
        console.log(`   User: ${session.user.email}`);
      } else {
        console.log("   No user session");
      }

      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        subscription.unsubscribe();
        resolve(true);
      }
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      subscription.unsubscribe();
      console.log("❌ Auth state change test timed out");
      resolve(false);
    }, 5000);
  });
}

// Test 7: Sign Out
console.log("7️⃣ Testing Sign Out...");
async function testSignOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("❌ Sign out failed:", error.message);
      return false;
    }
    console.log("✅ Sign out successful");
    return true;
  } catch (error) {
    console.error("❌ Sign out exception:", error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  try {
    // Test database connection
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.log("\n❌ Tests failed at database connection");
      return;
    }

    // Test authentication
    const user = await testAuthentication();
    if (!user) {
      console.log("\n❌ Tests failed at authentication");
      return;
    }

    // Test admin user verification
    const adminUser = await testAdminUserVerification(user.id);
    if (!adminUser) {
      console.log("\n❌ Tests failed at admin user verification");
      return;
    }

    // Test auth state changes
    console.log("   (This test will wait for auth state changes...)");
    const authStateTest = await testAuthStateChanges();
    if (!authStateTest) {
      console.log("\n❌ Tests failed at auth state changes");
      return;
    }

    // Test sign out
    const signOutSuccess = await testSignOut();
    if (!signOutSuccess) {
      console.log("\n❌ Tests failed at sign out");
      return;
    }

    console.log("\n🎉 All authentication tests passed!");
    console.log("\n📋 Test Summary:");
    console.log("   ✅ Environment variables");
    console.log("   ✅ Supabase client creation");
    console.log("   ✅ Database connection");
    console.log("   ✅ Authentication");
    console.log("   ✅ Admin user verification");
    console.log("   ✅ Auth state changes");
    console.log("   ✅ Sign out");
  } catch (error) {
    console.error("\n❌ Test suite failed with exception:", error.message);
  }
}

// Run the tests
runAllTests();
