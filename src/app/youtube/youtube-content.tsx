"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ExternalLink, Eye, Play, Users, Video } from "lucide-react";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";

interface ChannelStats {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

interface VideoData {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

interface YouTubeContentProps {
  stats: ChannelStats | null;
  latestVideo: VideoData | null;
  recentVideos: VideoData[];
  statsLoading: boolean;
  videoLoading: boolean;
  videosLoading: boolean;
  statsError: string | null;
  videoError: string | null;
  videosError: string | null;
}

function formatNumber(num: string): string {
  const number = parseInt(num);
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  }
  return number.toString();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function YouTubeContent({
  stats,
  latestVideo,
  recentVideos,
  statsLoading,
  videoLoading,
  videosLoading,
  statsError,
  videoError,
  videosError,
}: YouTubeContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Canal InmoInversor
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Contenido especializado en inversión inmobiliaria, estrategias de
            alquiler y análisis del mercado español
          </p>
        </div>

        {/* Channel Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                  <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Suscriptores
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {statsLoading
                      ? "..."
                      : statsError
                        ? "Error"
                        : formatNumber(stats?.subscriberCount || "0")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Videos
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {statsLoading
                      ? "..."
                      : statsError
                        ? "Error"
                        : formatNumber(stats?.videoCount || "0")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Visualizaciones
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {statsLoading
                      ? "..."
                      : statsError
                        ? "Error"
                        : formatNumber(stats?.viewCount || "0")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Latest Video */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Último Video</CardTitle>
          </CardHeader>
          <CardContent>
            {videoLoading ? (
              <div className="animate-pulse">
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              </div>
            ) : videoError ? (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">
                  Error al cargar el video
                </p>
              </div>
            ) : latestVideo ? (
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                    width="100%"
                    height="100%"
                    controls
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {latestVideo.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(latestVideo.publishedAt)}</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
                  {latestVideo.description}
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Ver en YouTube</span>
                    </a>
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Recent Videos */}
        <Card>
          <CardHeader>
            <CardTitle>Videos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            {videosLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg mb-3"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : videosError ? (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">
                  Error al cargar los videos
                </p>
              </div>
            ) : recentVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentVideos.map((video) => (
                  <div key={video.videoId} className="group">
                    <div className="aspect-video rounded-lg overflow-hidden mb-3 relative">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Ver Video</span>
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400">
                  No se encontraron videos
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
