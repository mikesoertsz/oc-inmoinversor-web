# Google Analytics Implementation

This document describes the Google Analytics implementation using Next.js 16+ patterns with Google Consent Mode v2 and modern cookie consent management.

## Overview

The analytics implementation uses:

- **Google Analytics ID**: `G-8B0M5E5N52`
- **Next.js Third Parties**: `@next/third-parties` package for optimized loading
- **Google Consent Mode v2**: Advanced privacy controls and cookieless pings
- **Cookie Consent**: Respects user privacy preferences with granular controls
- **Real-time Updates**: Analytics loads/unloads based on consent changes

## Components

### 1. Analytics Component (`/src/components/google-analytics.tsx`)

- Uses `@next/third-parties/google` for optimal performance
- Implements Google Consent Mode v2 with default denied states
- Conditionally loads based on cookie consent
- Listens for consent changes in real-time
- Handles both localStorage and custom events
- Updates consent mode dynamically when user preferences change

### 2. Cookie Banner (`/src/components/cookie-banner.tsx`)

- Integrates with Google Consent Mode v2
- Updates consent mode when user preferences change
- Dispatches custom events when preferences change
- Maintains backward compatibility with existing manual script loading

### 3. Analytics Utilities (`/src/lib/analytics.ts`)

- Enhanced TypeScript types for GA4 and Consent Mode v2
- Helper functions for tracking events with better type safety
- Consent mode management functions
- Common tracking patterns for real estate investment site
- New tracking functions for video, course enrollment, and property analysis

## Usage

### Basic Tracking

```typescript
import { trackEvent, trackPageView } from "@/lib/analytics";

// Track custom events
trackEvent("button_click", "engagement", "header_cta");

// Track page views
trackPageView("/articles/investment-guide");
```

### Common Tracking Events

```typescript
import {
  trackLeadGeneration,
  trackArticleRead,
  trackContactForm,
} from "@/lib/analytics";

// Track lead generation
trackLeadGeneration("newsletter_signup");

// Track article engagement
trackArticleRead("Real Estate Investment Guide", 5);

// Track form submissions
trackContactForm("contact_form");
```

## Cookie Consent Integration

The implementation respects user privacy with Google Consent Mode v2:

1. **Initial Load**: Analytics only loads if user has previously accepted analytics cookies
2. **Consent Mode v2**: Default denied states with cookieless pings for measurement
3. **Consent Changes**: Real-time loading/unloading when users change preferences
4. **Cross-tab Sync**: Changes in one tab affect analytics in all tabs
5. **GDPR Compliant**: Only loads tracking scripts with explicit consent
6. **Enhanced Privacy**: Granular consent controls for different data types

## Performance Benefits

Using `@next/third-parties` provides:

- **Optimized Loading**: Scripts load efficiently without blocking page render
- **Automatic Optimization**: Next.js handles script optimization
- **Better Core Web Vitals**: Improved performance metrics
- **Type Safety**: Full TypeScript support

## Testing

To test the implementation:

1. **Accept Cookies**: Accept analytics cookies and verify GA loads
2. **Reject Cookies**: Reject analytics cookies and verify GA doesn't load
3. **Change Preferences**: Modify consent settings and verify real-time updates
4. **Cross-tab**: Test consent changes across multiple browser tabs

## Migration Notes

- Updated from old GA ID `G-K8F9KGJXC8` to new ID `G-8B0M5E5N52`
- Removed old manual gtag implementation in favor of `@next/third-parties`
- Removed Google Tag Manager (GTM-KCGSVCZP) and Facebook Pixel implementations
- Cleaned up unused dependencies (`@pepsterd/gtag-helper`, `@types/gtag.js`)
- Removed unused `use-cookie-consent.ts` hook (functionality moved to components)
- Updated all conversion tracking to use centralized analytics utility
- Added Google Consent Mode v2 for enhanced privacy compliance
- Added modern Next.js 16+ patterns for better performance
- Enhanced TypeScript types for better developer experience
- Maintained all existing functionality while improving implementation
