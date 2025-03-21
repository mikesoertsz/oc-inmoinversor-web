import SponsorHero from "./sponsor-hero";
import SponsorFeatures from "./sponsor-features";
import SponsorVideoDemo from "./sponsor-video-demo";
import SponsorTestimonials from "./sponsor-testimonials";
import SponsorOffer from "./sponsor-offer";
import SponsorFAQ from "./sponsor-faq";
import SponsorCTA from "./sponsor-cta";

export default function SponsorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SponsorHero />
      <SponsorFeatures />
      <SponsorVideoDemo />
      <SponsorTestimonials />
      <SponsorOffer />
      <SponsorFAQ />
      <SponsorCTA />
    </main>
  );
}
