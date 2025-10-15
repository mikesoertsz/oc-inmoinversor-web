"use client";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { ChevronLeft } from "lucide-react";

export default function InvoiceClause() {
  return (
    <Wrapper className="prose mx-auto p-4 text-left">
      <InnerWrap className="max-w-4xl text-left items-start justify-start text-sm">
        <button
          onClick={() => window.history.back()}
          className="mb-4 flex items-center text-sm text-gray-500 group hover:text-brand-primary"
        >
          <ChevronLeft
            className="h-4 w-4 mr-1 transition-transform transform group-hover:-translate-x-1"
            size={16}
          />
          Volver
        </button>
        <h1>Cláusula para Insertar en las Facturas</h1>
        <p>
          El responsable del tratamiento de los datos es INVERSIONES CON
          PROPOSITO Y AMIGOS, S.L., Los datos serán tratados con la finalidad de
          gestión administrativa, contable y fiscal. La base que legitima el
          tratamiento es la existencia de una relación contractual y el
          cumplimiento de obligaciones legales; siendo conservados los datos por
          los plazos de prescripción legal para el ejercicio de acciones. Los
          datos podrán ser comunicados a la Administración Tributaria y a
          entidades bancarias.
        </p>
        <p>
          Podrá ejercer sus derechos de acceso, rectificación, supresión,
          oposición, así como otros derechos desarrollados por la normativa de
          protección de datos en la dirección: calle Golondrina nº 11, CP:
          28229, Villanueva del Pardillo, Madrid, o al email:
          gortiz@ortizpcapital.com. Si considera que el tratamiento no se ajusta
          a la normativa vigente, podrá presentar una reclamación ante la
          Autoridad de Control (www.aepd.es).
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
