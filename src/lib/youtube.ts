import { google } from "googleapis";

// YouTube API service for fetching channel data
export class YouTubeService {
  private youtube: ReturnType<typeof google.youtube>;
  private channelName = "inmoinversor";
  private channelId: string | null = null;

  constructor() {
    this.youtube = google.youtube({ version: "v3" });
  }

  // Find channel by name
  private async findChannelByName(): Promise<string | null> {
    if (!this.youtube) return null;

    try {
      const response = await this.youtube.search.list({
        part: ["snippet"],
        q: this.channelName,
        type: ["channel"],
        maxResults: 1,
      });

      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0].id?.channelId || null;
      }

      return null;
    } catch (error) {
      console.error("Error finding channel:", error);
      return null;
    }
  }

  // Get the most recent video from the channel
  async getLatestVideo(): Promise<{
    videoId: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnail: string;
  } | null> {
    if (!this.youtube) return null;

    try {
      // Get channel ID if not already cached
      if (!this.channelId) {
        this.channelId = await this.findChannelByName();
        if (!this.channelId) return null;
      }

      // Search for the most recent video from the channel
      const response = await this.youtube.search.list({
        part: ["snippet"],
        channelId: this.channelId,
        type: ["video"],
        order: "date",
        maxResults: 1,
      });

      if (response.data.items && response.data.items.length > 0) {
        const video = response.data.items[0];
        return {
          videoId: video.id?.videoId || "",
          title: video.snippet?.title || "",
          description: video.snippet?.description || "",
          publishedAt: video.snippet?.publishedAt || "",
          thumbnail:
            video.snippet?.thumbnails?.high?.url ||
            video.snippet?.thumbnails?.medium?.url ||
            "",
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching latest video:", error);
      return null;
    }
  }

  // Get channel statistics
  async getChannelStats(): Promise<{
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  } | null> {
    if (!this.youtube) return null;

    try {
      if (!this.channelId) {
        this.channelId = await this.findChannelByName();
        if (!this.channelId) return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (this.youtube.channels.list as any)({
        part: "statistics",
        id: this.channelId,
      });

      if (response.data.items && response.data.items.length > 0) {
        const stats = response.data.items[0].statistics;
        return {
          subscriberCount: stats.subscriberCount || "0",
          videoCount: stats.videoCount || "0",
          viewCount: stats.viewCount || "0",
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching channel stats:", error);
      return null;
    }
  }

  // Get recent videos (for potential future use)
  async getRecentVideos(limit: number = 5): Promise<Array<{
    videoId: string;
    title: string;
    description: string;
    publishedAt: string;
    thumbnail: string;
  }> | null> {
    if (!this.youtube) return null;

    try {
      if (!this.channelId) {
        this.channelId = await this.findChannelByName();
        if (!this.channelId) return null;
      }

      const response = await this.youtube.search.list({
        part: ["snippet"],
        channelId: this.channelId,
        type: ["video"],
        order: "date",
        maxResults: limit,
      });

      if (response.data.items && response.data.items.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.data.items.map((video: any) => ({
          videoId: video.id?.videoId || "",
          title: video.snippet?.title || "",
          description: video.snippet?.description || "",
          publishedAt: video.snippet?.publishedAt || "",
          thumbnail:
            video.snippet?.thumbnails?.high?.url ||
            video.snippet?.thumbnails?.medium?.url ||
            "",
        }));
      }

      return null;
    } catch (error) {
      console.error("Error fetching recent videos:", error);
      return null;
    }
  }
}

// Create a singleton instance
export const youtubeService = new YouTubeService();
