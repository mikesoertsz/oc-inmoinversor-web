import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Building2, Target, Users, Wallet } from "lucide-react";

const featuresContent = {
  preheading: "¿Por qué InmoInversor?",
  heading: "Tu Marca, Nuestro Alcance",
  subheading:
    "Construimos una comunidad altamente comprometida de inversores inmobiliarios en España",
  features: [
    {
      icon: Users,
      title: "Audiencia Cualificada",
      description:
        "Inversores activos y potenciales entre 28-65+ años, emprendedores y renovadores DIY.",
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
    <Wrapper className="bg-white py-16">
      <InnerWrap className="items-center justify-center max-w-6xl text-center py-0">
        <TitleBlock
          preheading={featuresContent.preheading}
          heading={featuresContent.heading}
          subheading={featuresContent.subheading}
          theme="light"
          orientation="center"
        />

        <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {featuresContent.features.map((feature, index) => (
            <li
              key={index}
              className="bg-slate-50 p-6 rounded-md border border-slate-200 hover:border-brand-primary transition-colors duration-300"
            >
              <div className="inline-flex justify-center items-center w-12 h-12 bg-brand-primary/10 rounded-full mb-4">
                <feature.icon className="h-5 w-5 text-brand-primary" />
              </div>
              <h3 className="text-md font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-xs">{feature.description}</p>
            </li>
          ))}
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
