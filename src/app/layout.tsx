import type { Metadata } from "next";
import "./globals.css";
import Footer from "./(shared)/footer";
import NavMain from "./(shared)/nav-main";
import { body, title } from "@/lib/fonts";

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
    <html lang="en">
      <body
        className={`${title.variable} ${body.variable} antialiased font-title scroll-smooth`}
      >
        <NavMain />
        {children}
        <Footer />
      </body>
    </html>
  );
}
