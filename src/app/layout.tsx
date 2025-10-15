import { Toaster } from "@/components/ui/sonner";
import { body, title } from "@/lib/fonts";
import type { Metadata } from "next";
import Footer from "./(shared)/footer";
import NavMain from "./(shared)/nav-main";
import CookieBanner from "@/components/cookie-banner";
import "./globals.css";
import "./prose.css";

export const metadata: Metadata = {
  title: "InmoInversor | Aprende a invertir en bienes raices en España",
  description: "Canal de aprendizaje sobre inversión inmobiliaria en España",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <meta
        name="facebook-domain-verification"
        content="fnt8j85finy5w14g4yj6ot2gw0lg8h"
      />
      {/* Analytics scripts will be loaded conditionally by CookieBanner component */}
      <body
        className={`${title.variable} ${body.variable} subpixel-antialiased font-title`}
      >
        <NavMain />
        {children}
        <Footer />
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}
