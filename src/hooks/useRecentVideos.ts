import { useState, useEffect } from "react";

interface VideoData {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

interface UseRecentVideosReturn {
  videos: VideoData[];
  loading: boolean;
  error: string | null;
}

export function useRecentVideos(limit: number = 5): UseRecentVideosReturn {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/youtube/recent-videos?limit=${limit}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setVideos(data);
      } catch (err) {
        console.error("Error fetching recent videos:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch recent videos"
        );
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentVideos();
  }, [limit]);

  return { videos, loading, error };
}
