// YouTube Data API v3 Demo - Shows expected data structures
// This demo shows what data you can expect from the YouTube API without requiring an API key

console.log("🎬 YouTube Data API v3 Demo - Expected Data Structures\n");

// Demo 1: Channel Information Structure
console.log("📊 1. CHANNEL INFORMATION STRUCTURE:");
console.log("```json");
console.log(
  JSON.stringify(
    {
      kind: "youtube#channel",
      etag: "etag_string",
      id: "UCxxxxxxxxxxxxxxxxxxxxx",
      snippet: {
        title: "InmoInversor",
        description: "Canal sobre inversión inmobiliaria en España...",
        customUrl: "@inmoinversor",
        publishedAt: "2020-01-01T00:00:00Z",
        thumbnails: {
          default: { url: "https://...", width: 88, height: 88 },
          medium: { url: "https://...", width: 240, height: 240 },
          high: { url: "https://...", width: 800, height: 800 },
        },
        defaultLanguage: "es",
        localized: {
          title: "InmoInversor",
          description: "Canal sobre inversión inmobiliaria...",
        },
        country: "ES",
      },
      contentDetails: {
        relatedPlaylists: {
          likes: "LLxxxxxxxxxxxxxxxxxxxxx",
          favorites: "FLxxxxxxxxxxxxxxxxxxxxx",
          uploads: "UUxxxxxxxxxxxxxxxxxxxxx",
          watchHistory: "HLxxxxxxxxxxxxxxxxxxxxx",
          watchLater: "WLxxxxxxxxxxxxxxxxxxxxx",
        },
      },
      statistics: {
        viewCount: "1000000",
        subscriberCount: "50000",
        hiddenSubscriberCount: false,
        videoCount: "200",
      },
      brandingSettings: {
        channel: {
          title: "InmoInversor",
          description: "Canal sobre inversión inmobiliaria...",
          keywords: "inversión,inmobiliaria,españa,alquiler",
          defaultTab: "Home",
          unsubscribedTab: "Home",
          profileColor: "#FF0000",
        },
        watch: {
          textColor: "#FF0000",
          backgroundColor: "#FFFFFF",
          featuredPlaylistId: "PLxxxxxxxxxxxxxxxxxxxxx",
        },
      },
      status: {
        privacyStatus: "public",
        isLinked: true,
        longUploadsStatus: "allowed",
        madeForKids: false,
        selfDeclaredMadeForKids: false,
      },
    },
    null,
    2
  )
);
console.log("```\n");

// Demo 2: Video Information Structure
console.log("🎥 2. VIDEO INFORMATION STRUCTURE:");
console.log("```json");
console.log(
  JSON.stringify(
    {
      kind: "youtube#video",
      etag: "etag_string",
      id: "dQw4w9WgXcQ",
      snippet: {
        publishedAt: "2024-01-15T10:00:00Z",
        channelId: "UCxxxxxxxxxxxxxxxxxxxxx",
        title: "Cómo Analizar una Propiedad de Alquiler en 10 Minutos",
        description: "En este video te enseño cómo analizar una propiedad...",
        thumbnails: {
          default: { url: "https://...", width: 120, height: 90 },
          medium: { url: "https://...", width: 320, height: 180 },
          high: { url: "https://...", width: 480, height: 360 },
          standard: { url: "https://...", width: 640, height: 480 },
          maxres: { url: "https://...", width: 1280, height: 720 },
        },
        channelTitle: "InmoInversor",
        tags: [
          "inversión",
          "inmobiliaria",
          "alquiler",
          "análisis",
          "propiedad",
        ],
        categoryId: "26", // Howto & Style
        liveBroadcastContent: "none",
        defaultLanguage: "es",
        localized: {
          title: "Cómo Analizar una Propiedad de Alquiler en 10 Minutos",
          description: "En este video te enseño cómo analizar una propiedad...",
        },
      },
      contentDetails: {
        duration: "PT10M30S", // 10 minutes 30 seconds
        dimension: "2d",
        definition: "hd",
        caption: "true",
        licensedContent: false,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "15000",
        likeCount: "500",
        dislikeCount: "10",
        favoriteCount: "0",
        commentCount: "45",
      },
      status: {
        uploadStatus: "processed",
        failureReason: "",
        rejectionReason: "",
        privacyStatus: "public",
        publishAt: "2024-01-15T10:00:00Z",
        license: "youtube",
        embeddable: true,
        publicStatsViewable: true,
        madeForKids: false,
        selfDeclaredMadeForKids: false,
      },
    },
    null,
    2
  )
);
console.log("```\n");

// Demo 3: Playlist Information Structure
console.log("📚 3. PLAYLIST INFORMATION STRUCTURE:");
console.log("```json");
console.log(
  JSON.stringify(
    {
      kind: "youtube#playlist",
      etag: "etag_string",
      id: "PLxxxxxxxxxxxxxxxxxxxxx",
      snippet: {
        publishedAt: "2024-01-01T00:00:00Z",
        channelId: "UCxxxxxxxxxxxxxxxxxxxxx",
        title: "Guía Completa de Inversión Inmobiliaria",
        description:
          "Una colección completa de videos sobre inversión inmobiliaria...",
        thumbnails: {
          default: { url: "https://...", width: 120, height: 90 },
          medium: { url: "https://...", width: 320, height: 180 },
          high: { url: "https://...", width: 480, height: 360 },
          standard: { url: "https://...", width: 640, height: 480 },
          maxres: { url: "https://...", width: 1280, height: 720 },
        },
        channelTitle: "InmoInversor",
        defaultLanguage: "es",
        localized: {
          title: "Guía Completa de Inversión Inmobiliaria",
          description:
            "Una colección completa de videos sobre inversión inmobiliaria...",
        },
      },
      contentDetails: {
        itemCount: 25,
      },
      status: {
        privacyStatus: "public",
      },
    },
    null,
    2
  )
);
console.log("```\n");

// Demo 4: Comment Thread Structure
console.log("💬 4. COMMENT THREAD STRUCTURE:");
console.log("```json");
console.log(
  JSON.stringify(
    {
      kind: "youtube#commentThread",
      etag: "etag_string",
      id: "UgzXxxxxxxxxxxxxxxxxxxxxx",
      snippet: {
        videoId: "dQw4w9WgXcQ",
        topLevelComment: {
          kind: "youtube#comment",
          etag: "etag_string",
          id: "UgzXxxxxxxxxxxxxxxxxxxxxx",
          snippet: {
            videoId: "dQw4w9WgXcQ",
            textDisplay: "Excelente video, muy útil para principiantes",
            textOriginal: "Excelente video, muy útil para principiantes",
            authorDisplayName: "Usuario123",
            authorProfileImageUrl: "https://...",
            authorChannelUrl: "https://www.youtube.com/channel/UC...",
            authorChannelId: {
              value: "UCxxxxxxxxxxxxxxxxxxxxx",
            },
            canRate: true,
            viewerRating: "none",
            likeCount: 5,
            publishedAt: "2024-01-16T15:30:00Z",
            updatedAt: "2024-01-16T15:30:00Z",
          },
        },
        canReply: true,
        totalReplyCount: 2,
        isPublic: true,
      },
      replies: {
        comments: [
          {
            kind: "youtube#comment",
            etag: "etag_string",
            id: "UgzXxxxxxxxxxxxxxxxxxxxxx",
            snippet: {
              videoId: "dQw4w9WgXcQ",
              textDisplay: "Gracias por el comentario!",
              textOriginal: "Gracias por el comentario!",
              parentId: "UgzXxxxxxxxxxxxxxxxxxxxxx",
              authorDisplayName: "InmoInversor",
              authorProfileImageUrl: "https://...",
              authorChannelUrl: "https://www.youtube.com/channel/UC...",
              authorChannelId: {
                value: "UCxxxxxxxxxxxxxxxxxxxxx",
              },
              canRate: true,
              viewerRating: "none",
              likeCount: 1,
              publishedAt: "2024-01-16T16:00:00Z",
              updatedAt: "2024-01-16T16:00:00Z",
            },
          },
        ],
      },
    },
    null,
    2
  )
);
console.log("```\n");

// Demo 5: Search Results Structure
console.log("🔍 5. SEARCH RESULTS STRUCTURE:");
console.log("```json");
console.log(
  JSON.stringify(
    {
      kind: "youtube#searchListResponse",
      etag: "etag_string",
      nextPageToken: "CAUQAA",
      prevPageToken: "CAQQAA",
      pageInfo: {
        totalResults: 1000,
        resultsPerPage: 5,
      },
      items: [
        {
          kind: "youtube#searchResult",
          etag: "etag_string",
          id: {
            kind: "youtube#video",
            videoId: "dQw4w9WgXcQ",
          },
          snippet: {
            publishedAt: "2024-01-15T10:00:00Z",
            channelId: "UCxxxxxxxxxxxxxxxxxxxxx",
            title: "Cómo Analizar una Propiedad de Alquiler en 10 Minutos",
            description:
              "En este video te enseño cómo analizar una propiedad...",
            thumbnails: {
              default: { url: "https://...", width: 120, height: 90 },
              medium: { url: "https://...", width: 320, height: 180 },
              high: { url: "https://...", width: 480, height: 360 },
            },
            channelTitle: "InmoInversor",
            liveBroadcastContent: "none",
            publishTime: "2024-01-15T10:00:00Z",
          },
        },
      ],
    },
    null,
    2
  )
);
console.log("```\n");

console.log("🎯 AVAILABLE YOUTUBE DATA API v3 ACTIONS:\n");

console.log("✅ READ-ONLY ACTIONS (API Key Only):");
console.log("  📊 channels.list - Get channel information");
console.log("  🎥 videos.list - Get video details and statistics");
console.log("  📚 playlists.list - Get playlist information");
console.log("  🔍 search.list - Search for videos, channels, playlists");
console.log("  💬 commentThreads.list - Get video comments");
console.log("  📈 activities.list - Get channel activities");
console.log("  📑 channelSections.list - Get channel sections/tabs");
console.log("  📝 captions.list - Get video captions");
console.log("  👥 subscriptions.list - Get channel subscriptions");
console.log("  📂 videoCategories.list - Get video categories");
console.log("  🌍 i18nLanguages.list - Get supported languages");
console.log("  🗺️  i18nRegions.list - Get supported regions");
console.log("  📋 guideCategories.list - Get guide categories\n");

console.log("🔒 WRITE ACTIONS (OAuth2 Required):");
console.log("  ✏️  channels.update - Update channel information");
console.log("  ✏️  videos.update - Update video information");
console.log("  ➕ playlists.insert - Create new playlist");
console.log("  ✏️  playlists.update - Update playlist");
console.log("  🗑️  playlists.delete - Delete playlist");
console.log("  📤 videos.insert - Upload new video");
console.log("  💬 comments.insert - Add comment");
console.log("  ✏️  comments.update - Update comment");
console.log("  🗑️  comments.delete - Delete comment");
console.log("  👥 subscriptions.insert - Subscribe to channel");
console.log("  🗑️  subscriptions.delete - Unsubscribe from channel");
console.log("  📑 channelSections.insert - Create channel section");
console.log("  ✏️  channelSections.update - Update channel section");
console.log("  🗑️  channelSections.delete - Delete channel section");
console.log("  📝 captions.insert - Add captions");
console.log("  ✏️  captions.update - Update captions");
console.log("  🗑️  captions.delete - Delete captions");
console.log("  🖼️  thumbnails.set - Set video thumbnail\n");

console.log("📈 ANALYTICS ACTIONS (Special Permissions):");
console.log("  📊 YouTube Analytics API - Detailed analytics data");
console.log("  💰 Revenue data and monetization metrics");
console.log("  👥 Demographic data (age, gender, location)");
console.log("  🌍 Geographic data (views by country/region)");
console.log("  📱 Device data (mobile, desktop, TV)");
console.log("  ⏰ Time-based data (views over time)");
console.log("  🎯 Traffic source data (how viewers found videos)\n");

console.log("💡 IMPLEMENTATION RECOMMENDATIONS:\n");
console.log("1. 🏠 HOMEPAGE INTEGRATION:");
console.log("   - Display latest videos from inmoinversor channel");
console.log("   - Show channel statistics (subscribers, total views)");
console.log("   - Featured playlists for different topics\n");

console.log("2. 📚 CONTENT PAGES:");
console.log("   - Embed relevant videos in blog posts");
console.log("   - Create video galleries by topic");
console.log("   - Show related videos based on content\n");

console.log("3. 🔍 SEARCH FUNCTIONALITY:");
console.log("   - Search videos by keywords");
console.log("   - Filter by date, duration, category");
console.log("   - Show search suggestions\n");

console.log("4. 📊 ANALYTICS DASHBOARD:");
console.log("   - Track video performance");
console.log("   - Monitor subscriber growth");
console.log("   - Analyze viewer engagement\n");

console.log("5. 🎯 USER ENGAGEMENT:");
console.log("   - Display recent comments");
console.log("   - Show channel activities");
console.log("   - Encourage subscriptions\n");

console.log("🚀 NEXT STEPS:");
console.log("1. Add your YouTube API key to .env.local");
console.log("2. Run: npm run test:youtube");
console.log("3. Explore the actual data from your channel");
console.log("4. Implement React components to display the data");
console.log("5. Set up caching for better performance");
console.log("6. Consider OAuth2 for write operations if needed\n");

console.log("📖 For more information, visit:");
console.log("https://developers.google.com/youtube/v3/docs");
