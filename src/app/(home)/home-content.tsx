"use client";

import Hero from "../(shared)/attention-hero";
import LastVideo from "../(shared)/attention-lastvideo";
import CtaCommunity from "../(shared)/cta-community";
import FAQ from "../(shared)/faq";

export default function HomeContent() {
  return (
    <main className="flex flex-col h-full w-full scroll-smooth">
      <Hero />
      <LastVideo />
      <FAQ />
      <CtaCommunity />
    </main>
  );
}
