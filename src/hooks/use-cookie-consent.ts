"use client";

import { useState, useEffect } from "react";

interface CookiePreferences {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
  });
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      setHasConsent(true);
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem("cookie-consent", JSON.stringify(newPreferences));
    setHasConsent(true);
  };

  const clearConsent = () => {
    localStorage.removeItem("cookie-consent");
    setPreferences({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
    setHasConsent(false);
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    clearConsent,
  };
}
