"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

interface CookiePreferences {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function Analytics() {
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);

  useEffect(() => {
    // Check cookie consent from localStorage
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      try {
        const preferences: CookiePreferences = JSON.parse(consent);
        setShouldLoadAnalytics(preferences.analytics);
      } catch (error) {
        console.error("Error parsing cookie consent:", error);
      }
    }
  }, []);

  // Listen for cookie consent changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cookie-consent" && e.newValue) {
        try {
          const preferences: CookiePreferences = JSON.parse(e.newValue);
          setShouldLoadAnalytics(preferences.analytics);
        } catch (error) {
          console.error("Error parsing cookie consent:", error);
        }
      }
    };

    // Listen for storage events (from other tabs)
    window.addEventListener("storage", handleStorageChange);

    // Listen for custom events (from same tab)
    const handleCookieConsentChange = (e: CustomEvent) => {
      const preferences: CookiePreferences = e.detail;
      setShouldLoadAnalytics(preferences.analytics);
    };

    window.addEventListener(
      "cookieConsentChange",
      handleCookieConsentChange as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "cookieConsentChange",
        handleCookieConsentChange as EventListener
      );
    };
  }, []);

  if (!shouldLoadAnalytics) {
    return null;
  }

  return <GoogleAnalytics gaId="G-8B0M5E5N52" />;
}
