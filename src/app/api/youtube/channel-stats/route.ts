import { NextResponse } from "next/server";
import { youtubeService } from "@/lib/youtube";

export async function GET() {
  try {
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
