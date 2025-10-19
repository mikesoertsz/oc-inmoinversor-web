# YouTube Integration - Dynamic Latest Video

This document describes the YouTube integration that dynamically fetches and displays the latest video from the inmoinversor channel on the homepage.

## 🎯 Overview

The `attention-lastvideo.tsx` component now automatically fetches the most recent video from the inmoinversor YouTube channel and displays it on the homepage. If the API call fails, it gracefully falls back to the default video.

## 📁 Files Created/Modified

### New Files:

- `src/lib/youtube.ts` - YouTube API service
- `src/app/api/youtube/latest-video/route.ts` - API endpoint
- `src/hooks/useLatestVideo.ts` - React hook for fetching video data
- `tests/test-latest-video-api.js` - Test script

### Modified Files:

- `src/app/(shared)/attention-lastvideo.tsx` - Updated to use dynamic video fetching
- `package.json` - Added test script

## 🔧 How It Works

1. **Component Load**: When the homepage loads, the `LastVideo` component renders
2. **Hook Execution**: The `useLatestVideo` hook makes a request to `/api/youtube/latest-video`
3. **API Call**: The API route uses the YouTube service to fetch the latest video
4. **Data Processing**: The service finds the inmoinversor channel and gets the most recent video
5. **Display**: The component shows the latest video or falls back to the default

## 🛠️ Setup Instructions

### 1. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy the API key

### 2. Configure Environment

Create `.env.local` file in project root:

```bash
YOUTUBE_API_KEY=your_actual_api_key_here
```

### 3. Test the Integration

```bash
# Test the YouTube service directly
npm run test:latest-video

# Test the full API suite
npm run test:youtube

# Start development server
npm run dev
```

## 🎬 Component Behavior

### Success Case:

- Fetches latest video from inmoinversor channel
- Updates video title dynamically
- Shows the new video in the player

### Fallback Case:

- If API fails or no video found
- Shows default video: "El plan de Inmo para 2025"
- Displays subtle error message: "Mostrando video por defecto"

### Loading States:

- Shows "Cargando último video..." while fetching
- Shows "Cargando video..." for ReactPlayer loading

## 📊 Available Data

The integration provides access to:

- **Video Information**: ID, title, description, publish date, thumbnail
- **Channel Statistics**: Subscriber count, video count, total views
- **Recent Videos**: List of recent videos (for future features)

## 🔄 API Endpoints

### GET `/api/youtube/latest-video`

Returns the most recent video from the inmoinversor channel.

**Response:**

```json
{
  "videoId": "dQw4w9WgXcQ",
  "title": "Video Title",
  "description": "Video description...",
  "publishedAt": "2024-01-15T10:00:00Z",
  "thumbnail": "https://..."
}
```

## 🚀 Future Enhancements

Potential improvements:

1. **Caching**: Add Redis/memory caching for API responses
2. **Video Gallery**: Display multiple recent videos
3. **Channel Stats**: Show subscriber count and other metrics
4. **Video Categories**: Filter videos by topic/playlist
5. **Analytics**: Track video engagement and performance

## 🐛 Troubleshooting

### Common Issues:

1. **"No video found"**

   - Check if API key is correctly set in `.env.local`
   - Verify YouTube Data API v3 is enabled
   - Ensure API key has proper permissions

2. **"Failed to fetch latest video"**

   - Check network connectivity
   - Verify the inmoinversor channel exists
   - Check API quota limits

3. **Component shows default video**
   - This is expected behavior when API fails
   - Check browser console for error messages
   - Verify API endpoint is accessible

### Debug Steps:

1. Run `npm run test:latest-video` to test the service
2. Check browser Network tab for API calls
3. Verify `.env.local` file exists and has correct API key
4. Test API endpoint directly: `http://localhost:3000/api/youtube/latest-video`

## 📝 Notes

- The component gracefully handles all error states
- No breaking changes to existing functionality
- Maintains the same visual design and user experience
- API calls are made server-side for better performance
- Fallback ensures the page always shows a video
