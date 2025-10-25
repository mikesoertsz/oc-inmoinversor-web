import { InnerWrap, Wrapper } from "@/lib/atoms";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LegalBackButton from "../legal-back-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies de InmoInversor. Información sobre el uso de cookies y tecnologías similares en nuestro sitio web.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPolicy() {
  return (
    <Wrapper className="prose mx-auto p-4 text-left">
      <InnerWrap className="max-w-4xl text-left items-start justify-start text-sm">
        <LegalBackButton />
        <h1>Política de Cookies</h1>
        <p>
          En INMOINVERSOR utilizamos cookies y otras tecnologías similares para
          mejorar su experiencia de navegación en nuestro sitio web,
          personalizar el contenido y los anuncios, proporcionar funciones de
          redes sociales y analizar nuestro tráfico. También compartimos
          información sobre su uso de nuestro sitio con nuestros socios de redes
          sociales, publicidad y análisis, quienes pueden combinarla con otra
          información que les haya proporcionado o que hayan recopilado de su
          uso de sus servicios.
        </p>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en su
          dispositivo (ordenador, tablet o móvil) cuando visita un sitio web.
          Las cookies permiten al sitio web recordar sus acciones y preferencias
          (como inicio de sesión, idioma, tamaño de fuente y otras preferencias
          de visualización) durante un período de tiempo, para que no tenga que
          volver a configurarlas cuando regrese al sitio o navegue de una página
          a otra.
        </p>
        <h2>2. ¿Qué tipos de cookies utilizamos?</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Cookie</TableHead>
              <TableHead>Descripción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cookies Técnicas</TableCell>
              <TableCell>
                Son necesarias para el funcionamiento del sitio web y no pueden
                ser desactivadas en nuestros sistemas.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cookies de Análisis</TableCell>
              <TableCell>
                Nos permiten conocer cómo navega el usuario por nuestro sitio
                web y mejorar así el servicio.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cookies de Marketing</TableCell>
              <TableCell>
                Utilizadas para el seguimiento y análisis de la efectividad de
                nuestras campañas publicitarias.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h2>3. Cookies de terceros</h2>
        <p>
          Nuestro sitio web puede contener enlaces a sitios web de terceros. No
          somos responsables de las políticas de cookies de esos sitios. Le
          recomendamos que revise las políticas de cookies de cada sitio que
          visite.
        </p>
        <h2>4. Gestión de cookies</h2>
        <p>
          Puede gestionar sus preferencias de cookies en cualquier momento a
          través de la configuración de su navegador. Tenga en cuenta que, si
          desactiva las cookies, es posible que algunas funcionalidades del
          sitio web no estén disponibles o no funcionen correctamente.
        </p>
      </InnerWrap>
    </Wrapper>
  );
}
