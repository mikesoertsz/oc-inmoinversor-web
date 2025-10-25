#!/usr/bin/env node

/**
 * Authentication Test Runner
 * Runs all authentication-related tests to diagnose sign-in issues
 */

const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Starting Authentication Test Suite...\n");

// Test files to run
const testFiles = [
  "test-auth-system.js",
  "test-auth-context.js",
  "test-middleware.js",
  "test-login-form.js",
];

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Run a single test file
function runTest(testFile) {
  return new Promise((resolve, reject) => {
    const testPath = path.join(__dirname, testFile);
    console.log(colorize(`\n📋 Running ${testFile}...`, "cyan"));
    console.log(colorize("─".repeat(50), "blue"));

    const child = spawn("node", [testPath], {
      stdio: "inherit",
      cwd: __dirname,
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(colorize(`✅ ${testFile} completed successfully`, "green"));
        resolve(true);
      } else {
        console.log(colorize(`❌ ${testFile} failed with code ${code}`, "red"));
        resolve(false);
      }
    });

    child.on("error", (error) => {
      console.log(colorize(`❌ ${testFile} error: ${error.message}`, "red"));
      reject(error);
    });
  });
}

// Run all tests
async function runAllTests() {
  const results = [];

  for (const testFile of testFiles) {
    try {
      const success = await runTest(testFile);
      results.push({ file: testFile, success });
    } catch (error) {
      console.log(
        colorize(`❌ Failed to run ${testFile}: ${error.message}`, "red")
      );
      results.push({ file: testFile, success: false, error: error.message });
    }
  }

  // Print summary
  console.log(colorize("\n📊 Test Results Summary", "bright"));
  console.log(colorize("═".repeat(50), "blue"));

  let passed = 0;
  let failed = 0;

  results.forEach((result) => {
    if (result.success) {
      console.log(colorize(`✅ ${result.file}`, "green"));
      passed++;
    } else {
      console.log(colorize(`❌ ${result.file}`, "red"));
      if (result.error) {
        console.log(colorize(`   Error: ${result.error}`, "red"));
      }
      failed++;
    }
  });

  console.log(colorize("\n📈 Final Results:", "bright"));
  console.log(colorize(`   Passed: ${passed}`, "green"));
  console.log(colorize(`   Failed: ${failed}`, "red"));
  console.log(colorize(`   Total:  ${results.length}`, "blue"));

  if (failed === 0) {
    console.log(
      colorize(
        "\n🎉 All tests passed! Authentication system is working correctly.",
        "green"
      )
    );
  } else {
    console.log(
      colorize(
        "\n⚠️  Some tests failed. Check the output above for details.",
        "yellow"
      )
    );
    console.log(colorize("\n💡 Common issues and solutions:", "bright"));
    console.log(
      colorize(
        "   1. Missing environment variables - check .env.local file",
        "yellow"
      )
    );
    console.log(
      colorize(
        "   2. Supabase project not set up - create project and get credentials",
        "yellow"
      )
    );
    console.log(
      colorize(
        "   3. Database tables not created - run the SQL setup scripts",
        "yellow"
      )
    );
    console.log(
      colorize(
        "   4. Network connectivity issues - check internet connection",
        "yellow"
      )
    );
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Check if we're in the right directory
if (!require("fs").existsSync(path.join(__dirname, "test-auth-system.js"))) {
  console.log(
    colorize(
      "❌ Test files not found. Make sure you're running this from the tests directory.",
      "red"
    )
  );
  process.exit(1);
}

// Run the tests
runAllTests().catch((error) => {
  console.log(colorize(`❌ Test runner failed: ${error.message}`, "red"));
  process.exit(1);
});
