import { InnerWrap, Wrapper } from "@/lib/atoms";
import { TrendingUp } from "lucide-react";

const heroContent = {
  preheading: "Patrocinio de Canal",
  heading: "Alcanza a los Futuros Inversores Inmobiliarios de España",
  subheading:
    "Crece con el canal de inversión inmobiliaria más prometedor de España",
  description:
    "Un canal de YouTube dedicado a estrategias de inversión inmobiliaria, renovaciones y educación en España. Asegura tu visibilidad temprana mientras escalamos.",
  buttonText: "Asegura tu Espacio",
  stats: [
    {
      value: "90%",
      label: "Audiencia Española",
    },
    {
      value: "72%",
      label: "Retención de Visualización",
    },
    {
      value: "35%",
      label: "Click-through Rate",
    },
  ],
};

export default function SponsorHero() {
  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-[10dvh]">
      <InnerWrap className="items-center justify-center max-w-4xl text-center text-white">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-brand-highlight/10 rounded-full mb-6">
          <TrendingUp className="h-8 w-8 text-brand-highlight" />
        </div>

        <span className="text-brand-primary font-medium mb-4 block">
          {heroContent.preheading}
        </span>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          {heroContent.heading}
        </h1>

        <h2 className="text-xl md:text-2xl text-slate-400 mb-6">
          {heroContent.subheading}
        </h2>

        <p className="text-lg max-w-prose mb-12 text-slate-300">
          {heroContent.description}
        </p>

        <a
          href="#contact"
          className="px-12 py-4 font-medium text-black transition duration-300 ease-in-out rounded-md bg-brand-highlight hover:bg-gray-50 inline-block mb-12"
        >
          {heroContent.buttonText}
        </a>

        <div className="grid grid-cols-3 gap-8 border-t border-slate-800 pt-12">
          {heroContent.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-brand-highlight mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
