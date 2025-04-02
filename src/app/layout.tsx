import { Toaster } from "@/components/ui/sonner";
import { body, title } from "@/lib/fonts";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./(shared)/footer";
import NavMain from "./(shared)/nav-main";
import "./globals.css";
import "./prose.css";

export const metadata: Metadata = {
  title: "Inmo Inversor | Aprende a invertir en bienes raices en España",
  description: "Canal de aprendizaje sobre inversión inmobiliaria en España",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16748317337"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16748317337');
        `}
      </Script>
      <Suspense>
        <GoogleAnalytics gaId="G-K8F9KGJXC8" />
        <GoogleTagManager gtmId="GTM-KCGSVCZP" />
      </Suspense>
      <body
        className={`${title.variable} ${body.variable} subpixel-antialiased font-title`}
      >
        <NavMain />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
