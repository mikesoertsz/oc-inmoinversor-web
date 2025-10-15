"use client";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { ChevronLeft } from "lucide-react";

export default function ContractClause() {
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
        <h1>Cláusula Contratos</h1>
        <p>
          Acorde a la normativa aplicable en Protección de Datos Personales
          (Reglamento UE 679/2016, General de Protección de Datos y la Ley
          Orgánica 3/2018 de Protección de Datos Personales y Garantía de los
          Derecho Digitales), los intervinientes del presente Contrato quedan
          informados mediante la firma del presente documento de que sus datos
          personales (como datos identificativos, de representación y otros
          datos imprescindibles), serán objeto de tratamiento para el
          desarrollo, mantenimiento y ejecución del presente Contrato, así como
          para la gestión y archivo de la documentación relativa al mismo.
        </p>
        <p>
          La base jurídica que legitima el tratamiento de los datos personales
          incluidos en el presente Contrato, y de todos aquellos que del
          desarrollo y ejecución del mismo es la existencia de una relación
          contractual entre las partes. Los intervinientes quedan informados de
          que sus datos personales se conservarán el tiempo en que se mantenga
          vigente la relación contractual surgida del presente y, una vez
          finalizada, se mantendrán debidamente bloqueados durante los plazos de
          prescripción establecidos para el ejercicio de acciones legales.
          Pasado este periodo los datos se suprimirán de manera definitiva
        </p>
        <p>
          Las partes garantizan cumplir con el deber de información con respecto
          a sus empleados cuyos datos personales sean comunicados para el
          mantenimiento y cumplimiento de la relación contractual. Los datos
          personales podrán ser comunicados por las Partes a las
          Administraciones Públicas cuando la Ley obligue a ello y, en su caso,
          a entidades financieras para la gestión de cobros/pagos; así como
          podrán ser tratados por terceros, debidamente autorizados para ello a
          través de correspondientes contratos de encargo de tratamiento. En
          caso de que existieran transferencias internacionales de datos las
          partes asegurarán que las mismas cumplan con los requisitos
          establecidas en el capítulo V del RGPD.
        </p>
        <p>
          En todo caso, los titulares de datos podrán ejercer sus derechos de
          acceso, rectificación, supresión, oposición, limitación y portabilidad
          ante la parte que corresponda a través de comunicación por escrito al
          domicilio social que consta al comienzo del presente documento e
          identificando el derecho que se solicita. En caso de discrepancia en
          cuanto a la tutela de los derechos mencionados las partes podrán
          interponer una reclamación ante la Autoridad de Control (www.aepd.es).
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
