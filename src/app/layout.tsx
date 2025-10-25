import { Toaster } from "@/components/ui/sonner";
import { body, title } from "@/lib/fonts";
import type { Metadata } from "next";
import Footer from "./(shared)/footer";
import NavMain from "./(shared)/nav-main";
import CookieBanner from "@/components/cookie-banner";
import Analytics from "@/components/google-analytics";
import CoursePopupDialog from "@/components/course-popup-dialog";
import { AuthProvider } from "@/lib/auth/auth-context";
import "./globals.css";
import "./prose.css";

export const metadata: Metadata = {
  title: {
    template: "%s | InmoInversor",
    default: "InmoInversor | Aprende a invertir en bienes raíces en España",
  },
  description:
    "Canal de aprendizaje sobre inversión inmobiliaria en España. Aprende estrategias de inversión, análisis de propiedades y gestión de alquileres.",
  keywords: [
    "inversión inmobiliaria",
    "bienes raíces",
    "alquileres",
    "inmobiliaria España",
    "inversión propiedades",
  ],
  authors: [{ name: "Guillermo Ortiz" }],
  creator: "InmoInversor",
  publisher: "InmoInversor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://inmoinversor.com",
    siteName: "InmoInversor",
    title: "InmoInversor | Aprende a invertir en bienes raíces en España",
    description:
      "Canal de aprendizaje sobre inversión inmobiliaria en España. Aprende estrategias de inversión, análisis de propiedades y gestión de alquileres.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "InmoInversor - Inversión Inmobiliaria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InmoInversor | Aprende a invertir en bienes raíces en España",
    description:
      "Canal de aprendizaje sobre inversión inmobiliaria en España. Aprende estrategias de inversión, análisis de propiedades y gestión de alquileres.",
    images: ["/img/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <meta
        name="facebook-domain-verification"
        content="fnt8j85finy5w14g4yj6ot2gw0lg8h"
      />
      {/* Analytics scripts will be loaded conditionally by Analytics component based on cookie consent */}
      <body
        className={`${title.variable} ${body.variable} subpixel-antialiased font-title`}
      >
        <AuthProvider>
          <NavMain />
          {children}
          <Footer />
          <CookieBanner />
          <Analytics />
          <CoursePopupDialog />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
