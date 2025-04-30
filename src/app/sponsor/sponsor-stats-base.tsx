import { InnerWrap, Wrapper } from "@/lib/atoms";
import React from "react";

type StatsProps = {
  label: string;
  value: string;
};

const statsData: StatsProps[] = [
  { label: "ESPECTADORES RECURRENTES", value: "1.300" },
  { label: "ESPECTADORES ÚNICOS", value: "42.500" },
  { label: "SUSCRIPTORES", value: "8.555" },
  { label: "TIEMPO DE VISUALIZACIÓN", value: "1.100hrs" },
];

export default function SponsorStatsBase() {
  return (
    <Wrapper className="pt-24">
      <InnerWrap className="flex w-full border p-8 bg-white">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center w-full">
          {statsData.map((stat, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-start gap-3 w-full"
            >
              <h3 className="text-sm font-medium uppercase text-brand-primary">
                {stat.label}
              </h3>
              <p className="text-2xl lg:text-4xl font-bold text-slate-900">
                {stat.value}
              </p>
            </li>
          ))}
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
