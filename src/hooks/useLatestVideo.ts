import { useState, useEffect } from "react";

interface VideoData {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

interface UseLatestVideoReturn {
  video: VideoData | null;
  loading: boolean;
  error: string | null;
}

export function useLatestVideo(): UseLatestVideoReturn {
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching latest video from API...");
        const response = await fetch("/api/youtube/latest-video");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        console.log("Latest video fetched successfully:", data);
        setVideo(data);
      } catch (err) {
        console.error("Error fetching latest video:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch video");
        // Don't set video to null here - we want to keep the fallback
      } finally {
        console.log("Setting loading to false");
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  return { video, loading, error };
}
