// Test script to verify the latest video API endpoint
const { google } = require("googleapis");
require("dotenv").config({ path: ".env.local" });

async function testLatestVideoAPI() {
  console.log("🧪 Testing Latest Video API Integration\n");

  // Check if API key is available
  if (
    !process.env.YOUTUBE_API_KEY ||
    process.env.YOUTUBE_API_KEY === "your_youtube_api_key_here"
  ) {
    console.log("❌ YOUTUBE_API_KEY not found or not configured");
    console.log("\n📋 SETUP INSTRUCTIONS:");
    console.log("1. Create a .env.local file in your project root");
    console.log("2. Add your YouTube Data API v3 key:");
    console.log("   YOUTUBE_API_KEY=your_actual_api_key_here");
    console.log("\n🔑 To get a YouTube Data API v3 key:");
    console.log(
      "1. Go to Google Cloud Console (https://console.cloud.google.com/)"
    );
    console.log("2. Create a new project or select existing one");
    console.log("3. Enable YouTube Data API v3");
    console.log("4. Create credentials (API Key)");
    console.log("5. Copy the API key to your .env.local file");
    return;
  }

  try {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });

    console.log("1. Finding inmoinversor channel...");
    const channelSearch = await youtube.search.list({
      part: "snippet",
      q: "inmoinversor",
      type: "channel",
      maxResults: 1,
    });

    if (channelSearch.data.items.length === 0) {
      console.log("❌ inmoinversor channel not found");
      return;
    }

    const channelId = channelSearch.data.items[0].id.channelId;
    console.log(
      `✅ Found channel: ${channelSearch.data.items[0].snippet.title} (${channelId})`
    );

    console.log("\n2. Getting latest video...");
    const videoSearch = await youtube.search.list({
      part: "snippet",
      channelId: channelId,
      type: "video",
      order: "date",
      maxResults: 1,
    });

    if (videoSearch.data.items.length > 0) {
      const video = videoSearch.data.items[0];
      console.log("✅ Latest video fetched successfully:");
      console.log(`   - Video ID: ${video.id.videoId}`);
      console.log(`   - Title: ${video.snippet.title}`);
      console.log(`   - Published: ${video.snippet.publishedAt}`);
      console.log(
        `   - URL: https://www.youtube.com/watch?v=${video.id.videoId}`
      );
    } else {
      console.log("❌ No videos found in channel");
    }

    console.log("\n3. Getting channel statistics...");
    const channelStats = await youtube.channels.list({
      part: "statistics",
      id: channelId,
    });

    if (channelStats.data.items.length > 0) {
      const stats = channelStats.data.items[0].statistics;
      console.log("✅ Channel stats fetched successfully:");
      console.log(`   - Subscribers: ${stats.subscriberCount || "Hidden"}`);
      console.log(`   - Videos: ${stats.videoCount}`);
      console.log(`   - Total Views: ${stats.viewCount}`);
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    if (error.response) {
      console.error("   Response status:", error.response.status);
      console.error("   Response data:", error.response.data);
    }
    console.log("\n💡 Make sure you have:");
    console.log("   1. Added YOUTUBE_API_KEY to .env.local");
    console.log("   2. Enabled YouTube Data API v3 in Google Cloud Console");
    console.log("   3. The API key has proper permissions");
  }

  console.log("\n🎯 Integration Summary:");
  console.log("   - Component will fetch latest video on page load");
  console.log("   - Falls back to default video if API fails");
  console.log("   - Shows loading state while fetching");
  console.log("   - Displays error message if fallback is used");
  console.log("\n📝 Next steps:");
  console.log("   1. Add your YouTube API key to .env.local");
  console.log("   2. Start the development server: npm run dev");
  console.log("   3. Visit the homepage to see the dynamic video");
}

testLatestVideoAPI().catch(console.error);
