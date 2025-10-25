import { NextResponse } from "next/server";
import { youtubeService } from "@/lib/youtube";
import { checkAdminAuth } from "@/lib/auth/api-auth";

export async function GET() {
  try {
    // Check admin authentication
    const { error: authError } = await checkAdminAuth();
    if (authError) {
      return authError;
    }

    const channelStats = await youtubeService.getChannelStats();

    if (!channelStats) {
      return NextResponse.json(
        { error: "No channel stats found" },
        { status: 404 }
      );
    }

    return NextResponse.json(channelStats);
  } catch (error) {
    console.error("Error fetching channel stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch channel stats" },
      { status: 500 }
    );
  }
}
