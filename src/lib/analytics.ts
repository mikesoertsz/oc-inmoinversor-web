// Analytics utility functions for Google Analytics tracking
// Only works when analytics cookies are accepted

// Enhanced TypeScript types for GA4
interface GA4EventParameters {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameter?: string | number | boolean;
  [key: string]: string | number | boolean | undefined;
}

interface ConsentParameters {
  analytics_storage?: "granted" | "denied";
  ad_storage?: "granted" | "denied";
  ad_user_data?: "granted" | "denied";
  ad_personalization?: "granted" | "denied";
  functionality_storage?: "granted" | "denied";
  personalization_storage?: "granted" | "denied";
  security_storage?: "granted" | "denied";
  wait_for_update?: number;
}

declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "consent",
      targetId: string,
      config?: GA4EventParameters | ConsentParameters
    ) => void;
  }
}

// Consent Mode v2 functions
export const initializeConsentMode = (defaultConsent: ConsentParameters) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "default", defaultConsent);
  }
};

export const updateConsentMode = (consent: ConsentParameters) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", consent);
  }
};

// Enhanced event tracking with better type safety
export const trackEvent = (action: string, parameters?: GA4EventParameters) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, parameters);
  }
};

// Legacy support for old event format
export const trackEventLegacy = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  trackEvent(action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-8B0M5E5N52", {
      page_path: url,
    });
  }
};

// Enhanced tracking events for real estate investment site
export const trackLeadGeneration = (source: string, value?: number) => {
  trackEvent("lead_generation", {
    event_category: "engagement",
    event_label: source,
    value: value,
  });
};

export const trackArticleRead = (
  articleTitle: string,
  readingTime?: number,
  articleCategory?: string
) => {
  trackEvent("article_read", {
    event_category: "content",
    event_label: articleTitle,
    value: readingTime,
    custom_parameter: articleCategory,
  });
};

export const trackContactForm = (formType: string, formLocation?: string) => {
  trackEvent("form_submit", {
    event_category: "engagement",
    event_label: formType,
    custom_parameter: formLocation,
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("file_download", {
    event_category: "engagement",
    event_label: `${fileName}_${fileType}`,
  });
};

export const trackGoogleAdsConversion = (conversionId: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionId,
    });
  }
};

// New enhanced tracking functions
export const trackVideoPlay = (videoTitle: string, videoDuration?: number) => {
  trackEvent("video_play", {
    event_category: "engagement",
    event_label: videoTitle,
    value: videoDuration,
  });
};

export const trackCourseEnrollment = (
  courseName: string,
  coursePrice?: number
) => {
  trackEvent("course_enrollment", {
    event_category: "conversion",
    event_label: courseName,
    value: coursePrice,
  });
};

export const trackPropertyAnalysis = (
  propertyType: string,
  location?: string
) => {
  trackEvent("property_analysis", {
    event_category: "engagement",
    event_label: propertyType,
    custom_parameter: location,
  });
};
