import { NextResponse } from "next/server";
import { youtubeService } from "@/lib/youtube";
import { checkAdminAuth } from "@/lib/auth/api-auth";

export async function GET(request: Request) {
  try {
    // Check admin authentication
    const { error: authError } = await checkAdminAuth();
    if (authError) {
      return authError;
    }

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
