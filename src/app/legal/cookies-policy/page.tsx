"use client";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft } from "lucide-react";

export default function CookiesPolicy() {
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
        <h1>Política de Cookies</h1>
        <p>
          En INVERSIONES CON PROPOSITO Y AMIGOS, S.L., utilizamos cookies y
          tecnologías similares para mejorar la experiencia de los usuarios en
          nuestro sitio web www.inmoinversor.com (en adelante, &quot;la
          Web&quot;). Esta Política de Cookies explica qué son las cookies, cómo
          las utilizamos, y las opciones que tienes para gestionarlas.
        </p>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo cuando visitas una página web. Las cookies permiten a la
          web recordar tus acciones y preferencias (como el idioma, el tamaño de
          la fuente y otras preferencias de visualización) durante un período de
          tiempo, para que no tengas que volver a configurarlas cada vez que
          vuelvas a la web. Además, las cookies pueden ayudar a mejorar la
          funcionalidad del sitio web y a proporcionar una experiencia de
          usuario más personalizada.
        </p>
        <h2>2. Tipos de cookies que utilizamos.</h2>
        <p>En la Web utilizamos los siguientes tipos de cookies:</p>
        <ul>
          <li>
            <strong>Cookies técnicas:</strong> Son aquellas que permiten al
            usuario la navegación a través de la Web y la utilización de las
            diferentes opciones o servicios que en ella existen, como
            identificar la sesión, acceder a partes de acceso restringido,
            realizar la solicitud de inscripción o participación en un evento,
            utilizar elementos de seguridad durante la navegación, almacenar
            contenidos para la difusión de videos o sonido o compartir
            contenidos a través de redes sociales. Estas cookies son esenciales
            para el funcionamiento de la Web y no requieren el consentimiento
            del usuario.
          </li>
          <li>
            <strong>Cookies de personalización:</strong> Son aquellas que
            permiten al usuario acceder al servicio con algunas características
            de carácter general predefinidas en función de una serie de
            criterios en el terminal del usuario, como el idioma, el tipo de
            navegador a través del cual accede al servicio, la configuración
            regional desde donde accede al servicio, etc. Estas cookies mejoran
            la experiencia del usuario al permitir una navegación más
            personalizada.
          </li>
          <li>
            <strong>Cookies de análisis:</strong> Son aquellas que permiten al
            responsable de las mismas el seguimiento y análisis del
            comportamiento de los usuarios de los sitios web a los que están
            vinculadas. La información recogida mediante este tipo de cookies se
            utiliza en la medición de la actividad de los sitios web, aplicación
            o plataforma y para la elaboración de perfiles de navegación de los
            usuarios de dichos sitios, aplicaciones y plataformas, con el fin de
            introducir mejoras en función del análisis de los datos de uso que
            hacen los usuarios del servicio. Estas cookies requieren el
            consentimiento del usuario.
          </li>
          <li>
            <strong>Cookies publicitarias:</strong> Son aquellas que permiten la
            gestión, de la forma más eficaz posible, de los espacios
            publicitarios que, en su caso, el editor haya incluido en una página
            web, aplicación o plataforma desde la que presta el servicio
            solicitado en base a criterios como el contenido editado o la
            frecuencia en la que se muestran los anuncios. Estas cookies ayudan
            a mostrar anuncios relevantes para los usuarios y requieren el
            consentimiento del usuario.
          </li>
        </ul>
        <p>
          A continuación indicamos las cookies que están implementadas en
          nuestra web (tabla ejemplo):
        </p>
        <Table className="border rounded-lg min-w-full flex-1 p-4 my-12">
          <TableHeader>
            <TableRow>
              <TableHead>COOKIE</TableHead>
              <TableHead>FINALIDAD</TableHead>
              <TableHead>PLAZO DE CONSERVACIÓN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>_ga</TableCell>
              <TableCell>
                Análisis de visitas y comportamiento de usuarios
              </TableCell>
              <TableCell>2 años</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_gid</TableCell>
              <TableCell>
                Análisis de visitas y comportamiento de usuarios
              </TableCell>
              <TableCell>24 horas</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_gat</TableCell>
              <TableCell>Limitar el porcentaje de solicitudes</TableCell>
              <TableCell>1 minuto</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>PHPSESSID</TableCell>
              <TableCell>Identificación de la sesión del usuario</TableCell>
              <TableCell>Sesión</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>cookieconsent_status</TableCell>
              <TableCell>Recordar la aceptación de cookies</TableCell>
              <TableCell>1 año</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_fs</TableCell>
              <TableCell>
                Seguimiento de la primera visita del usuario
              </TableCell>
              <TableCell>2 años</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_s</TableCell>
              <TableCell>
                Análisis de visitas y comportamiento de usuarios
              </TableCell>
              <TableCell>30 minutos</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_sa_t</TableCell>
              <TableCell>Análisis de marketing y referencias</TableCell>
              <TableCell>30 minutos</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_sa_p</TableCell>
              <TableCell>Análisis de marketing y referencias</TableCell>
              <TableCell>30 minutos</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_y</TableCell>
              <TableCell>
                Análisis de visitas y comportamiento de usuarios
              </TableCell>
              <TableCell>1 año</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_tm</TableCell>
              <TableCell>Gestión de la sesión del usuario</TableCell>
              <TableCell>30 minutos</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_tw</TableCell>
              <TableCell>Gestión de la sesión del usuario</TableCell>
              <TableCell>2 semanas</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_secure_customer_sig</TableCell>
              <TableCell>Autenticación del usuario</TableCell>
              <TableCell>1 año</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_cart</TableCell>
              <TableCell>Gestión del carrito de compras</TableCell>
              <TableCell>2 semanas</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_d</TableCell>
              <TableCell>Seguimiento de la sesión del usuario</TableCell>
              <TableCell>1 día</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>_shopify_m</TableCell>
              <TableCell>Gestión de la sesión del usuario</TableCell>
              <TableCell>1 año</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h2>3. ¿Cómo puedes gestionar las cookies?</h2>
        <p>
          Puedes gestionar las cookies a través de la configuración de tu
          navegador. La mayoría de los navegadores te permiten bloquear o
          eliminar las cookies, así como configurar las preferencias de cookies
          para sitios web específicos. A continuación, te indicamos cómo hacerlo
          en los navegadores más comunes:
        </p>
        <ul>
          <li>Google Chrome: Configuración de cookies en Chrome.</li>
          <li>Mozilla Firefox: Configuración de cookies en Firefox.</li>
          <li>
            Internet Explorer: Configuración de cookies en Internet Explorer.
          </li>
          <li>Safari: Configuración de cookies en Safari.</li>
        </ul>
        <p>
          Ten en cuenta que si decides bloquear o eliminar las cookies, es
          posible que algunas funcionalidades de la Web no estén disponibles o
          no funcionen correctamente.
        </p>
        <h2>4. Consentimiento.</h2>
        <p>
          Al utilizar la Web, aceptas el uso de cookies de acuerdo con esta
          Política de Cookies. Puedes retirar tu consentimiento en cualquier
          momento configurando tu navegador para que bloquee o elimine las
          cookies. Además, en la Web ofrecemos herramientas para gestionar tus
          preferencias de cookies, permitiéndote aceptar o rechazar las cookies
          no esenciales.
        </p>
        <h2>5. Actualizaciones de la política de cookies.</h2>
        <p>
          INVERSIONES CON PROPOSITO Y AMIGOS, S.L. se reserva el derecho a
          modificar la presente Política de Cookies para adaptarla a novedades
          legislativas o jurisprudenciales, así como a prácticas del sector. En
          dichos supuestos, INVERSIONES CON PROPOSITO Y AMIGOS, S.L. anunciará
          en esta página los cambios introducidos con razonable antelación a su
          puesta en práctica. Te recomendamos revisar esta Política de Cookies
          periódicamente para estar informado sobre cómo utilizamos las cookies
          y las tecnologías similares.
        </p>
        <h2>6. Contacto.</h2>
        <p>
          Si tienes alguna pregunta sobre nuestra Política de Cookies, puedes
          ponerte en contacto con nosotros a través del correo electrónico
          gortiz@ortizpcapital.com
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
