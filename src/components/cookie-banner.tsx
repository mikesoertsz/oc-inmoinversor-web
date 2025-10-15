"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface CookiePreferences {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    preferences: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
    // Load analytics and marketing scripts here
    loadCookies(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    setShowBanner(false);
    // Only load necessary cookies
    loadCookies(onlyNecessary);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    // Load cookies based on preferences
    loadCookies(preferences);
  };

  const loadCookies = (prefs: CookiePreferences) => {
    // Load Google Analytics if analytics cookies are accepted
    if (prefs.analytics) {
      // Load Google Analytics script
      if (typeof window !== "undefined" && !window.gtag) {
        const script = document.createElement("script");
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-K8F9KGJXC8";
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        gtag("js", new Date());
        gtag("config", "G-K8F9KGJXC8");
      }
    }

    // Load Google Tag Manager if analytics cookies are accepted
    if (prefs.analytics) {
      // Load GTM script
      if (
        typeof window !== "undefined" &&
        !document.getElementById("gtm-script")
      ) {
        const script = document.createElement("script");
        script.id = "gtm-script";
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KCGSVCZP');
        `;
        document.head.appendChild(script);
      }
    }

    // Load Facebook Pixel if marketing cookies are accepted
    if (prefs.marketing) {
      // Load Facebook Pixel script
      if (typeof window !== "undefined" && !window.fbq) {
        const script = document.createElement("script");
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
      }
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Cookie Banner - Fixed Position */}
      {showBanner && !showSettings && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" />

          {/* Banner Content */}
          <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-4">
            <h2 className="text-base font-semibold mb-2">Cookies</h2>
            <p className="text-xs text-gray-600 mb-3">
              En nuestro sitio web utilizamos cookies propias y de terceros para
              finalidades analíticas mediante el análisis del tráfico web, para
              personalizar el contenido mediante sus preferencias y con
              finalidades publicitarias. Para más información puedes consultar
              nuestra Política de Cookies{" "}
              <Link
                href="/legal/cookies-policy"
                className="text-blue-600 underline"
              >
                AQUÍ
              </Link>
              . Puedes aceptar y rechazar todas las cookies en bloque o también
              puedes aceptarlas de forma concreta, modificar su selección o
              rechazar su uso pulsando "Configuración de Cookies".
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
                size="sm"
                className="text-xs h-8"
              >
                Configuración de Cookies
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  size="sm"
                  className="text-xs h-8 flex-1"
                >
                  Rechazar todas
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="text-xs h-8 flex-1"
                >
                  Aceptar todas
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Configuración de Cookies</DialogTitle>
            <DialogDescription>
              Puedes activar o desactivar las cookies según tus preferencias:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="necessary" className="text-sm font-medium">
                  Cookies Necesarias
                </Label>
                <p className="text-xs text-gray-500">
                  Estas cookies son esenciales para el funcionamiento del sitio
                  web y no se pueden desactivar.
                </p>
              </div>
              <Switch
                id="necessary"
                checked={preferences.necessary}
                disabled={true}
              />
            </div>

            {/* Preferences Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="preferences" className="text-sm font-medium">
                  Cookies de Preferencias o Personalización
                </Label>
                <p className="text-xs text-gray-500">
                  Estas cookies permiten recordar tus preferencias y
                  personalizar tu experiencia.
                </p>
              </div>
              <Switch
                id="preferences"
                checked={preferences.preferences}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, preferences: checked }))
                }
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="analytics" className="text-sm font-medium">
                  Cookies Analíticas
                </Label>
                <p className="text-xs text-gray-500">
                  Estas cookies nos ayudan a entender cómo los visitantes
                  interactúan con nuestro sitio web.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="marketing" className="text-sm font-medium">
                  Cookies Publicitarias
                </Label>
                <p className="text-xs text-gray-500">
                  Estas cookies se utilizan para mostrar anuncios relevantes y
                  medir la efectividad de las campañas.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSavePreferences}>
              Guardar Preferencias
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
  }
}
