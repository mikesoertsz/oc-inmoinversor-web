// Analytics utility functions for Google Analytics tracking
// Only works when analytics cookies are accepted

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-8B0M5E5N52", {
      page_path: url,
    });
  }
};

// Common tracking events for real estate investment site
export const trackLeadGeneration = (source: string) => {
  trackEvent("lead_generation", "engagement", source);
};

export const trackArticleRead = (
  articleTitle: string,
  readingTime?: number
) => {
  trackEvent("article_read", "content", articleTitle, readingTime);
};

export const trackContactForm = (formType: string) => {
  trackEvent("form_submit", "engagement", formType);
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("file_download", "engagement", `${fileName}_${fileType}`);
};

export const trackGoogleAdsConversion = (conversionId: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: conversionId,
    });
  }
};
