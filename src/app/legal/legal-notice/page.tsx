import { InnerWrap, Wrapper } from "@/lib/atoms";
import LegalBackButton from "../legal-back-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description:
    "Aviso legal de InmoInversor. Condiciones generales de uso del sitio web y información legal de la empresa.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalNotice() {
  return (
    <Wrapper className="prose mx-auto p-4 text-left">
      <InnerWrap className="max-w-4xl text-left items-start justify-start text-sm">
        <LegalBackButton />
        <h1>Aviso Legal</h1>
        <p>
          El presente Aviso Legal establece las condiciones generales que
          regulan el acceso y uso del sitio web www.inmoinversor.com (en
          adelante, &quot;la Web&quot;), que INVERSIONES CON PROPOSITO Y AMIGOS,
          S.L. pone a disposición de los usuarios de Internet. El acceso y uso
          de la Web implica la aceptación plena y sin reservas de todas y cada
          una de las disposiciones incluidas en este Aviso Legal, así como de
          cualquier otra disposición legal que fuera de aplicación. A través de
          la Web, INVERSIONES CON PROPOSITO Y AMIGOS, S.L. facilita a los
          usuarios el acceso y la utilización de diversos servicios y contenidos
          puestos a disposición por INVERSIONES CON PROPOSITO Y AMIGOS, S.L. o
          por terceros. El usuario se compromete a hacer un uso adecuado de los
          contenidos y servicios que INVERSIONES CON PROPOSITO Y AMIGOS, S.L.
          ofrece a través de la Web y a no emplearlos para incurrir en
          actividades ilícitas o contrarias a la buena fe y al ordenamiento
          jurídico.
        </p>
        <h2>1. Información general</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se
          informa que la presente página web www.inmoinversor.com (en adelante,
          &quot;la Web&quot;) es propiedad de INVERSIONES CON PROPOSITO Y
          AMIGOS, S.L. con domicilio social en Calle Golondrina, 11, 28229,
          Villanueva del Pardillo, Madrid, España, con CIF B45834564 e inscrita
          en el Registro Mercantil de Madrid, Tomo 45730, Folio 32, Hoja
          M803207, Inscripción 1ª.
        </p>
        <h2>2. Objeto</h2>
        <p>
          Las presentes condiciones generales de uso (en adelante,
          &quot;Condiciones de Uso&quot;) regulan el acceso y la utilización del
          sitio web www.inmoinversor.com (en adelante, &quot;la Web&quot;) que
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. pone gratuitamente a
          disposición de los usuarios de Internet. El acceso y uso de la Web
          atribuye la condición de usuario de la Web (en adelante, el
          &quot;Usuario&quot;) e implica la aceptación plena y sin reservas de
          todas y cada una de las disposiciones incluidas en estas Condiciones
          de Uso.
        </p>
        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos de la Web, entendiendo por estos a título
          meramente enunciativo, los textos, fotografías, gráficos, imágenes,
          iconos, tecnología, software, links y demás contenidos audiovisuales o
          sonoros, así como su diseño gráfico y códigos fuente (en adelante, los
          &quot;Contenidos&quot;), son propiedad intelectual de INVERSIONES CON
          PROPOSITO Y AMIGOS, S.L. o de terceros, sin que puedan entenderse
          cedidos al Usuario ninguno de los derechos de explotación sobre los
          mismos más allá de lo estrictamente necesario para el correcto uso de
          la Web.
        </p>
        <h2>4. Uso del sitio web y responsabilidad</h2>
        <p>
          El Usuario se compromete a hacer un uso diligente del sitio web y de
          los servicios accesibles desde el mismo, con total sujeción a la ley,
          a las buenas costumbres y a las presentes Condiciones de Uso.
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. se reserva el derecho a
          retirar cualquier información o comunicación que vulnere el
          ordenamiento jurídico, que incite a la realización de actos
          delictivos, lesivos o constitutivos de delito o que, en general, sean
          contrarios a las buenas costumbres o al orden público.
        </p>
        <h2>5. Modificaciones</h2>
        <p>
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. se reserva el derecho de
          efectuar sin previo aviso las modificaciones que considere oportunas
          en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos
          y servicios que se presten a través de la misma como la forma en la
          que éstos aparezcan presentados o localizados en su portal.
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
