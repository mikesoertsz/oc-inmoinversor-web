
import { Button } from "@/components/ui/button";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historia de Guillermo Ortiz | Inversiones Inmobiliarias",
  description:
    "Descubre la historia de Guillermo Ortiz y su camino en las inversiones inmobiliarias. Aprende cómo puedes seguir sus pasos y tener éxito en el sector.",
};

const storyContent = {
  title: "Historia de Guillermo Ortiz",
  paragraphs: [
    "Empecé desde muy pequeño expuesto a mucho lujo, porque fui a los mejores colegios en Madrid y en Estados Unidos. A pesar de que mi familia era media clase, siempre estuve rodeado de gente de muy alta clase. Tuve esa suerte.",
    "Desde pequeño siempre quería poder aspirar a eso pero con una condición, que tuviese también el tiempo libre. Veia que muchas familias estaban destructuradas porque los padres “solo” trabajaban y no le dedicaban el tiempo necesario a su familia, que para mi es lo fundamental.",
    "Eligé lo que pensaba que seria el camino del éxito. Buena universidad, buenas prácticas, primer trabajo en consultoria para acabar poco después en banca de inversión. Iba cambiando porque lo que yo tenia idealizado en verda no lo era. Me cambíe a una multinacional, me mandaron fuera para un proyecto a Chile, pero aún no me llenaba, me sentia un granito de arena en una playa gigantesca. Y no, no queria terminar con 65 años en una misma empresa para poder tener ese impacto que buscaba.",
    "Termine yendo a una startup de las más reconocidas de España, experiencia inolvidable, muy agradecido pero algo me faltaba.",
    "Empecé con mi primer inversión inmobiliaria después de hacer un curso de inversiones inmobiliarias express. Probé con la primera y a pesar de que tuve bastantes errores (las de los principiantes), me fue bien. Hice otra, y otra, y otra, y ya le pedí dinero a mis padres para ir más rápido, y asi seguí. Para ir aún más rápido lo hice con inversores, y aqui estoy…",
    "Muchos dias me he sentido sólo, un poco confuso, pero a medida que vas creciendo, y realizando inversiones y confudiendote, más aprendes, y más oportunidades surgen.",
    "Si yo Guillermo, lo pude hacer porque no tu? El tiempo no es excusa, (tengo otros dos negocios, y sigo pudiendo hacer esto). Lo único que te para es el miedo, y eso sólo se solventa con formación (tener claro lo que estas haciendo, sobretodo con importes de dinero elevados).",
    "Empecé hace 3 años formando a más gente como vosotros (algunos con poco dinero, otros con un patrimonio mucho mayor al mio, pero lo importante y suena a cliché era la actitud). Hay algunos que ya tienen 6-10 pisos, y siguen queriendo más. Hay otros que con dos inversiones les servia, y es que el sector inmobiliario te permite invertir de muchas formas, y tienes que elegir la que mejor se adapta a ti.",
    "Y por que te cuento todo este rollo?",
    "Pues para que veas, que tu también puedes. No soy ningún extraterrestre, no nací en una familia muy adinerada, y ahora gano mucho dinero mensualmente, exclusivamente con el sector inmobiliario. Tu puedes conseguir lo que he conseguido yo incluso como mucho otros alumnos mucho más rápido y mucho más. Si tu estas trabajando en un trabajo que no te llena, pero que tienes que estar ahi para pagar “tus facturas” y si tienes hijos darles todo, hay una SOLUCIÓN. Esto ya esta probado con otros alumnos y no vas a ser el “experimento”, el experimento ya esta probado con éxito.",
  ],
  courseMessage:
    "Si quieres aprender a invertir en bienes raíces de un profesional, no dudes en echar un vistazo a mi curso. He enumerado todo lo que sé para que puedas replicar las estrategias con tus propias inversiones.",
  imageSrc: "/img/guillermo.jpg",
  imageAlt: "Guillermo Ortiz",
  courseLink: "/course",
};

export default function Story() {
  return (
    <main className="flex flex-col w-full h-full bg-slate-900">
      <Wrapper className="py-[5dvh]">
        <InnerWrap className="flex flex-col max-w-3xl text-left text-gray-30">
          <div className="flex items-center justify-start w-full my-12">
            <Image
              src={storyContent.imageSrc}
              alt={storyContent.imageAlt}
              width={60}
              height={60}
              className="mr-6 overflow-hidden rounded-full"
            />
            <div>
              <p className="text-lg font-medium text-white">Guillermo Ortiz</p>
              <p className="text-gray-500 text-md">Instructor</p>
            </div>
          </div>
          <h1 className="w-full mb-3 text-6xl font-semibold text-white">
            {storyContent.title}
          </h1>
          <div className="relative flex-col hidden w-full py-12 overflow-hidden aspect-video rounded-xl">
            <Image
              src={storyContent.imageSrc}
              alt={storyContent.imageAlt}
              fill
              className="absolute inset-0"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col w-full gap-4 mt-6">
            {storyContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center justify-between gap-12 p-8 my-4 mt-12 text-white bg-slate-800 rounded-xl">
            <p className="text-sm">{storyContent.courseMessage}</p>
            <Button variant="secondary" asChild>
              <Link href={storyContent.courseLink}>View Course</Link>
            </Button>
          </div>
        </InnerWrap>
      </Wrapper>
    </main>
  );
}
