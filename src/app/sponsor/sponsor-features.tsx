import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Building2, Target, Users, Wallet } from "lucide-react";

const featuresContent = {
  preheading: "¿Por qué Inmo Inversor?",
  heading: "Tu Marca, Nuestro Alcance",
  subheading:
    "Construimos una comunidad altamente comprometida de inversores inmobiliarios en España",
  features: [
    {
      icon: Users,
      title: "Audiencia Cualificada",
      description:
        "Inversores activos y potenciales entre 28-45 años, emprendedores y renovadores DIY.",
    },
    {
      icon: Target,
      title: "Engagement Superior",
      description:
        "72% de retención de visualización, muy por encima de la media del sector.",
    },
    {
      icon: Building2,
      title: "Nicho Específico",
      description:
        "Contenido especializado en inversión inmobiliaria y renovaciones en España.",
    },
    {
      icon: Wallet,
      title: "Alto Poder Adquisitivo",
      description:
        "Audiencia con capacidad demostrada de inversión y compra de productos premium.",
    },
  ],
};

export default function SponsorFeatures() {
  return (
    <Wrapper className="bg-black py-[3dvh]">
      <InnerWrap className="items-center justify-center max-w-6xl text-center text-white">
        <span className="text-brand-highlight font-medium mb-4 block">
          {featuresContent.preheading}
        </span>

        <h2 className="text-4xl font-bold mb-4 tracking-tight">
          {featuresContent.heading}
        </h2>

        <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto">
          {featuresContent.subheading}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresContent.features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-brand-highlight transition-colors duration-300"
            >
              <div className="inline-flex justify-center items-center w-12 h-12 bg-brand-highlight/10 rounded-full mb-4">
                <feature.icon className="h-6 w-6 text-brand-highlight" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
