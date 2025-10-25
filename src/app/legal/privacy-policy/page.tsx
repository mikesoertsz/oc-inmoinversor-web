import { InnerWrap, Wrapper } from "@/lib/atoms";
import LegalBackButton from "../legal-back-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de InmoInversor. Información sobre el tratamiento de datos personales según el RGPD y LOPDGDD.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <Wrapper className="prose mx-auto p-4 text-left">
      <InnerWrap className="max-w-4xl text-left items-start justify-start text-sm">
        <LegalBackButton />
        <h1>Política de Privacidad</h1>
        <p>
          En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y
          del Consejo de 27 de abril de 2016 relativo a la protección de las
          personas físicas en lo que respecta al tratamiento de datos personales
          y a la libre circulación de estos datos (RGPD), se informa a los
          usuarios de que los datos personales facilitados a través de este
          sitio web serán tratados por INVERSIONES CON PROPOSITO Y AMIGOS, S.L.
          (en adelante, &quot;INMOINVERSOR&quot;) con las finalidades y en los
          términos establecidos en el presente documento.
        </p>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          Denominación social: INVERSIONES CON PROPOSITO Y AMIGOS, S.L.
          Domicilio social: Calle Golondrina, 11, 28229, Villanueva del
          Pardillo, Madrid, España CIF: B45834564 Teléfono: disponible en
          formulario de contacto Correo electrónico: gortiz@ortizpcapital.com
        </p>
        <h2>2. Datos personales que recabamos</h2>
        <p>
          Los datos personales que tratamos son aquellos que nos proporciona
          directamente el usuario a través de los formularios habilitados en el
          sitio web, correspondencias, comunicaciones o mediante el uso de
          nuestros servicios. Los datos que podemos recabar incluyen: datos de
          identificación (nombre, apellidos), datos de contacto (correo
          electrónico, teléfono, dirección), datos de navegación (dirección IP,
          cookies, dispositivo).
        </p>
        <h2>3. Finalidad del tratamiento de datos</h2>
        <p>
          Los datos personales recabados serán utilizados con las siguientes
          finalidades: - Gestión y resolución de consultas realizadas por el
          usuario - Envío de comunicaciones comerciales sobre productos y
          servicios - Gestión de servicios prestados - Cumplimiento de
          obligaciones legales - Mejora de la experiencia del usuario en el
          sitio web
        </p>
        <h2>4. Base jurídica para el tratamiento</h2>
        <p>
          El tratamiento de sus datos personales se basa en: - Consentimiento
          del usuario: para comunicaciones comerciales y uso de cookies no
          esenciales - Ejecución de un contrato: para la gestión de servicios
          prestados - Interés legítimo: para la mejora de la experiencia del
          usuario - Cumplimiento de una obligación legal: para cumplir con las
          obligaciones fiscales y legales aplicables
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
