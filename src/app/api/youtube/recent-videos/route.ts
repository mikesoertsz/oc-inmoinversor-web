import { NextResponse } from "next/server";
import { youtubeService } from "@/lib/youtube";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5");

    const recentVideos = await youtubeService.getRecentVideos(limit);

    if (!recentVideos) {
      return NextResponse.json({ error: "No videos found" }, { status: 404 });
    }

    return NextResponse.json(recentVideos);
  } catch (error) {
    console.error("Error fetching recent videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent videos" },
      { status: 500 }
    );
  }
}
