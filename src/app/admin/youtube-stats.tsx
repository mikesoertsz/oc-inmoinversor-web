"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface YouTubeStats {
  totalVideos: number;
  totalViews: number;
  subscriberCount: number;
}

export default function YouTubeStats() {
  const [stats, setStats] = useState<YouTubeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/youtube/channel-stats");

        if (!response.ok) {
          throw new Error("Failed to fetch YouTube stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Skeleton className="h-8 w-16" />;
  }

  if (error) {
    return <span className="text-red-500 text-sm">Error loading stats</span>;
  }

  if (!stats) {
    return (
      <span className="text-muted-foreground text-sm">No data available</span>
    );
  }

  return (
    <div className="text-2xl font-bold">
      {stats.totalVideos.toLocaleString()}
    </div>
  );
}
