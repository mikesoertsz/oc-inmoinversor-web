"use client";

import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Check, Sparkles } from "lucide-react";

const offerContent = {
  preheading: "Paquetes de Patrocinio",
  heading: "Elige tu Plan",
  subheading: "Soluciones flexibles para promocionar tu marca",
  packages: [
    {
      name: "Anuncio en Video",
      price: "599€",
      description: "Integración natural de tu marca en nuestro contenido",
      features: [
        "60 segundos de mención integrada",
        "Guión personalizado para tu marca",
        "Logo y enlace en descripción",
        "Promoción en redes sociales",
        "Informe de resultados",
      ],
      highlight: false,
      id: "anuncio-video",
    },
    {
      name: "Episodio Personalizado",
      price: "2.499€",
      description: "Un episodio completo dedicado a tu marca o servicio",
      features: [
        "Episodio completo (15-20 min)",
        "Guión y narrativa personalizada",
        "Filmación profesional",
        "Post-producción premium",
        "Campaña en redes sociales",
        "Derechos de uso del contenido",
        "Informe detallado de resultados",
      ],
      highlight: true,
      id: "episodio-personalizado",
    },
  ],
  note: "* Los precios incluyen producción y promoción. IVA no incluido.",
};

export default function SponsorOffer() {
  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-[10dvh]">
      <InnerWrap className="items-center justify-center max-w-6xl text-white">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-medium mb-4 block">
            {offerContent.preheading}
          </span>

          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            {offerContent.heading}
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {offerContent.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offerContent.packages.map((pkg, index) => (
            <div
              key={index}
              className={`
                flex flex-col bg-slate-900/50 p-8 rounded-xl border relative z-10 pt-12
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

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  {pkg.price}
                </div>
                <p className="text-slate-400">{pkg.description}</p>
              </div>

              <ul className="gap-2 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`#contact?plan=${pkg.name}`}
                className={`
                  block text-center py-3 px-8 rounded-md mt-8 transition
                  ${
                    pkg.highlight
                      ? "bg-brand-highlight text-black hover:bg-brand-highlight/80"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                    // Update URL with plan parameter
                    const url = new URL(window.location.href);
                    url.searchParams.set("plan", pkg.name);
                    window.history.pushState({}, "", url);
                  }
                }}
              >
                Seleccionar Plan
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-8 bg-black z-20">
          {offerContent.note}
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
