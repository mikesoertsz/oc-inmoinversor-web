import { useState, useEffect } from "react";

interface ChannelStats {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

interface UseChannelStatsReturn {
  stats: ChannelStats | null;
  loading: boolean;
  error: string | null;
}

export function useChannelStats(): UseChannelStatsReturn {
  const [stats, setStats] = useState<ChannelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChannelStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/youtube/channel-stats");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setStats(data);
      } catch (err) {
        console.error("Error fetching channel stats:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch channel stats"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChannelStats();
  }, []);

  return { stats, loading, error };
}
