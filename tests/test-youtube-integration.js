/**
 * YouTube Integration Test Suite
 * Comprehensive test that verifies the entire YouTube integration workflow
 */

require("dotenv").config({ path: ".env.local" });

class YouTubeIntegrationTester {
  constructor() {
    this.baseUrl = "http://localhost:3000";
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
        return result.data;
      } else {
        console.log(`❌ FAILED: ${testName}`);
        console.log(`   Reason: ${result.error}`);
        this.results.failed++;
        this.results.errors.push(`${testName}: ${result.error}`);
        return null;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${testName}`);
      console.log(`   Error: ${error.message}`);
      this.results.failed++;
      this.results.errors.push(`${testName}: ${error.message}`);
      return null;
    }
  }

  async testEnvironmentSetup() {
    try {
      // Check API key
      if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
        return {
          success: false,
          error: "NEXT_PUBLIC_YOUTUBE_API_KEY not found in environment",
        };
      }

      if (
        process.env.NEXT_PUBLIC_YOUTUBE_API_KEY === "your_youtube_api_key_here"
      ) {
        return {
          success: false,
          error: "YouTube API key not configured (still has placeholder value)",
        };
      }

      console.log(
        `   🔑 API Key: ${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY.substring(0, 10)}...`
      );

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async testServerAvailability() {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/youtube/channel-stats`,
        {
          method: "HEAD",
        }
      );

      if (!response.ok) {
        return {
          success: false,
          error: `Server not available: HTTP ${response.status}`,
        };
      }

      console.log("   🌐 Server is running and accessible");

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Server connection failed: ${error.message}`,
      };
    }
  }

  async testFullWorkflow() {
    try {
      console.log("   🔄 Testing complete YouTube integration workflow...");

      // Step 1: Get channel stats
      console.log("      Step 1: Fetching channel statistics...");
      const statsResponse = await fetch(
        `${this.baseUrl}/api/youtube/channel-stats`
      );
      if (!statsResponse.ok) {
        return {
          success: false,
          error: `Channel stats failed: HTTP ${statsResponse.status}`,
        };
      }
      const stats = await statsResponse.json();
      console.log(
        `         ✅ Channel stats retrieved (${this.formatNumber(stats.subscriberCount)} subscribers)`
      );

      // Step 2: Get latest video
      console.log("      Step 2: Fetching latest video...");
      const videoResponse = await fetch(
        `${this.baseUrl}/api/youtube/latest-video`
      );
      if (!videoResponse.ok) {
        return {
          success: false,
          error: `Latest video failed: HTTP ${videoResponse.status}`,
        };
      }
      const latestVideo = await videoResponse.json();
      console.log(
        `         ✅ Latest video retrieved: "${latestVideo.title.substring(0, 40)}..."`
      );

      // Step 3: Get recent videos
      console.log("      Step 3: Fetching recent videos...");
      const videosResponse = await fetch(
        `${this.baseUrl}/api/youtube/recent-videos?limit=5`
      );
      if (!videosResponse.ok) {
        return {
          success: false,
          error: `Recent videos failed: HTTP ${videosResponse.status}`,
        };
      }
      const recentVideos = await videosResponse.json();
      console.log(
        `         ✅ Recent videos retrieved (${recentVideos.length} videos)`
      );

      // Step 4: Validate data consistency
      console.log("      Step 4: Validating data consistency...");

      // Check if latest video is in recent videos
      const latestInRecent = recentVideos.some(
        (video) => video.videoId === latestVideo.videoId
      );
      if (!latestInRecent) {
        console.log(
          "         ⚠️  Latest video not found in recent videos list"
        );
      } else {
        console.log("         ✅ Latest video found in recent videos list");
      }

      // Check if video counts match expectations
      const expectedVideoCount = parseInt(stats.videoCount);
      const actualRecentCount = recentVideos.length;

      if (actualRecentCount <= expectedVideoCount) {
        console.log(
          "         ✅ Recent videos count is consistent with total video count"
        );
      } else {
        console.log(
          "         ⚠️  Recent videos count exceeds total video count"
        );
      }

      return {
        success: true,
        data: { stats, latestVideo, recentVideos },
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async testDataQuality() {
    try {
      console.log("   📊 Testing data quality and consistency...");

      // Fetch all data
      const [statsResponse, videoResponse, videosResponse] = await Promise.all([
        fetch(`${this.baseUrl}/api/youtube/channel-stats`),
        fetch(`${this.baseUrl}/api/youtube/latest-video`),
        fetch(`${this.baseUrl}/api/youtube/recent-videos?limit=10`),
      ]);

      const stats = await statsResponse.json();
      const latestVideo = await videoResponse.json();
      const recentVideos = await videosResponse.json();

      // Validate stats data quality
      const subscriberCount = parseInt(stats.subscriberCount);
      const videoCount = parseInt(stats.videoCount);
      const viewCount = parseInt(stats.viewCount);

      if (subscriberCount < 0 || videoCount < 0 || viewCount < 0) {
        return {
          success: false,
          error: "Negative values found in channel statistics",
        };
      }

      console.log(`      ✅ Statistics validation passed`);

      // Validate video data quality
      const allVideos = [latestVideo, ...recentVideos];
      for (const video of allVideos) {
        if (!video.videoId || video.videoId.length < 10) {
          return {
            success: false,
            error: `Invalid video ID: ${video.videoId}`,
          };
        }

        if (!video.title || video.title.length < 5) {
          return {
            success: false,
            error: `Invalid video title: ${video.title}`,
          };
        }

        if (
          !video.publishedAt ||
          isNaN(new Date(video.publishedAt).getTime())
        ) {
          return {
            success: false,
            error: `Invalid publish date: ${video.publishedAt}`,
          };
        }
      }

      console.log(`      ✅ Video data validation passed`);

      // Check for duplicates in recent videos
      const videoIds = recentVideos.map((v) => v.videoId);
      const uniqueIds = [...new Set(videoIds)];

      if (videoIds.length !== uniqueIds.length) {
        return {
          success: false,
          error: "Duplicate videos found in recent videos list",
        };
      }

      console.log(`      ✅ No duplicate videos found`);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async testPerformance() {
    try {
      console.log("   ⚡ Testing API response times...");

      const startTime = Date.now();

      // Test concurrent requests
      const [statsResponse, videoResponse, videosResponse] = await Promise.all([
        fetch(`${this.baseUrl}/api/youtube/channel-stats`),
        fetch(`${this.baseUrl}/api/youtube/latest-video`),
        fetch(`${this.baseUrl}/api/youtube/recent-videos?limit=5`),
      ]);

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // Check response times
      if (totalTime > 10000) {
        // 10 seconds
        return {
          success: false,
          error: `API responses too slow: ${totalTime}ms`,
        };
      }

      console.log(`      ✅ All API calls completed in ${totalTime}ms`);

      // Test individual endpoint performance
      const endpoints = [
        {
          name: "Channel Stats",
          url: `${this.baseUrl}/api/youtube/channel-stats`,
        },
        {
          name: "Latest Video",
          url: `${this.baseUrl}/api/youtube/latest-video`,
        },
        {
          name: "Recent Videos",
          url: `${this.baseUrl}/api/youtube/recent-videos?limit=5`,
        },
      ];

      for (const endpoint of endpoints) {
        const start = Date.now();
        const response = await fetch(endpoint.url);
        const end = Date.now();
        const responseTime = end - start;

        if (responseTime > 5000) {
          // 5 seconds per endpoint
          return {
            success: false,
            error: `${endpoint.name} too slow: ${responseTime}ms`,
          };
        }

        console.log(`         ${endpoint.name}: ${responseTime}ms`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
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
    console.log("🚀 Starting YouTube Integration Test Suite");
    console.log("=".repeat(60));
    console.log("This test verifies the complete YouTube integration workflow");
    console.log("including environment setup, API endpoints, data quality,");
    console.log("and performance metrics.");
    console.log("=".repeat(60));

    // Run all tests
    await this.runTest("Environment Setup", () => this.testEnvironmentSetup());
    await this.runTest("Server Availability", () =>
      this.testServerAvailability()
    );
    await this.runTest("Complete Workflow", () => this.testFullWorkflow());
    await this.runTest("Data Quality", () => this.testDataQuality());
    await this.runTest("Performance", () => this.testPerformance());

    this.showResults();
  }

  showResults() {
    console.log("\n" + "=".repeat(60));
    console.log("📊 INTEGRATION TEST RESULTS SUMMARY");
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
        "\n🎉 All integration tests passed! YouTube integration is working perfectly."
      );
      console.log(
        "   Your YouTube page should now display live data from the inmoinversor channel."
      );
    } else {
      console.log(
        "\n⚠️  Some tests failed. Please check the errors above and fix them."
      );
      console.log(
        "   The YouTube page may not display data correctly until these issues are resolved."
      );
    }

    console.log("\n📋 NEXT STEPS:");
    if (this.results.failed === 0) {
      console.log("   1. Navigate to /youtube in your browser");
      console.log("   2. Verify the page displays channel statistics");
      console.log("   3. Check that the latest video loads correctly");
      console.log("   4. Confirm recent videos are displayed");
    } else {
      console.log("   1. Fix the errors listed above");
      console.log("   2. Ensure your YouTube API key is correctly configured");
      console.log("   3. Verify the development server is running");
      console.log("   4. Re-run these tests to confirm fixes");
    }
  }
}

// Run the tests
async function main() {
  const tester = new YouTubeIntegrationTester();
  await tester.runAllTests();
}

main().catch(console.error);

