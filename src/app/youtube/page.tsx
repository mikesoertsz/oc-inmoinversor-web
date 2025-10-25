import YouTubeContent from "./youtube-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canal de YouTube",
  description:
    "Videos sobre inversión inmobiliaria y análisis del mercado español. Contenido especializado en bienes raíces, estrategias de alquiler y oportunidades de inversión.",
};

async function fetchChannelStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/youtube/channel-stats`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!response.ok) throw new Error("Failed to fetch channel stats");
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchLatestVideo() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/youtube/latest-video`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("Failed to fetch latest video");
    return await response.json();
  } catch {
    return null;
  }
}

async function fetchRecentVideos(limit = 6) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/youtube/recent-videos?limit=${limit}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch recent videos");
    return await response.json();
  } catch {
    return [];
  }
}

export default async function YouTubePage() {
  const [stats, latestVideo, recentVideos] = await Promise.all([
    fetchChannelStats(),
    fetchLatestVideo(),
    fetchRecentVideos(6),
  ]);

  return (
    <YouTubeContent
      stats={stats}
      latestVideo={latestVideo}
      recentVideos={recentVideos}
      statsLoading={false}
      videoLoading={false}
      videosLoading={false}
      statsError={stats ? null : "Failed to load channel stats"}
      videoError={latestVideo ? null : "Failed to load latest video"}
      videosError={recentVideos ? null : "Failed to load recent videos"}
    />
  );
}
