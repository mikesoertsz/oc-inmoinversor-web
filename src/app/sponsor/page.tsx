import SponsorCTA from "./sponsor-cta";
import SponsorFAQ from "./sponsor-faq";
import SponsorFeatures from "./sponsor-features";
import SponsorHero from "./sponsor-hero";
import SponsorOffer from "./sponsor-offer";

export default function SponsorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SponsorHero />
      <SponsorFeatures />
      {/* <SponsorVideoDemo /> */}
      {/* <SponsorTestimonials /> */}
      <SponsorOffer />
      <SponsorFAQ />
      <SponsorCTA />
    </main>
  );
}
