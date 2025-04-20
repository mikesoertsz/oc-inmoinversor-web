import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";

const content = {
  title: "Sobre Guillermo Ortiz",
  paragraphs: [
    "Como experto en inversión inmobiliaria y creador de contenido especializado, he construido una comunidad comprometida de más de 10,000 seguidores interesados en el mercado inmobiliario español.",
    "Mi contenido se centra en educación financiera, análisis del mercado inmobiliario y estrategias de inversión, alcanzando a una audiencia cualificada y con alto poder adquisitivo en España.",
    '"Mi objetivo es crear colaboraciones auténticas que aporten valor real a mi audiencia mientras ayudo a las marcas a conectar con inversores potenciales."',
  ],
  image: {
    src: "/img/guillermo.jpg",
    alt: "Guillermo Ortiz",
  },
  quote: {
    text: '"Me especializo en crear contenido que educa e inspira a mi audiencia sobre inversión inmobiliaria, mientras genero resultados medibles para las marcas con las que colaboro."',
    author: "Guillermo Ortiz",
    role: "Creador de Contenido Inmobiliario",
  },
};

export default function SponsorBackground() {
  return (
    <Wrapper className=" py-24">
      <InnerWrap className="border p-12 max-w-6xl rounded-2xl border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-6">
            <h2 className="text-4xl font-medium tracking-tight text-slate-900">
              {content.title}
            </h2>
            <div className="space-y-4 text-lg text-slate-600">
              {content.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 2 ? "font-semibold text-slate-900" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative w-full">
            <div className="relative">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                className="w-full h-full object-cover rounded-xl"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
              <blockquote className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lg font-medium italic">
                  {content.quote.text}
                </p>
                <footer className="mt-2 text-sm">
                  - {content.quote.author}
                  <br />
                  {content.quote.role}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
