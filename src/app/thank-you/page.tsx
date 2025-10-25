import ThankYouContent from "./thank-you-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gracias",
  description:
    "Tu consulta ha sido recibida correctamente. Te contactaremos pronto.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
