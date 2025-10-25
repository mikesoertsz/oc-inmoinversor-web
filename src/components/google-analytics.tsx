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
    // Initialize Google Consent Mode v2 with default values
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
        wait_for_update: 500,
      });
    }

    // Check cookie consent from localStorage
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      try {
        const preferences: CookiePreferences = JSON.parse(consent);
        setShouldLoadAnalytics(preferences.analytics);
        updateConsentMode(preferences);
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
          updateConsentMode(preferences);
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
      updateConsentMode(preferences);
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

  const updateConsentMode = (preferences: CookiePreferences) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: preferences.analytics ? "granted" : "denied",
        ad_storage: preferences.marketing ? "granted" : "denied",
        ad_user_data: preferences.marketing ? "granted" : "denied",
        ad_personalization: preferences.marketing ? "granted" : "denied",
        functionality_storage: preferences.preferences ? "granted" : "denied",
        personalization_storage: preferences.preferences ? "granted" : "denied",
      });
    }
  };

  if (!shouldLoadAnalytics) {
    return null;
  }

  return <GoogleAnalytics gaId="G-8B0M5E5N52" />;
}
