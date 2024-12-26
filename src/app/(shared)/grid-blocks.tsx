import { InnerWrap, Wrapper } from "@/lib/atoms";
import React from "react";
import { TitleBlock } from "@/components/ui/titleblock";

type GridItem = {
  title: string;
  subtitle: string;
};

type GridBlocksProps = {
  gridItems?: GridItem[];
};

const defaultGridContent: {
  title: string;
  subtitle: string;
  items: GridItem[];
} = {
  title: "Temas del Curso de Inversión Inmobiliaria",
  subtitle: "Aprende estrategias prácticas y conocimientos",
  items: [
    {
      title: "Planificación Financiera",
      subtitle: "Estrategia financiera para un mindset inversor sólido.",
    },
    {
      title: "Mindset",
      subtitle: "Planificación para un mindset inversor sólido.",
    },
    {
      title: "Estrategias de Inversión",
      subtitle:
        "Conoce todas las estrategias y cómo elegir la que mejor se adapta a ti.",
    },
    {
      title: "Equipo Necesario",
      subtitle:
        "Sin un buen equipo, solo tienes el 50% del trabajo hecho. Aprende a construirlo.",
    },
    {
      title: "Encontrar Ofertas + Leads",
      subtitle:
        "Lo más importante es encontrar la oportunidad. Te enseñamos cómo hacerlo.",
    },
    {
      title: "Financiación",
      subtitle:
        "Qué preparar, cómo pedirlo, cuándo y qué pedir para evitar rechazos.",
    },
    {
      title: "Legal",
      subtitle:
        "No te equivoques en impuestos, conoce todos los trucos de primera mano.",
    },
    {
      title: "Renovaciones",
      subtitle:
        "Te enseñamos casos reales y precios para planificar renovaciones efectivas.",
    },
    {
      title: "Gestión de Propiedades",
      subtitle:
        "Aprende a gestionar tus propiedades de manera eficiente para maximizar tus ingresos.",
    },
  ],
};

export default function GridBlocks({
  gridItems = defaultGridContent.items,
}: GridBlocksProps) {
  return (
    <Wrapper className="pt-4">
      <InnerWrap>
        <TitleBlock
          heading={defaultGridContent.title}
          subheading={defaultGridContent.subtitle}
          theme="light"
          orientation="center"
        />
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full p-4 bg-brand-bg1 border border-slate-200 rounded-xl">
          {gridItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-start rounded-xl bg-white shadow-sm hover:shadow-md transition transform duration-200 ease-in-out border border-slate-200 text-slate-800 p-6 py-6"
            >
              <h2 className="text-md font-semibold text-black">{item.title}</h2>
              <p className="text-sm pt-1 font-body">{item.subtitle}</p>
            </li>
          ))}
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
