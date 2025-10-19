# YouTube Data API v3 Tests

This folder contains tests to explore the YouTube Data API v3 capabilities for the inmoinversor channel.

## Setup

1. Make sure you have your YouTube Data API v3 key in your `.env.local` file:

   ```
   YOUTUBE_API_KEY=your_api_key_here
   ```

2. Install dependencies (already done):
   ```bash
   npm install googleapis dotenv
   ```

## Running the Tests

Run the comprehensive YouTube API test:

```bash
npm run test:youtube
```

Or directly:

```bash
node tests/youtube-api-test.js
```

## What the Test Does

The test will explore the following YouTube Data API v3 capabilities:

### 🔍 **Channel Discovery**

- Find the "inmoinversor" channel by name
- Get detailed channel information including statistics, branding, and content details

### 📊 **Data Retrieval**

- Channel information (snippet, statistics, contentDetails, brandingSettings, status)
- Recent videos from the channel
- Channel playlists
- Channel sections (tabs)
- Channel activities
- Comment threads on videos
- Subscription lists
- Captions for videos

### 🔍 **Search Capabilities**

- Search for videos, channels, and playlists
- Test different search parameters and filters

### 📈 **Analytics & Metadata**

- Video statistics (views, likes, comments)
- Video categories and content details
- Supported languages and regions
- Guide categories

### 🎯 **Available Actions Summary**

#### ✅ **Read-Only Actions (No Authentication Required)**

- Search for channels, videos, playlists
- Get channel information (snippet, statistics, contentDetails)
- Get video information (snippet, statistics, contentDetails)
- Get playlist information
- Get channel sections
- Get comment threads
- Get channel activities
- Get video categories
- Get i18n languages and regions
- Get guide categories
- Get captions list
- Get subscription lists

#### 🔒 **Write Actions (Authentication Required)**

- Update channel information
- Update video information
- Create/update/delete playlists
- Upload videos
- Manage comments
- Manage subscriptions
- Manage channel sections
- Manage captions
- Manage thumbnails
- Manage channel branding

#### 📈 **Analytics Actions (Special Permissions)**

- Get detailed analytics data
- Get revenue data
- Get demographic data
- Get geographic data
- Get device data

## Expected Output

The test will provide detailed information about:

- What data is available for the inmoinversor channel
- Which API endpoints are accessible with your current API key
- Sample data structures for videos, playlists, and channel information
- Recommendations for implementing YouTube integration in your application

## Next Steps

Based on the test results, you can:

1. Implement read-only features to display channel content on your website
2. Set up OAuth2 authentication for write operations if needed
3. Consider YouTube Analytics API for detailed metrics
4. Implement caching for frequently accessed data
5. Build components to display YouTube content in your React application

## Troubleshooting

If you encounter errors:

1. Verify your API key is correct in `.env.local`
2. Check that the YouTube Data API v3 is enabled in your Google Cloud Console
3. Ensure your API key has the necessary permissions
4. Check the console output for specific error messages and API response details
