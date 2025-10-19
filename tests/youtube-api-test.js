const { google } = require("googleapis");
require("dotenv").config({ path: ".env.local" });

// YouTube Data API v3 Test Suite
// This test explores what data and actions are available for the inmoinversor channel

class YouTubeAPITester {
  constructor() {
    this.youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });
    this.channelName = "inmoinversor";
    this.channelId = null;
  }

  async runAllTests() {
    console.log(
      "🚀 Starting YouTube Data API v3 Tests for inmoinversor channel\n"
    );

    try {
      // Test 1: Find channel by name
      await this.findChannelByName();

      if (this.channelId) {
        // Test 2: Get detailed channel information
        await this.getChannelDetails();

        // Test 3: Get channel videos
        await this.getChannelVideos();

        // Test 4: Get channel playlists
        await this.getChannelPlaylists();

        // Test 5: Get channel statistics
        await this.getChannelStatistics();

        // Test 6: Get channel sections (tabs)
        await this.getChannelSections();

        // Test 7: Get channel branding settings (if accessible)
        await this.getChannelBranding();

        // Test 8: Get channel content details
        await this.getChannelContentDetails();

        // Test 9: Test search functionality
        await this.testSearchFunctionality();

        // Test 10: Test video details
        await this.testVideoDetails();

        // Test 11: Test playlist details
        await this.testPlaylistDetails();

        // Test 12: Test comment threads (if accessible)
        await this.testCommentThreads();

        // Test 13: Test subscription status (if accessible)
        await this.testSubscriptionStatus();

        // Test 14: Test channel activities
        await this.testChannelActivities();

        // Test 15: Test captions (if accessible)
        await this.testCaptions();

        // Test 16: Test thumbnails
        await this.testThumbnails();

        // Test 17: Test video categories
        await this.testVideoCategories();

        // Test 18: Test i18n languages
        await this.testI18nLanguages();

        // Test 19: Test regions
        await this.testRegions();

        // Test 20: Test guide categories
        await this.testGuideCategories();
      } else {
        console.log("❌ Could not find channel ID. Skipping detailed tests.");
      }
    } catch (error) {
      console.error("❌ Test failed:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  }

  async findChannelByName() {
    console.log("🔍 Test 1: Finding channel by name...");
    try {
      const response = await this.youtube.search.list({
        part: "snippet",
        q: this.channelName,
        type: "channel",
        maxResults: 5,
      });

      console.log(
        `✅ Found ${response.data.items.length} channels matching "${this.channelName}"`
      );

      response.data.items.forEach((item, index) => {
        console.log(
          `  ${index + 1}. ${item.snippet.title} (ID: ${item.id.channelId})`
        );
        console.log(
          `     Description: ${item.snippet.description?.substring(0, 100)}...`
        );
        console.log(`     Published: ${item.snippet.publishedAt}`);
      });

      // Use the first result as our target channel
      if (response.data.items.length > 0) {
        this.channelId = response.data.items[0].id.channelId;
        console.log(`🎯 Using channel ID: ${this.channelId}\n`);
      }
    } catch (error) {
      console.error("❌ Error finding channel:", error.message);
    }
  }

  async getChannelDetails() {
    console.log("📊 Test 2: Getting detailed channel information...");
    try {
      const response = await this.youtube.channels.list({
        part: "snippet,contentDetails,statistics,brandingSettings,status,localizations",
        id: this.channelId,
      });

      if (response.data.items.length > 0) {
        const channel = response.data.items[0];
        console.log("✅ Channel details retrieved successfully");
        console.log("📋 Available data sections:");
        console.log("  - snippet:", !!channel.snippet);
        console.log("  - contentDetails:", !!channel.contentDetails);
        console.log("  - statistics:", !!channel.statistics);
        console.log("  - brandingSettings:", !!channel.brandingSettings);
        console.log("  - status:", !!channel.status);
        console.log("  - localizations:", !!channel.localizations);

        if (channel.snippet) {
          console.log("\n📝 Channel Snippet Data:");
          console.log("  - Title:", channel.snippet.title);
          console.log(
            "  - Description:",
            channel.snippet.description?.substring(0, 200) + "..."
          );
          console.log("  - Custom URL:", channel.snippet.customUrl);
          console.log("  - Published At:", channel.snippet.publishedAt);
          console.log(
            "  - Thumbnails:",
            Object.keys(channel.snippet.thumbnails || {})
          );
          console.log("  - Country:", channel.snippet.country);
          console.log("  - Default Language:", channel.snippet.defaultLanguage);
        }

        if (channel.statistics) {
          console.log("\n📈 Channel Statistics:");
          console.log("  - View Count:", channel.statistics.viewCount);
          console.log(
            "  - Subscriber Count:",
            channel.statistics.subscriberCount
          );
          console.log("  - Video Count:", channel.statistics.videoCount);
          console.log(
            "  - Hidden Subscriber Count:",
            channel.statistics.hiddenSubscriberCount
          );
        }

        if (channel.contentDetails) {
          console.log("\n🎬 Content Details:");
          console.log(
            "  - Related Playlists:",
            Object.keys(channel.contentDetails.relatedPlaylists || {})
          );
        }

        if (channel.brandingSettings) {
          console.log("\n🎨 Branding Settings:");
          console.log("  - Channel:", !!channel.brandingSettings.channel);
          console.log("  - Watch:", !!channel.brandingSettings.watch);
          console.log("  - Image:", !!channel.brandingSettings.image);
          console.log("  - Hint:", !!channel.brandingSettings.hints);
        }

        if (channel.status) {
          console.log("\n🔒 Channel Status:");
          console.log("  - Privacy Status:", channel.status.privacyStatus);
          console.log("  - Is Linked:", channel.status.isLinked);
          console.log(
            "  - Long Uploads Status:",
            channel.status.longUploadsStatus
          );
          console.log("  - Made For Kids:", channel.status.madeForKids);
          console.log(
            "  - Self Declared Made For Kids:",
            channel.status.selfDeclaredMadeForKids
          );
        }
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error getting channel details:", error.message);
    }
  }

  async getChannelVideos() {
    console.log("🎥 Test 3: Getting channel videos...");
    try {
      const response = await this.youtube.search.list({
        part: "snippet",
        channelId: this.channelId,
        type: "video",
        order: "date",
        maxResults: 10,
      });

      console.log(`✅ Found ${response.data.items.length} recent videos`);

      response.data.items.forEach((video, index) => {
        console.log(`  ${index + 1}. ${video.snippet.title}`);
        console.log(`     Video ID: ${video.id.videoId}`);
        console.log(`     Published: ${video.snippet.publishedAt}`);
        console.log(
          `     Description: ${video.snippet.description?.substring(0, 100)}...`
        );
        console.log(
          `     Thumbnails: ${Object.keys(video.snippet.thumbnails || {})}`
        );
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error getting channel videos:", error.message);
    }
  }

  async getChannelPlaylists() {
    console.log("📚 Test 4: Getting channel playlists...");
    try {
      const response = await this.youtube.playlists.list({
        part: "snippet,contentDetails,status",
        channelId: this.channelId,
        maxResults: 10,
      });

      console.log(`✅ Found ${response.data.items.length} playlists`);

      response.data.items.forEach((playlist, index) => {
        console.log(`  ${index + 1}. ${playlist.snippet.title}`);
        console.log(`     Playlist ID: ${playlist.id}`);
        console.log(`     Item Count: ${playlist.contentDetails.itemCount}`);
        console.log(`     Published: ${playlist.snippet.publishedAt}`);
        console.log(`     Privacy Status: ${playlist.status?.privacyStatus}`);
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error getting channel playlists:", error.message);
    }
  }

  async getChannelStatistics() {
    console.log("📊 Test 5: Getting channel statistics...");
    try {
      const response = await this.youtube.channels.list({
        part: "statistics",
        id: this.channelId,
      });

      if (response.data.items.length > 0) {
        const stats = response.data.items[0].statistics;
        console.log("✅ Channel statistics retrieved");
        console.log("📈 Available statistics:");
        Object.keys(stats).forEach((key) => {
          console.log(`  - ${key}: ${stats[key]}`);
        });
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error getting channel statistics:", error.message);
    }
  }

  async getChannelSections() {
    console.log("📑 Test 6: Getting channel sections...");
    try {
      const response = await this.youtube.channelSections.list({
        part: "snippet,contentDetails",
        channelId: this.channelId,
      });

      console.log(`✅ Found ${response.data.items.length} channel sections`);

      response.data.items.forEach((section, index) => {
        console.log(
          `  ${index + 1}. ${section.snippet.title || "Untitled Section"}`
        );
        console.log(`     Type: ${section.snippet.type}`);
        console.log(`     Style: ${section.snippet.style}`);
        console.log(`     Position: ${section.snippet.position}`);
        if (section.contentDetails) {
          console.log(
            `     Content Details:`,
            Object.keys(section.contentDetails)
          );
        }
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error getting channel sections:", error.message);
    }
  }

  async getChannelBranding() {
    console.log("🎨 Test 7: Getting channel branding settings...");
    try {
      const response = await this.youtube.channels.list({
        part: "brandingSettings",
        id: this.channelId,
      });

      if (
        response.data.items.length > 0 &&
        response.data.items[0].brandingSettings
      ) {
        const branding = response.data.items[0].brandingSettings;
        console.log("✅ Channel branding settings retrieved");
        console.log("🎨 Available branding data:");
        console.log("  - Channel:", !!branding.channel);
        console.log("  - Watch:", !!branding.watch);
        console.log("  - Image:", !!branding.image);
        console.log("  - Hints:", !!branding.hints);

        if (branding.channel) {
          console.log("  - Channel Title:", branding.channel.title);
          console.log(
            "  - Channel Description:",
            branding.channel.description?.substring(0, 100) + "..."
          );
          console.log("  - Keywords:", branding.channel.keywords);
          console.log("  - Default Tab:", branding.channel.defaultTab);
          console.log(
            "  - Unsubscribed Tab:",
            branding.channel.unsubscribedTab
          );
          console.log("  - Profile Color:", branding.channel.profileColor);
        }
      } else {
        console.log(
          "ℹ️  No branding settings accessible (may require authentication)"
        );
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error getting channel branding:", error.message);
    }
  }

  async getChannelContentDetails() {
    console.log("📋 Test 8: Getting channel content details...");
    try {
      const response = await this.youtube.channels.list({
        part: "contentDetails",
        id: this.channelId,
      });

      if (response.data.items.length > 0) {
        const contentDetails = response.data.items[0].contentDetails;
        console.log("✅ Channel content details retrieved");
        console.log("📋 Available content details:");
        console.log(
          "  - Related Playlists:",
          Object.keys(contentDetails.relatedPlaylists || {})
        );

        if (contentDetails.relatedPlaylists) {
          Object.entries(contentDetails.relatedPlaylists).forEach(
            ([key, value]) => {
              console.log(`    ${key}: ${value}`);
            }
          );
        }
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error getting channel content details:", error.message);
    }
  }

  async testSearchFunctionality() {
    console.log("🔍 Test 9: Testing search functionality...");
    try {
      // Search for videos
      const videoSearch = await this.youtube.search.list({
        part: "snippet",
        q: "inversión inmobiliaria",
        type: "video",
        maxResults: 5,
      });

      console.log(
        `✅ Video search found ${videoSearch.data.items.length} results`
      );

      // Search for channels
      const channelSearch = await this.youtube.search.list({
        part: "snippet",
        q: "inmobiliaria",
        type: "channel",
        maxResults: 5,
      });

      console.log(
        `✅ Channel search found ${channelSearch.data.items.length} results`
      );

      // Search for playlists
      const playlistSearch = await this.youtube.search.list({
        part: "snippet",
        q: "inversión",
        type: "playlist",
        maxResults: 5,
      });

      console.log(
        `✅ Playlist search found ${playlistSearch.data.items.length} results`
      );
      console.log("");
    } catch (error) {
      console.error("❌ Error testing search functionality:", error.message);
    }
  }

  async testVideoDetails() {
    console.log("🎬 Test 10: Testing video details...");
    try {
      // First get a video ID from the channel
      const videosResponse = await this.youtube.search.list({
        part: "snippet",
        channelId: this.channelId,
        type: "video",
        maxResults: 1,
      });

      if (videosResponse.data.items.length > 0) {
        const videoId = videosResponse.data.items[0].id.videoId;

        const response = await this.youtube.videos.list({
          part: "snippet,contentDetails,statistics,status,localizations,recordingDetails,fileDetails,processingDetails,player,localizations",
          id: videoId,
        });

        if (response.data.items.length > 0) {
          const video = response.data.items[0];
          console.log("✅ Video details retrieved successfully");
          console.log("📋 Available video data sections:");
          console.log("  - snippet:", !!video.snippet);
          console.log("  - contentDetails:", !!video.contentDetails);
          console.log("  - statistics:", !!video.statistics);
          console.log("  - status:", !!video.status);
          console.log("  - localizations:", !!video.localizations);
          console.log("  - recordingDetails:", !!video.recordingDetails);
          console.log("  - fileDetails:", !!video.fileDetails);
          console.log("  - processingDetails:", !!video.processingDetails);
          console.log("  - player:", !!video.player);

          if (video.snippet) {
            console.log("\n📝 Video Snippet:");
            console.log("  - Title:", video.snippet.title);
            console.log(
              "  - Description:",
              video.snippet.description?.substring(0, 100) + "..."
            );
            console.log("  - Published At:", video.snippet.publishedAt);
            console.log("  - Channel Title:", video.snippet.channelTitle);
            console.log("  - Tags:", video.snippet.tags?.slice(0, 5));
            console.log("  - Category ID:", video.snippet.categoryId);
            console.log(
              "  - Live Broadcast Content:",
              video.snippet.liveBroadcastContent
            );
            console.log("  - Default Language:", video.snippet.defaultLanguage);
            console.log("  - Localized:", !!video.snippet.localized);
          }

          if (video.statistics) {
            console.log("\n📈 Video Statistics:");
            console.log("  - View Count:", video.statistics.viewCount);
            console.log("  - Like Count:", video.statistics.likeCount);
            console.log("  - Dislike Count:", video.statistics.dislikeCount);
            console.log("  - Favorite Count:", video.statistics.favoriteCount);
            console.log("  - Comment Count:", video.statistics.commentCount);
          }

          if (video.contentDetails) {
            console.log("\n🎬 Content Details:");
            console.log("  - Duration:", video.contentDetails.duration);
            console.log("  - Dimension:", video.contentDetails.dimension);
            console.log("  - Definition:", video.contentDetails.definition);
            console.log("  - Caption:", video.contentDetails.caption);
            console.log(
              "  - Licensed Content:",
              video.contentDetails.licensedContent
            );
            console.log(
              "  - Content Rating:",
              !!video.contentDetails.contentRating
            );
            console.log("  - Projection:", video.contentDetails.projection);
          }
        }
      } else {
        console.log("ℹ️  No videos found to test video details");
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error testing video details:", error.message);
    }
  }

  async testPlaylistDetails() {
    console.log("📚 Test 11: Testing playlist details...");
    try {
      // First get a playlist ID from the channel
      const playlistsResponse = await this.youtube.playlists.list({
        part: "snippet",
        channelId: this.channelId,
        maxResults: 1,
      });

      if (playlistsResponse.data.items.length > 0) {
        const playlistId = playlistsResponse.data.items[0].id;

        const response = await this.youtube.playlists.list({
          part: "snippet,contentDetails,status,localizations",
          id: playlistId,
        });

        if (response.data.items.length > 0) {
          const playlist = response.data.items[0];
          console.log("✅ Playlist details retrieved successfully");
          console.log("📋 Available playlist data sections:");
          console.log("  - snippet:", !!playlist.snippet);
          console.log("  - contentDetails:", !!playlist.contentDetails);
          console.log("  - status:", !!playlist.status);
          console.log("  - localizations:", !!playlist.localizations);

          if (playlist.snippet) {
            console.log("\n📝 Playlist Snippet:");
            console.log("  - Title:", playlist.snippet.title);
            console.log(
              "  - Description:",
              playlist.snippet.description?.substring(0, 100) + "..."
            );
            console.log("  - Published At:", playlist.snippet.publishedAt);
            console.log("  - Channel Title:", playlist.snippet.channelTitle);
            console.log(
              "  - Default Language:",
              playlist.snippet.defaultLanguage
            );
            console.log("  - Localized:", !!playlist.snippet.localized);
          }

          if (playlist.contentDetails) {
            console.log("\n📊 Content Details:");
            console.log("  - Item Count:", playlist.contentDetails.itemCount);
          }

          if (playlist.status) {
            console.log("\n🔒 Status:");
            console.log("  - Privacy Status:", playlist.status.privacyStatus);
          }
        }
      } else {
        console.log("ℹ️  No playlists found to test playlist details");
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error testing playlist details:", error.message);
    }
  }

  async testCommentThreads() {
    console.log("💬 Test 12: Testing comment threads...");
    try {
      // First get a video ID from the channel
      const videosResponse = await this.youtube.search.list({
        part: "snippet",
        channelId: this.channelId,
        type: "video",
        maxResults: 1,
      });

      if (videosResponse.data.items.length > 0) {
        const videoId = videosResponse.data.items[0].id.videoId;

        const response = await this.youtube.commentThreads.list({
          part: "snippet,replies",
          videoId: videoId,
          maxResults: 5,
        });

        console.log(`✅ Found ${response.data.items.length} comment threads`);

        response.data.items.forEach((thread, index) => {
          const comment = thread.snippet.topLevelComment.snippet;
          console.log(
            `  ${index + 1}. ${comment.authorDisplayName}: ${comment.textDisplay?.substring(0, 100)}...`
          );
          console.log(`     Published: ${comment.publishedAt}`);
          console.log(`     Like Count: ${comment.likeCount}`);
          console.log(`     Reply Count: ${thread.snippet.totalReplyCount}`);
        });
      } else {
        console.log("ℹ️  No videos found to test comment threads");
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error testing comment threads:", error.message);
    }
  }

  async testSubscriptionStatus() {
    console.log("👥 Test 13: Testing subscription status...");
    try {
      const response = await this.youtube.subscriptions.list({
        part: "snippet,contentDetails",
        channelId: this.channelId,
        maxResults: 5,
      });

      console.log(`✅ Found ${response.data.items.length} subscriptions`);

      response.data.items.forEach((subscription, index) => {
        console.log(`  ${index + 1}. ${subscription.snippet.title}`);
        console.log(
          `     Channel ID: ${subscription.snippet.resourceId.channelId}`
        );
        console.log(`     Published: ${subscription.snippet.publishedAt}`);
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error testing subscription status:", error.message);
    }
  }

  async testChannelActivities() {
    console.log("📈 Test 14: Testing channel activities...");
    try {
      const response = await this.youtube.activities.list({
        part: "snippet,contentDetails",
        channelId: this.channelId,
        maxResults: 10,
      });

      console.log(`✅ Found ${response.data.items.length} channel activities`);

      response.data.items.forEach((activity, index) => {
        console.log(`  ${index + 1}. ${activity.snippet.title}`);
        console.log(`     Type: ${activity.snippet.type}`);
        console.log(`     Published: ${activity.snippet.publishedAt}`);
        console.log(
          `     Description: ${activity.snippet.description?.substring(0, 100)}...`
        );
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error testing channel activities:", error.message);
    }
  }

  async testCaptions() {
    console.log("📝 Test 15: Testing captions...");
    try {
      // First get a video ID from the channel
      const videosResponse = await this.youtube.search.list({
        part: "snippet",
        channelId: this.channelId,
        type: "video",
        maxResults: 1,
      });

      if (videosResponse.data.items.length > 0) {
        const videoId = videosResponse.data.items[0].id.videoId;

        const response = await this.youtube.captions.list({
          part: "snippet",
          videoId: videoId,
        });

        console.log(
          `✅ Found ${response.data.items.length} captions for video`
        );

        response.data.items.forEach((caption, index) => {
          console.log(`  ${index + 1}. ${caption.snippet.name}`);
          console.log(`     Language: ${caption.snippet.language}`);
          console.log(`     Track Kind: ${caption.snippet.trackKind}`);
          console.log(`     Status: ${caption.snippet.status}`);
        });
      } else {
        console.log("ℹ️  No videos found to test captions");
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error testing captions:", error.message);
    }
  }

  async testThumbnails() {
    console.log("🖼️  Test 16: Testing thumbnails...");
    try {
      // First get a video ID from the channel
      const videosResponse = await this.youtube.search.list({
        part: "snippet",
        channelId: this.channelId,
        type: "video",
        maxResults: 1,
      });

      if (videosResponse.data.items.length > 0) {
        const videoId = videosResponse.data.items[0].id.videoId;

        const response = await this.youtube.thumbnails.set({
          videoId: videoId,
        });

        console.log("✅ Thumbnails API accessible");
        console.log(
          "ℹ️  Note: Thumbnails.set requires authentication and media upload"
        );
      } else {
        console.log("ℹ️  No videos found to test thumbnails");
      }
      console.log("");
    } catch (error) {
      console.error("❌ Error testing thumbnails:", error.message);
    }
  }

  async testVideoCategories() {
    console.log("📂 Test 17: Testing video categories...");
    try {
      const response = await this.youtube.videoCategories.list({
        part: "snippet",
        regionCode: "ES", // Spain
      });

      console.log(
        `✅ Found ${response.data.items.length} video categories for Spain`
      );

      response.data.items.slice(0, 10).forEach((category, index) => {
        console.log(
          `  ${index + 1}. ${category.snippet.title} (ID: ${category.id})`
        );
        console.log(`     Assignable: ${category.snippet.assignable}`);
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error testing video categories:", error.message);
    }
  }

  async testI18nLanguages() {
    console.log("🌍 Test 18: Testing i18n languages...");
    try {
      const response = await this.youtube.i18nLanguages.list({
        part: "snippet",
      });

      console.log(`✅ Found ${response.data.items.length} supported languages`);

      response.data.items.slice(0, 10).forEach((language, index) => {
        console.log(
          `  ${index + 1}. ${language.snippet.name} (${language.snippet.hl})`
        );
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error testing i18n languages:", error.message);
    }
  }

  async testRegions() {
    console.log("🗺️  Test 19: Testing regions...");
    try {
      const response = await this.youtube.i18nRegions.list({
        part: "snippet",
      });

      console.log(`✅ Found ${response.data.items.length} supported regions`);

      response.data.items.slice(0, 10).forEach((region, index) => {
        console.log(
          `  ${index + 1}. ${region.snippet.name} (${region.snippet.gl})`
        );
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error testing regions:", error.message);
    }
  }

  async testGuideCategories() {
    console.log("📋 Test 20: Testing guide categories...");
    try {
      const response = await this.youtube.guideCategories.list({
        part: "snippet",
        regionCode: "ES",
      });

      console.log(
        `✅ Found ${response.data.items.length} guide categories for Spain`
      );

      response.data.items.slice(0, 10).forEach((category, index) => {
        console.log(
          `  ${index + 1}. ${category.snippet.title} (ID: ${category.id})`
        );
      });
      console.log("");
    } catch (error) {
      console.error("❌ Error testing guide categories:", error.message);
    }
  }

  // Summary method to show all available actions
  showAvailableActions() {
    console.log("\n🎯 SUMMARY: Available YouTube Data API v3 Actions\n");
    console.log("📊 READ-ONLY ACTIONS (No Authentication Required):");
    console.log("  ✅ Search for channels, videos, playlists");
    console.log(
      "  ✅ Get channel information (snippet, statistics, contentDetails)"
    );
    console.log(
      "  ✅ Get video information (snippet, statistics, contentDetails)"
    );
    console.log("  ✅ Get playlist information");
    console.log("  ✅ Get channel sections");
    console.log("  ✅ Get comment threads");
    console.log("  ✅ Get channel activities");
    console.log("  ✅ Get video categories");
    console.log("  ✅ Get i18n languages and regions");
    console.log("  ✅ Get guide categories");
    console.log("  ✅ Get captions list");
    console.log("  ✅ Get subscription lists");

    console.log("\n🔒 WRITE ACTIONS (Authentication Required):");
    console.log("  🔐 Update channel information");
    console.log("  🔐 Update video information");
    console.log("  🔐 Create/update/delete playlists");
    console.log("  🔐 Upload videos");
    console.log("  🔐 Manage comments");
    console.log("  🔐 Manage subscriptions");
    console.log("  🔐 Manage channel sections");
    console.log("  🔐 Manage captions");
    console.log("  🔐 Manage thumbnails");
    console.log("  🔐 Manage channel branding");

    console.log("\n📈 ANALYTICS ACTIONS (Special Permissions):");
    console.log("  📊 Get detailed analytics data");
    console.log("  📊 Get revenue data");
    console.log("  📊 Get demographic data");
    console.log("  📊 Get geographic data");
    console.log("  📊 Get device data");

    console.log("\n💡 RECOMMENDATIONS:");
    console.log(
      "  1. Use read-only actions to display channel content on your website"
    );
    console.log(
      "  2. Implement OAuth2 for write actions if you need to manage content"
    );
    console.log("  3. Consider YouTube Analytics API for detailed metrics");
    console.log("  4. Use the search API to find related content");
    console.log("  5. Implement caching for frequently accessed data");
  }
}

// Run the tests
async function main() {
  const tester = new YouTubeAPITester();
  await tester.runAllTests();
  tester.showAvailableActions();
}

// Check if API key is available
if (
  !process.env.YOUTUBE_API_KEY ||
  process.env.YOUTUBE_API_KEY === "your_youtube_api_key_here"
) {
  console.error("❌ YOUTUBE_API_KEY not found or not configured");
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
  console.log("\n📚 Available YouTube Data API v3 Actions:");
  console.log("✅ READ-ONLY (No Auth Required):");
  console.log("  - Search channels, videos, playlists");
  console.log("  - Get channel info (stats, videos, playlists)");
  console.log("  - Get video details and statistics");
  console.log("  - Get comment threads");
  console.log("  - Get channel activities");
  console.log("  - Get video categories and regions");
  console.log("\n🔒 WRITE ACTIONS (OAuth2 Required):");
  console.log("  - Update channel/video information");
  console.log("  - Create/delete playlists");
  console.log("  - Upload videos");
  console.log("  - Manage comments and subscriptions");
  console.log("  - Manage captions and thumbnails");
  console.log("\n📈 ANALYTICS (Special Permissions):");
  console.log("  - Detailed analytics data");
  console.log("  - Revenue and demographic data");
  console.log("  - Geographic and device data");
  process.exit(1);
}

main().catch(console.error);
