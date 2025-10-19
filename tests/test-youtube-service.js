/**
 * YouTube Service Direct Test
 * Tests the YouTube service class directly without going through API endpoints
 */

require("dotenv").config({ path: ".env.local" });

class YouTubeServiceTester {
  constructor() {
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

  async testChannelDiscovery() {
    try {
      // Import the YouTube service
      const { YouTubeService } = require("../src/lib/youtube.ts");
      const service = new YouTubeService();

      // Test channel discovery (this will call findChannelByName internally)
      console.log("   🔍 Searching for 'inmoinversor' channel...");

      // We can't directly call the private method, so we'll test through getChannelStats
      // which internally calls findChannelByName
      const stats = await service.getChannelStats();

      if (!stats) {
        return {
          success: false,
          error: "Could not find channel or retrieve stats",
        };
      }

      console.log(`   📊 Channel found! Stats:`);
      console.log(
        `      Subscribers: ${this.formatNumber(stats.subscriberCount)}`
      );
      console.log(`      Videos: ${this.formatNumber(stats.videoCount)}`);
      console.log(`      Views: ${this.formatNumber(stats.viewCount)}`);

      return { success: true, data: stats };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async testLatestVideoRetrieval() {
    try {
      const { YouTubeService } = require("../src/lib/youtube.ts");
      const service = new YouTubeService();

      console.log("   🎬 Fetching latest video...");
      const video = await service.getLatestVideo();

      if (!video) {
        return {
          success: false,
          error: "Could not retrieve latest video",
        };
      }

      // Validate video data
      const requiredFields = [
        "videoId",
        "title",
        "description",
        "publishedAt",
        "thumbnail",
      ];
      const missingFields = requiredFields.filter((field) => !(field in video));

      if (missingFields.length > 0) {
        return {
          success: false,
          error: `Missing fields: ${missingFields.join(", ")}`,
        };
      }

      console.log(`   📺 Latest Video:`);
      console.log(`      ID: ${video.videoId}`);
      console.log(`      Title: ${video.title.substring(0, 60)}...`);
      console.log(
        `      Published: ${new Date(video.publishedAt).toLocaleDateString()}`
      );
      console.log(`      Thumbnail: ${video.thumbnail ? "✅" : "❌"}`);

      return { success: true, data: video };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async testRecentVideosRetrieval() {
    try {
      const { YouTubeService } = require("../src/lib/youtube.ts");
      const service = new YouTubeService();

      const testLimits = [3, 5, 10];

      for (const limit of testLimits) {
        console.log(`   📹 Testing recent videos with limit: ${limit}`);

        const videos = await service.getRecentVideos(limit);

        if (!videos) {
          return {
            success: false,
            error: `Could not retrieve videos for limit ${limit}`,
          };
        }

        if (!Array.isArray(videos)) {
          return {
            success: false,
            error: `Expected array, got ${typeof videos} for limit ${limit}`,
          };
        }

        if (videos.length > limit) {
          return {
            success: false,
            error: `Returned ${videos.length} videos, expected max ${limit}`,
          };
        }

        // Validate first video structure
        if (videos.length > 0) {
          const video = videos[0];
          const requiredFields = [
            "videoId",
            "title",
            "description",
            "publishedAt",
            "thumbnail",
          ];
          const missingFields = requiredFields.filter(
            (field) => !(field in video)
          );

          if (missingFields.length > 0) {
            return {
              success: false,
              error: `Video missing fields: ${missingFields.join(", ")}`,
            };
          }
        }

        console.log(`      ✅ Retrieved ${videos.length} videos`);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async testAPIKeyConfiguration() {
    try {
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
        `   🔑 API Key configured: ${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY.substring(0, 10)}...`
      );

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async testServiceInitialization() {
    try {
      const { YouTubeService } = require("../src/lib/youtube.ts");
      const service = new YouTubeService();

      // Check if service is properly initialized
      if (!service) {
        return {
          success: false,
          error: "Could not initialize YouTube service",
        };
      }

      console.log("   ✅ YouTube service initialized successfully");

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
    console.log("🚀 Starting YouTube Service Direct Test Suite");
    console.log("=".repeat(60));

    // Run all tests
    await this.runTest("API Key Configuration", () =>
      this.testAPIKeyConfiguration()
    );
    await this.runTest("Service Initialization", () =>
      this.testServiceInitialization()
    );
    await this.runTest("Channel Discovery", () => this.testChannelDiscovery());
    await this.runTest("Latest Video Retrieval", () =>
      this.testLatestVideoRetrieval()
    );
    await this.runTest("Recent Videos Retrieval", () =>
      this.testRecentVideosRetrieval()
    );

    this.showResults();
  }

  showResults() {
    console.log("\n" + "=".repeat(60));
    console.log("📊 SERVICE TEST RESULTS SUMMARY");
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
        "\n🎉 All service tests passed! YouTube service is working correctly."
      );
    } else {
      console.log("\n⚠️  Some tests failed. Please check the errors above.");
    }
  }
}

// Run the tests
async function main() {
  const tester = new YouTubeServiceTester();
  await tester.runAllTests();
}

main().catch(console.error);
