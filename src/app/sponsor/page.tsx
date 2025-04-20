import { Suspense } from "react";
import SponsorBackground from "./sponsor-background";
import SponsorContent from "./sponsor-content";
import SponsorCTA from "./sponsor-cta";
import SponsorFAQ from "./sponsor-faq";
import SponsorFeatures from "./sponsor-features";
import SponsorHero from "./sponsor-hero";
import SponsorMission from "./sponsor-mission";
import SponsorOffer from "./sponsor-offer";
import SponsorStatsBase from "./sponsor-stats-base";
import SponsorInfo from "./sponsor-audience";
export default function SponsorPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col w-full h-full antialiased">
      <Suspense fallback={<div>Loading...</div>}>
        <SponsorHero />
        <SponsorStatsBase />
        <SponsorBackground />
        <SponsorMission />
        <SponsorInfo />
        <SponsorFeatures />
        <SponsorContent />
        {/* <SponsorVideoDemo /> */}
        <SponsorOffer />
        <SponsorFAQ />
        <SponsorCTA />
      </Suspense>
    </main>
  );
}
