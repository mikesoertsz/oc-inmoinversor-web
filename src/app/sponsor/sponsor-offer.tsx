"use client";

import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Check, Sparkles } from "lucide-react";
import usePackageStore, { PackageStore } from "@/lib/usePackageStore";

const offerContent = {
  preheading: "EPISODIO ÚNICO",
  heading: "Elige tu Plan",
  subheading: "Soluciones flexibles para promocionar tu marca",
  packages: [
    {
      name: "Anuncio Único",
      type: "Single-Ad",
      frequency: "Single Episode",
      duration: "15–30 seconds",
      price: Math.ceil(699),
      description: "Anuncio personalizado en tiempo de mayor visualización.",
      features: [
        "Locución y colocación de producto.",
        "Animación y gráficos de calidad.",
        "Códigos promocionales y enlaces.",
        "80% presupuesto en YouTube Ads.",
        "Marca en sitio y videos.",
      ],
      expectedViews: 50000,
      highlight: false,
      id: "anuncio-unico",
      vatInclusive: true,
    },
    {
      name: "Campaña de 4 Episodios",
      type: "4-Pack Campaign",
      frequency: "Monthly (4 episodes/month)",
      originalPriceEUR: Math.ceil(2796.0),
      price: Math.ceil(2796.0 * (1 - 0.15)), // Calculate discounted price
      discountPercentage: 15,
      description: "4 episodios/mes con mensajes consistentes.",
      features: [
        "Todo en Anuncio Único.",
        "Visibilidad a largo plazo.",
        "Exposición masiva en videos.",
        "Colaboración creativa prioritaria.",
      ],
      expectedViews: 250000,
      highlight: false,
      id: "campana-4-episodios",
      vatInclusive: true,
    },
    {
      name: "Campaña de 12 Episodios",
      type: "12-Pack Campaign",
      frequency: "Quarterly (12 episodes/quarter)",
      originalPriceEUR: Math.ceil(8388.0),
      price: Math.ceil(8388.0 * (1 - 0.25)), // Calculate discounted price
      discountPercentage: 25,
      description: "12 episodios/trimestre con mensajes consistentes.",
      features: [
        "Todo en Anuncio Único.",
        "Visibilidad a largo plazo.",
        "Exposición masiva en videos.",
        "Colaboración creativa prioritaria.",
      ],
      expectedViews: 750000,
      highlight: true,
      id: "campana-12-episodios",
      vatInclusive: true,
    },
  ],
  note: "Precios excluyen IVA.",
};

export default function SponsorOffer() {
  const setSelectedPackage = usePackageStore(
    (state: PackageStore) => state.setSelectedPackage
  );

  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-24">
      <InnerWrap className="items-center justify-center max-w-6xl text-white">
        <TitleBlock
          preheading={offerContent.preheading}
          heading={offerContent.heading}
          subheading={offerContent.subheading}
          theme="dark"
          orientation="center"
        />

        <ul className="grid md:grid-cols-3 gap-2 max-w-6xl mx-auto">
          {offerContent.packages.map((pkg, index) => (
            <li
              key={index}
              className={`
                flex flex-col bg-white p-8 rounded-xl border relative z-10 pt-12 text-black font-body
                ${
                  pkg.highlight
                    ? "border-brand-primary shadow-lg shadow-brand-primary/10"
                    : "border-slate-800"
                }
              `}
            >
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 bg-brand-primary/100 text-white text-sm font-medium py-1 px-4 rounded-full z-20">
                  <Sparkles className="h-4 w-4" />
                  Recomendado
                </div>
              )}

              <div className="text-left mb-6 flex flex-col items-start justify-start gap-3">
                <h3 className="text-sm uppercase font-semibold tracking-widest">
                  {pkg.name}
                </h3>
                <div className="text-5xl font-bold text-slate-800 tracking-tight">
                  €{pkg.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </div>
                <div className="h-6">
                  {pkg.discountPercentage && (
                    <div className="text-lg text-green-700">
                      <span className="line-through">
                        €{pkg.originalPriceEUR.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </span>{" "}
                      -{pkg.discountPercentage}%
                    </div>
                  )}
                </div>
                <p className="text-slate-900 text-md font-medium balanced">
                  {pkg.description}
                </p>
              </div>

              <ul className="gap-2 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-3 w-3 text-brand-primary flex-shrink-0 mt-1.5" />
                    <span className="text-slate-800 text-sm font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`
                  block text-center py-3 px-8 rounded-md mt-8 transition
                  ${
                    pkg.highlight
                      ? "bg-brand-highlight text-black hover:bg-brand-highlight/80"
                      : "bg-slate-50 text-black hover:bg-slate-100 border border-slate-300"
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                    setSelectedPackage(pkg.name);
                  }
                }}
              >
                Seleccionar Plan
              </a>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-slate-400 mt-8 drop-shadow-md z-20">
          {offerContent.note}
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
