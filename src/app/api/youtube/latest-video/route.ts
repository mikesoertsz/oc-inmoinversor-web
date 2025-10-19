import { NextResponse } from "next/server";
import { youtubeService } from "@/lib/youtube";

export async function GET() {
  try {
    const latestVideo = await youtubeService.getLatestVideo();

    if (!latestVideo) {
      return NextResponse.json({ error: "No video found" }, { status: 404 });
    }

    return NextResponse.json(latestVideo);
  } catch (error) {
    console.error("Error fetching latest video:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest video" },
      { status: 500 }
    );
  }
}
