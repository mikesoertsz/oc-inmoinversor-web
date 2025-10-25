/**
 * YouTube API Endpoints Test Suite
 * Tests all YouTube API endpoints for the inmoinversor channel
 */

require("dotenv").config({ path: ".env.local" });

class YouTubeEndpointTester {
  constructor() {
    this.baseUrl = "http://localhost:3000";
    this.endpoints = {
      channelStats: "/api/youtube/channel-stats",
      latestVideo: "/api/youtube/latest-video",
      recentVideos: "/api/youtube/recent-videos",
    };
    this.results = {
      passed: 0,
      failed: 0,
      errors: [],
    };
  }

  async runTest(testName, testFunction) {
    console.log(`\n🧪 Testing: ${testName}`);
    console.log("─".repeat(50));

    try {
      const result = await testFunction();
      if (result.success) {
        console.log(`✅ PASSED: ${testName}`);
        this.results.passed++;
      } else {
        console.log(`❌ FAILED: ${testName}`);
        console.log(`   Reason: ${result.error}`);
        this.results.failed++;
        this.results.errors.push(`${testName}: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ ERROR: ${testName}`);
      console.log(`   Error: ${error.message}`);
      this.results.failed++;
      this.results.errors.push(`${testName}: ${error.message}`);
    }
  }

  async testChannelStatsEndpoint() {
    const response = await fetch(
      `${this.baseUrl}${this.endpoints.channelStats}`
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    // Validate response structure
    const requiredFields = ["subscriberCount", "videoCount", "viewCount"];
    const missingFields = requiredFields.filter((field) => !(field in data));

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing fields: ${missingFields.join(", ")}`,
      };
    }

    // Validate data types
    const invalidFields = requiredFields.filter(
      (field) => typeof data[field] !== "string" || isNaN(parseInt(data[field]))
    );

    if (invalidFields.length > 0) {
      return {
        success: false,
        error: `Invalid field types: ${invalidFields.join(", ")}`,
      };
    }

    console.log(`   📊 Channel Stats Retrieved:`);
    console.log(
      `      Subscribers: ${this.formatNumber(data.subscriberCount)}`
    );
    console.log(`      Videos: ${this.formatNumber(data.videoCount)}`);
    console.log(`      Views: ${this.formatNumber(data.viewCount)}`);

    return { success: true, data };
  }

  async testLatestVideoEndpoint() {
    const response = await fetch(
      `${this.baseUrl}${this.endpoints.latestVideo}`
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();

    // Validate response structure
    const requiredFields = [
      "videoId",
      "title",
      "description",
      "publishedAt",
      "thumbnail",
    ];
    const missingFields = requiredFields.filter((field) => !(field in data));

    if (missingFields.length > 0) {
      return {
        success: false,
        error: `Missing fields: ${missingFields.join(", ")}`,
      };
    }

    // Validate video ID format
    if (!data.videoId || data.videoId.length < 10) {
      return {
        success: false,
        error: `Invalid video ID: ${data.videoId}`,
      };
    }

    // Validate thumbnail URL
    if (!data.thumbnail || !data.thumbnail.startsWith("http")) {
      return {
        success: false,
        error: `Invalid thumbnail URL: ${data.thumbnail}`,
      };
    }

    console.log(`   🎬 Latest Video Retrieved:`);
    console.log(`      ID: ${data.videoId}`);
    console.log(`      Title: ${data.title.substring(0, 60)}...`);
    console.log(
      `      Published: ${new Date(data.publishedAt).toLocaleDateString()}`
    );

    return { success: true, data };
  }

  async testRecentVideosEndpoint() {
    const testLimits = [3, 6, 10];

    for (const limit of testLimits) {
      console.log(`   📹 Testing with limit: ${limit}`);

      const response = await fetch(
        `${this.baseUrl}${this.endpoints.recentVideos}?limit=${limit}`
      );

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText} for limit ${limit}`,
        };
      }

      const data = await response.json();

      // Validate response is array
      if (!Array.isArray(data)) {
        return {
          success: false,
          error: `Expected array, got ${typeof data} for limit ${limit}`,
        };
      }

      // Validate array length
      if (data.length > limit) {
        return {
          success: false,
          error: `Returned ${data.length} videos, expected max ${limit}`,
        };
      }

      // Validate each video structure
      const requiredFields = [
        "videoId",
        "title",
        "description",
        "publishedAt",
        "thumbnail",
      ];
      for (let i = 0; i < data.length; i++) {
        const video = data[i];
        const missingFields = requiredFields.filter(
          (field) => !(field in video)
        );

        if (missingFields.length > 0) {
          return {
            success: false,
            error: `Video ${i} missing fields: ${missingFields.join(", ")}`,
          };
        }
      }

      console.log(`      ✅ Retrieved ${data.length} videos`);
    }

    return { success: true };
  }

  async testEndpointAvailability() {
    const endpoints = Object.values(this.endpoints);
    const results = [];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          method: "HEAD",
        });

        results.push({
          endpoint,
          available: response.ok,
          status: response.status,
        });
      } catch (error) {
        results.push({
          endpoint,
          available: false,
          error: error.message,
        });
      }
    }

    return { success: true, results };
  }

  async testErrorHandling() {
    // Test invalid limit parameter
    const response = await fetch(
      `${this.baseUrl}${this.endpoints.recentVideos}?limit=invalid`
    );

    if (response.ok) {
      return {
        success: false,
        error: "Should return error for invalid limit parameter",
      };
    }

    return { success: true };
  }

  formatNumber(num) {
    const number = parseInt(num);
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    }
    return number.toString();
  }

  async runAllTests() {
    console.log("🚀 Starting YouTube API Endpoints Test Suite");
    console.log("=".repeat(60));

    // Check if API key is configured
    if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
      console.log("❌ NEXT_PUBLIC_YOUTUBE_API_KEY not found in environment");
      console.log("   Please configure your YouTube API key in .env.local");
      return;
    }

    console.log("✅ YouTube API key configured");

    // Run all tests
    await this.runTest("Endpoint Availability Check", () =>
      this.testEndpointAvailability()
    );
    await this.runTest("Channel Stats Endpoint", () =>
      this.testChannelStatsEndpoint()
    );
    await this.runTest("Latest Video Endpoint", () =>
      this.testLatestVideoEndpoint()
    );
    await this.runTest("Recent Videos Endpoint", () =>
      this.testRecentVideosEndpoint()
    );
    await this.runTest("Error Handling", () => this.testErrorHandling());

    this.showResults();
  }

  showResults() {
    console.log("\n" + "=".repeat(60));
    console.log("📊 TEST RESULTS SUMMARY");
    console.log("=".repeat(60));

    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);

    if (this.results.errors.length > 0) {
      console.log("\n🔍 ERRORS:");
      this.results.errors.forEach((error) => {
        console.log(`   • ${error}`);
      });
    }

    const successRate =
      (this.results.passed / (this.results.passed + this.results.failed)) * 100;
    console.log(`\n📈 Success Rate: ${successRate.toFixed(1)}%`);

    if (this.results.failed === 0) {
      console.log(
        "\n🎉 All tests passed! YouTube API endpoints are working correctly."
      );
    } else {
      console.log("\n⚠️  Some tests failed. Please check the errors above.");
    }
  }
}

// Run the tests
async function main() {
  const tester = new YouTubeEndpointTester();
  await tester.runAllTests();
}

main().catch(console.error);

