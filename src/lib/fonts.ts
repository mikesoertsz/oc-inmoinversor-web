import { Inter, Poppins } from "next/font/google";

export const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
export const title = Poppins({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
