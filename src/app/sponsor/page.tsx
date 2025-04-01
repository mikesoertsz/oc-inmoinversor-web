import { Suspense } from "react";
import SponsorCTA from "./sponsor-cta";
import SponsorFAQ from "./sponsor-faq";
import SponsorFeatures from "./sponsor-features";
import SponsorHero from "./sponsor-hero";
import SponsorOffer from "./sponsor-offer";
import AnalyticsDashboard from "./analytics/AnalyticsDashboard";

export default function SponsorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="min-h-screen bg-black text-white">
        <SponsorHero />
        <SponsorFeatures />
        <AnalyticsDashboard />
        <SponsorOffer />
        <SponsorFAQ />
        <SponsorCTA />
      </main>
    </Suspense>
  );
}
