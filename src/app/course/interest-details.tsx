import React from "react";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { TitleBlock } from "@/components/ui/titleblock";

export default function InterestDetails() {
  const courseContent = {
    title: "Domina las Estrategias de Inversión Inmobiliaria",
    features: [
      {
        title: "Análisis de Propiedades",
        description:
          "Aprende a analizar propiedades de manera efectiva para identificar oportunidades de inversión rentables.",
      },
      {
        title: "Gestión de Transacciones",
        description:
          "Obtén conocimientos sobre cómo gestionar transacciones inmobiliarias de manera fluida y eficiente.",
      },
      {
        title: "Reventa para Ganancias",
        description:
          "Comprende las estrategias para revender propiedades y maximizar tus beneficios.",
      },
    ],
  };
  return (
    <Wrapper className="py-[10dvh]">
      <InnerWrap>
        <TitleBlock
          heading={courseContent.title}
          theme="light"
          orientation="center"
        />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="bg-slate-50 text-black p-8 rounded-2xl border border-slate-200 row-span-2">
            <h3 className="text-xl font-medium tracking-tight">
              Análisis de Propiedades
            </h3>
            <p className="mt-2">
              Aprende a analizar propiedades de manera efectiva para identificar
              oportunidades de inversión rentables.
            </p>
          </li>
          <li className="bg-slate-50 text-black p-8 rounded-2xl border border-slate-200 aspect-video">
            <h3 className="text-xl font-medium tracking-tight">
              Gestión de Transacciones
            </h3>
            <p className="mt-2">
              Obtén conocimientos sobre cómo gestionar transacciones
              inmobiliarias de manera fluida y eficiente.
            </p>
          </li>
          <li className="bg-slate-50 text-black p-8 rounded-2xl border border-slate-200 aspect-video">
            <h3 className="text-xl font-medium tracking-tight">
              Reventa para Ganancias
            </h3>
            <p className="mt-2">
              Comprende las estrategias para revender propiedades y maximizar
              tus beneficios.
            </p>
          </li>
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
