import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const pricingContent = {
  preheading: "Planes y Precios",
  heading: "Invierte en Tu Futuro",
  subheading:
    "Elige el plan que mejor se adapte a tus objetivos de inversión inmobiliaria.",
  plans: [
    {
      name: "Plan Básico",
      price: "497€",
      description:
        "Perfecto para comenzar en el mundo de la inversión inmobiliaria.",
      features: [
        "Acceso completo al curso",
        "Recursos descargables",
        "Acceso a la comunidad",
        "Actualizaciones de por vida",
      ],
      buttonText: "Empezar Ahora",
      recommended: false,
    },
    {
      name: "Plan Premium",
      price: "997€",
      description: "La opción más completa para inversores serios.",
      features: [
        "Todo lo incluido en el Plan Básico",
        "Mentoría personalizada",
        "Análisis de casos reales",
        "Sesiones grupales en vivo",
        "Herramientas exclusivas",
        "Soporte prioritario",
      ],
      buttonText: "Elegir Premium",
      recommended: true,
    },
  ],
};

export default function AttentionPricing() {
  return (
    <Wrapper className="bg-gradient-to-b from-brand-bg1 to-black">
      <InnerWrap className="py-[10dvh] items-center justify-center text-center text-white">
        <span className="text-brand-primary font-medium mb-4 block">
          {pricingContent.preheading}
        </span>
        <h2 className="text-4xl font-bold mb-4">{pricingContent.heading}</h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          {pricingContent.subheading}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingContent.plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-slate-900/50 p-8 rounded-xl border ${
                plan.recommended ? "border-brand-highlight" : "border-slate-800"
              }`}
            >
              {plan.recommended && (
                <span className="bg-brand-highlight text-black text-sm font-medium px-3 py-1 rounded-full mb-4 inline-block">
                  Recomendado
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-4">{plan.price}</div>
              <p className="text-slate-400 mb-8">{plan.description}</p>
              <ul className="space-y-4 mb-8 text-left">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className={`w-full ${
                  plan.recommended
                    ? "bg-brand-highlight hover:bg-brand-highlight/90"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {plan.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
