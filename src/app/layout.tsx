import { body, title } from "@/lib/fonts";
import type { Metadata } from "next";
import Footer from "./(shared)/footer";
import NavMain from "./(shared)/nav-main";
import "./globals.css";
import "./prose.css";
import { Toaster } from "@/components/ui/sonner";
import GoogleAnalytics from "@/lib/Analytics";

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
      <body
        className={`${title.variable} ${body.variable} subpixel-antialiased font-title`}
      >
        <GoogleAnalytics GA_MEASUREMENT_ID="G-8B0M5E5N52`" />
        <NavMain />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
