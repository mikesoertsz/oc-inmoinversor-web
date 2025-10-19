# YouTube API Tests

This folder contains comprehensive tests for the YouTube API integration with the inmoinversor channel.

## 📁 Test Files

### 1. `test-youtube-endpoints.js`

Tests all YouTube API endpoints to ensure they're working correctly:

- Channel stats endpoint (`/api/youtube/channel-stats`)
- Latest video endpoint (`/api/youtube/latest-video`)
- Recent videos endpoint (`/api/youtube/recent-videos`)

**What it tests:**

- HTTP response codes
- Response data structure validation
- Required field presence
- Data type validation
- Error handling

### 2. `test-youtube-service.js`

Tests the YouTube service class directly without going through API endpoints:

- Service initialization
- Channel discovery
- Latest video retrieval
- Recent videos retrieval
- API key configuration

**What it tests:**

- Direct service functionality
- Data retrieval from YouTube API
- Service configuration validation

### 3. `test-youtube-integration.js`

Comprehensive integration test that verifies the entire workflow:

- Environment setup validation
- Server availability
- Complete workflow testing
- Data quality and consistency
- Performance metrics

**What it tests:**

- End-to-end functionality
- Data consistency across endpoints
- Response times and performance
- Integration between all components

## 🚀 Running the Tests

### Prerequisites

1. **Development Server Running**: Make sure your Next.js development server is running on `http://localhost:3000`

2. **Environment Configuration**: Ensure your `.env.local` file contains:

   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_actual_api_key_here
   ```

3. **YouTube API Key**: You need a valid YouTube Data API v3 key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project or select existing one
   - Enable YouTube Data API v3
   - Create credentials (API Key)

### Running Individual Tests

```bash
# Test API endpoints
node tests/test-youtube-endpoints.js

# Test YouTube service directly
node tests/test-youtube-service.js

# Run comprehensive integration test
node tests/test-youtube-integration.js
```

### Running All Tests

```bash
# Run all YouTube tests in sequence
npm run test:youtube:all

# Or run them individually
npm run test:youtube:endpoints
npm run test:youtube:service
npm run test:youtube:integration
```

## 📊 Test Output

Each test provides detailed output including:

- ✅ **Pass/Fail Status** for each test case
- 📊 **Data Validation** results with actual values
- ⚡ **Performance Metrics** (response times)
- 🔍 **Error Details** with specific failure reasons
- 📈 **Success Rate** percentage
- 🎯 **Next Steps** recommendations

### Example Output

```
🚀 Starting YouTube API Endpoints Test Suite
============================================================
✅ YouTube API key configured

🧪 Testing: Channel Stats Endpoint
──────────────────────────────────────────────────
   📊 Channel Stats Retrieved:
      Subscribers: 1.2K
      Videos: 45
      Views: 12.5K
✅ PASSED: Channel Stats Endpoint

📊 TEST RESULTS SUMMARY
============================================================
✅ Passed: 5
❌ Failed: 0
📈 Success Rate: 100.0%
🎉 All tests passed! YouTube API endpoints are working correctly.
```

## 🐛 Troubleshooting

### Common Issues

1. **"NEXT_PUBLIC_YOUTUBE_API_KEY not found"**

   - Check your `.env.local` file exists
   - Ensure the API key variable name is correct
   - Restart your development server after adding the key

2. **"HTTP 404" or "Server not available"**

   - Make sure your Next.js development server is running
   - Check the server is accessible at `http://localhost:3000`
   - Verify the API routes are properly created

3. **"Could not find channel"**

   - Verify the YouTube API key has proper permissions
   - Check if the "inmoinversor" channel exists and is public
   - Ensure YouTube Data API v3 is enabled in Google Cloud Console

4. **"API responses too slow"**
   - Check your internet connection
   - Verify YouTube API quota limits aren't exceeded
   - Consider implementing caching for production use

### Debug Steps

1. **Check Environment**: Run `node tests/test-youtube-service.js` to verify API key configuration
2. **Test Server**: Run `node tests/test-youtube-endpoints.js` to check if endpoints are accessible
3. **Full Integration**: Run `node tests/test-youtube-integration.js` for comprehensive validation

## 📋 Test Coverage

The tests cover:

- ✅ API endpoint availability and responses
- ✅ Data structure validation
- ✅ Error handling scenarios
- ✅ Performance benchmarks
- ✅ Data consistency checks
- ✅ Service initialization
- ✅ Channel discovery
- ✅ Video retrieval
- ✅ Environment configuration

## 🔧 Customization

You can modify the tests to:

- **Change test limits**: Modify the `testLimits` arrays in the test files
- **Add new endpoints**: Extend the test suites for additional API endpoints
- **Adjust performance thresholds**: Modify timeout values for your environment
- **Add custom validations**: Include domain-specific data validation rules

## 📝 Notes

- Tests are designed to be run in a development environment
- All tests use the `inmoinversor` channel name - modify if needed
- Tests include proper error handling and graceful degradation
- Performance thresholds are set for typical development setups
- Tests validate both success and failure scenarios
