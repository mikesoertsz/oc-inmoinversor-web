"use client";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
        <h1>Política de Privacidad</h1>
        <p>Versión Abril 2025</p>
        <p>
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L., con NIF B-01783299 y
          domicilio fiscal en calle Golondrina nº 11, CP: 28229, Villanueva del
          Pardillo, Madrid, es el responsable del tratamiento de los datos
          personales del usuario y le informa que estos datos serán tratados de
          conformidad con lo dispuesto en el Reglamento (UE) 2016/679, de 27 de
          abril de 2016 (RGPD), y en la Ley Orgánica 3/2018, de 5 de diciembre
          (LOPDGDD).
        </p>
        <p>
          En INVERSIONES CON PROPOSITO Y AMIGOS, S.L., valoramos y respetamos la
          privacidad de nuestros usuarios y nos comprometemos a proteger sus
          datos personales. Esta Política de Privacidad tiene como objetivo
          informar a los usuarios sobre cómo recopilamos, utilizamos,
          compartimos y protegemos sus datos personales cuando acceden y
          utilizan nuestro sitio web www. inmoinversor.com (en adelante, "la
          Web").
        </p>
        <p>
          El acceso y uso de la Web implica la aceptación plena y sin reservas
          de todas y cada una de las disposiciones incluidas en esta Política de
          Privacidad, así como de cualquier otra disposición legal que fuera de
          aplicación. A través de la Web, INVERSIONES CON PROPOSITO Y AMIGOS,
          S.L. facilita a los usuarios el acceso y la utilización de diversos
          servicios y contenidos puestos a disposición por INVERSIONES CON
          PROPOSITO Y AMIGOS, S.L. o por terceros.
        </p>
        <p>
          En esta Política de Privacidad, detallamos los diferentes tratamientos
          de datos personales que realizamos, las finalidades para las que
          tratamos dichos datos, los plazos de conservación, las bases
          legitimadoras del tratamiento, y los derechos que los usuarios pueden
          ejercer en relación con sus datos personales. Además, explicamos las
          medidas de seguridad que implementamos para proteger los datos
          personales y las condiciones bajo las cuales podríamos realizar
          transferencias internacionales de datos.
        </p>
        <p>
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. se compromete a adoptar las
          medidas técnicas y organizativas necesarias para garantizar la
          seguridad de los datos personales y evitar su alteración, pérdida,
          tratamiento o acceso no autorizado, habida cuenta del estado de la
          tecnología, la naturaleza de los datos almacenados y los riesgos a los
          que están expuestos.
        </p>
        <p>
          Es importante que los usuarios lean atentamente esta Política de
          Privacidad para comprender cómo tratamos sus datos personales y los
          derechos que tienen en relación con dichos datos. Si los usuarios
          tienen alguna pregunta o necesitan más información sobre nuestra
          Política de Privacidad, pueden ponerse en contacto con nosotros a
          través del correo electrónico gortiz@ortizpcapital.com
        </p>
        <h2>1. Gestión de solicitud de presupuesto.</h2>
        <ul>
          <li>
            <strong>Finalidad:</strong> Gestionar su solicitud de presupuesto
            según el plan elegido.
          </li>
          <li>
            <strong>Plazo de conservación:</strong> Los datos se conservarán
            mientras se mantenga la relación precontractual o contractual y,
            posteriormente, durante los plazos legalmente establecidos para la
            resolución de posibles responsabilidades derivadas del tratamiento.
          </li>
          <li>
            <strong>Base legitimadora:</strong> Ejecución de un contrato en el
            que el usuario es parte y el consentimiento del usuario.
          </li>
        </ul>
        <h2>
          2. Desarrollo, cumplimiento y ejecución del contrato de compraventa
          del curso.
        </h2>
        <ul>
          <li>
            <strong>Finalidad:</strong> Gestionar la relación contractual,
            incluyendo la tramitación de pedidos, pagos o prestación de
            servicios.
          </li>
          <li>
            <strong>Plazo de conservación:</strong> Los datos se conservarán
            mientras se mantenga la relación contractual y, posteriormente,
            durante los plazos legalmente establecidos para la resolución de
            posibles responsabilidades derivadas del tratamiento.
          </li>
          <li>
            <strong>Base legitimadora:</strong> Ejecución de un contrato en el
            que el usuario es parte y el cumplimiento de obligaciones legales.
          </li>
        </ul>
        <h2>3. Atención al cliente.</h2>
        <ul>
          <li>
            <strong>Finalidad:</strong> Atender tus solicitudes de información,
            quejas y reclamaciones, ofrecer soporte técnico y resolver
            incidencias relacionadas con nuestros servicios.
          </li>
          <li>
            <strong>Plazo de conservación:</strong> Los datos se conservarán
            mientras se mantenga la relación contractual y, posteriormente,
            durante los plazos legalmente establecidos para la resolución de
            posibles responsabilidades derivadas del tratamiento.
          </li>
          <li>
            <strong>Base legitimadora:</strong> Ejecución de un contrato en el
            que el usuario es parte y el consentimiento del usuario.
          </li>
        </ul>
        <h2>4. Marketing.</h2>
        <ul>
          <li>
            <strong>Finalidad:</strong> Enviar comunicaciones comerciales y
            promocionales relacionadas con nuestros servicios, realizar estudios
            estadísticos y de mercado.
          </li>
          <li>
            <strong>Plazo de conservación:</strong> Los datos se conservarán
            mientras el usuario no retire su consentimiento.
          </li>
          <li>
            <strong>Base legitimadora:</strong> Relación contractual en caso de
            haber adquirido algunos de nuestros productos y en caso contrario se
            solicitará el consentimiento del usuario.
          </li>
        </ul>
        <h2>5. Derechos del Usuario.</h2>
        <p>El usuario tiene derecho a:</p>
        <ul>
          <li>Acceder a sus datos personales.</li>
          <li>Solicitar la rectificación de los datos inexactos.</li>
          <li>
            Solicitar la supresión de sus datos cuando, entre otros motivos, los
            datos ya no sean necesarios para los fines que fueron recogidos.
          </li>
          <li>
            Solicitar la limitación del tratamiento de sus datos, en cuyo caso
            únicamente se conservarán para el ejercicio o la defensa de
            reclamaciones.
          </li>
          <li>
            Oponerse al tratamiento de sus datos, en determinadas circunstancias
            y por motivos relacionados con su situación particular.
          </li>
          <li>Solicitar la portabilidad de sus datos.</li>
        </ul>
        <p>
          Podrá ejercer sus derechos en la dirección: calle Golondrina nº 11,
          CP: 28229, Villanueva del Pardillo, Madrid, o al email:
          gortiz@ortizpcapital.com. Si considera que el tratamiento no se ajusta
          a la normativa vigente, podrá presentar una reclamación ante la
          Autoridad de Control (www.aepd.es).
        </p>
        <h2>6. Medidas de Seguridad.</h2>
        <p>
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. se compromete a adoptar las
          medidas técnicas y organizativas necesarias para garantizar la
          seguridad de los datos personales y evitar su alteración, pérdida,
          tratamiento o acceso no autorizado, habida cuenta del estado de la
          tecnología, la naturaleza de los datos almacenados y los riesgos a los
          que están expuestos.
        </p>
        <h2>7. Transferencias Internacionales de Datos.</h2>
        <p>
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. no realiza transferencias
          internacionales de datos personales. En caso de que en el futuro se
          realicen, se informará debidamente al usuario y se garantizará el
          cumplimiento de las disposiciones del RGPD y la LOPDGDD.
        </p>
        <h2>8. Cambios en la Política de Privacidad.</h2>
        <p>
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. se reserva el derecho a
          modificar la presente Política de Privacidad para adaptarla a
          novedades legislativas, jurisprudenciales, prácticas del sector o
          decisiones corporativas. Estas modificaciones serán debidamente
          publicadas en la Web, indicando la fecha de la última actualización al
          inicio del documento.
        </p>
        <p>
          En caso de que las modificaciones introducidas afecten a los derechos
          del usuario o a la forma en que tratamos sus datos personales,
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. informará a los usuarios a
          través de un aviso en la Web o mediante el envío de un correo
          electrónico a la dirección proporcionada por el usuario durante su
          registro. Esta comunicación se realizará con una antelación razonable
          para que los usuarios puedan revisar los cambios y, si lo consideran
          necesario, ejercer sus derechos conforme a lo establecido en la
          normativa vigente.
        </p>
        <p>
          Es responsabilidad del usuario revisar periódicamente esta Política de
          Privacidad para estar informado sobre posibles cambios. El uso
          continuado de la Web tras la publicación de cualquier modificación en
          la Política de Privacidad implicará la aceptación de dichos cambios
          por parte del usuario.
        </p>
        <p>
          En caso de que el usuario no esté de acuerdo con las modificaciones
          introducidas, podrá ejercer su derecho a solicitar la supresión de sus
          datos personales conforme a lo establecido en el apartado de Derechos
          del Usuario de esta Política de Privacidad.
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
