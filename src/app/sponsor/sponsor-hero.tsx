import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Handshake } from "lucide-react";

const heroContent = {
  preheading: "Patrocinio de Canal",
  heading: "Alcanza a los Futuros Inversores Inmobiliarios de España",
  subheading:
    "Crece con el canal de inversión inmobiliaria más prometedor de España",
  description:
    "Un canal de YouTube dedicado a estrategias de inversión inmobiliaria, renovaciones y educación en España. Asegura tu visibilidad temprana mientras escalamos.",
  buttonText: "Asegura tu Espacio",
};

export default function SponsorHero() {
  return (
    <Wrapper className="bg-gradient-to-t from-black to-brand-bg1">
      <InnerWrap className="items-center justify-center max-w-4xl text-center text-white">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-brand-highlight/90 rounded-full mb-6">
          <Handshake className="h-8 w-8 text-black" />
        </div>

        <span className="font-medium mb-4 block">{heroContent.preheading}</span>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight subpixel-antialiased">
          {heroContent.heading}
        </h1>

        <div className="text-center max-w-2xl">
          <h2 className="text-xl md:text-2xl mb-6 text-white/80 mt-8">
            {heroContent.subheading}
          </h2>

          <p className="text-lg max-w-prose mb-12 text-white/80">
            {heroContent.description}
          </p>
        </div>

        <a
          href="#contact"
          className="px-12 py-4 font-medium text-black transition duration-300 ease-in-out rounded-md bg-brand-highlight hover:bg-brand-highlight/90 inline-block mb-12"
        >
          {heroContent.buttonText}
        </a>
      </InnerWrap>
    </Wrapper>
  );
}
