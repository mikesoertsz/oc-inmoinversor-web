import { Toaster } from "@/components/ui/sonner";
import { body, title } from "@/lib/fonts";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./(shared)/footer";
import NavMain from "./(shared)/nav-main";
import "./globals.css";
import "./prose.css";
import TermlyCMP from "@/components/TermlyCMP";

export const metadata: Metadata = {
  title: "Inmo Inversor | Aprende a invertir en bienes raices en España",
  description: "Canal de aprendizaje sobre inversión inmobiliaria en España",
};

const WEBSITE_UUID = "3b910d3f-8697-4372-9d39-23d87dbc1072";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <Suspense>
        <GoogleAnalytics gaId="G-K8F9KGJXC8" />
        <GoogleTagManager gtmId="GTM-KCGSVCZP" />
      </Suspense>
      <body
        className={`${title.variable} ${body.variable} subpixel-antialiased font-title`}
      >
        <TermlyCMP
          websiteUUID={WEBSITE_UUID}
          autoBlock={false}
          masterConsentsOrigin={true}
        />
        <NavMain />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
