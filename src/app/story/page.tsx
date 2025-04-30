import { Button } from "@/components/ui/button";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PersonalStory from "./personal-story";

export const metadata: Metadata = {
  title: "Historia de Guillermo Ortiz | Inversiones Inmobiliarias",
  description:
    "Descubre la historia de Guillermo Ortiz y su camino en las inversiones inmobiliarias. Aprende cómo puedes seguir sus pasos y tener éxito en el sector.",
};

const storyContent = {
  title: "Historia de Guillermo Ortiz",
  paragraphs: [
    "Empecé desde muy pequeño expuesto a mucho lujo. Fui a los mejores colegios en Madrid y en Estados Unidos. A pesar de que mi familia era de clase media, estuve rodeado de gente de alta clase. Tuve esa suerte.",
    "Desde pequeño quería aspirar a eso, pero con una condición: tener tiempo libre. Veía a muchos padres trabajar sin parar y descuidar a su familia, que para mí es lo fundamental.",
    "Elegí lo que pensaba que sería el camino del éxito: buena universidad, buenas prácticas, primer trabajo en consultoría y luego banca de inversión. Iba cambiando porque lo que tenía idealizado en realidad no lo era. Salté a una multinacional y me mandaron a Chile, pero seguía sintiéndome un granito de arena en una playa enorme. No quería terminar con 65 años en la misma empresa y sin el impacto que buscaba.",
    "Después fui a una startup muy reconocida en España. Fue una gran experiencia, estoy agradecido, pero aún me faltaba algo.",
    "Hice mi primera inversión inmobiliaria tras un curso express. Tuve bastantes errores, pero me fue bien. Probé otra, y otra… luego pedí dinero a mis padres para avanzar más rápido, y así seguí. Para ir todavía más rápido, lo hice con inversores. Y aquí estoy.",
    "Muchos días me sentí solo y confundido, pero a medida que iba creciendo, invirtiendo y equivocándome, más aprendía y más oportunidades surgían.",
    "Si yo, Guillermo, lo pude hacer, ¿por qué tú no? El tiempo no es excusa. Tengo otros dos negocios y sigo pudiendo con esto. Lo único que te detiene es el miedo, y eso se soluciona con formación. Hay que tener claro lo que haces, sobre todo con importes grandes.",
    "Hace 3 años empecé a formar a gente como tú: algunos con poco dinero, otros con patrimonios mayores que el mío, pero lo importante, aunque suene a cliché, era la actitud. Hay alumnos con 6-10 pisos que siguen buscando más. Otros, con un par de inversiones, están satisfechos. El sector inmobiliario te permite invertir de muchas maneras. Tú eliges la que mejor se adapte a ti.",
    "¿Por qué te cuento todo esto?",
    "Para que veas que tú también puedes. No nací en una familia muy adinerada y, aun así, ahora gano mucho mensualmente gracias al sector inmobiliario. Puedes conseguir lo que he logrado yo o más, y mucho más rápido. Si trabajas en algo que no te llena, pero necesitas pagar facturas y darlo todo por tus hijos, hay una SOLUCIÓN. Esto ya está probado con más alumnos: no eres ningún experimento.",
  ],
  courseMessage:
    "Si quieres aprender a invertir en bienes raíces de un profesional, no dudes en echar un vistazo a mi curso. He enumerado todo lo que sé para que puedas replicar las estrategias con tus propias inversiones.",
  imageSrc: "/img/guillermo.jpg",
  imageAlt: "Guillermo Ortiz",
  courseLink: "/course",
};

export default function Story() {
  return (
    <main className="bg-gradient-to-b from-black to-brand-bg1 py-12">
      <Wrapper className="py-0">
        <InnerWrap className="flex flex-col items-center justify-center max-w-4xl text-left text-gray-30">
          <h1 className="w-full mb-3 text-5xl font-semibold text-white text-center">
            {storyContent.title}
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-3 flex flex-col w-full items-center justify-start mt-8">
            <div className="relative flex-col hidden w-full py-12 overflow-hidden aspect-video rounded-xl">
              <Image
                src={storyContent.imageSrc}
                alt={storyContent.imageAlt}
                fill
                className="absolute inset-0"
                style={{ objectFit: "cover" }}
              />
            </div>
            <PersonalStory />
            <div className="flex flex-col w-full gap-4 mt-6 p-8">
              {storyContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-md text-gray-800">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-8 mt-12 text-white bg-slate-900 shadow-lg rounded-xl text-center md:text-left">
            <p className="text-sm">{storyContent.courseMessage}</p>
            <Button
              variant="secondary"
              asChild
              className="px-8 bg-brand-highlight"
            >
              <Link href={storyContent.courseLink}>Ver Curso</Link>
            </Button>
          </div>
        </InnerWrap>
      </Wrapper>
    </main>
  );
}
