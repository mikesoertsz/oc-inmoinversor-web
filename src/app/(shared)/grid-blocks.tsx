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
      title: "Análisis de Mercado",
      subtitle:
        "Comprender tendencias y datos del mercado para mejores decisiones de inversión.",
    },
    {
      title: "Estrategias de Inversión",
      subtitle:
        "Diferentes enfoques para maximizar retornos y minimizar riesgos en inversiones.",
    },
    {
      title: "Gestión de Propiedades",
      subtitle:
        "Gestión efectiva de propiedades para asegurar rendimiento y valor óptimos.",
    },
    {
      title: "Opciones de Financiación",
      subtitle:
        "Explorar métodos de financiación para inversiones inmobiliarias eficaces.",
    },
    {
      title: "Evaluación de Riesgos",
      subtitle:
        "Identificar y mitigar riesgos para proteger tu cartera inmobiliaria eficazmente.",
    },
    {
      title: "Consideraciones Legales",
      subtitle:
        "Navegar aspectos legales para asegurar cumplimiento y evitar problemas.",
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
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full pt-4">
          {gridItems.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-start rounded-xl bg-slate-50 border border-slate-200 text-gray-800 p-8 py-6"
            >
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="text-sm pt-1">{item.subtitle}</p>
            </li>
          ))}
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
