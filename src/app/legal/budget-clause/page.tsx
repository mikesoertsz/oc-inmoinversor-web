"use client";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { ChevronLeft } from "lucide-react";

export default function BudgetClause() {
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
        <h1>Cláusula Presupuestos</h1>
        <p>
          Todos los datos personales facilitados serán tratados con la finalidad
          de elaborar el presupuesto solicitado y realizar un seguimiento del
          mismo por INVERSIONES CON PROPOSITO Y AMIGOS, S.L como responsable del
          tratamiento. La legitimación para el tratamiento de sus datos está
          basada en la existencia de una relación precontractual entre las
          partes. Los datos personales serán mantenidos mientras se mantenga la
          vinculación con la entidad y, una vez finalizada, debidamente
          bloqueados durante los plazos de prescripción legal establecidos para
          el ejercicio de acciones; en aquellos casos en los que no sea aceptado
          el presupuesto, los datos serán conservados por un plazo máximo de un
          año.
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
