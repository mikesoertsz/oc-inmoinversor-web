import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";
import { Users, Trophy, Target, Star } from "lucide-react";

const influencerContent = {
  title: "Conoce a Guillermo Ortiz",
  description: [
    "Con más de 8 años de experiencia en el sector inmobiliario, he pasado de ser un inversor novato a gestionar una cartera significativa de propiedades y ayudar a cientos de personas a alcanzar sus objetivos de inversión.",
    "Mi viaje comenzó como el de muchos: con dudas, miedos y muchas preguntas. Pero a través de estudio constante, experiencia práctica y aprendizaje de mis errores, he desarrollado un sistema probado para invertir con éxito en el mercado inmobiliario español.",
    '"Mi misión es compartir este conocimiento contigo, evitarte los errores que yo cometí, y guiarte hacia el éxito en tus inversiones inmobiliarias."',
  ],
  stats: [
    {
      icon: <Users />,
      value: "10K+",
      label: "Seguidores en redes sociales",
    },
    {
      icon: <Trophy />,
      value: "50+",
      label: "Propiedades gestionadas",
    },
    {
      icon: <Target />,
      value: "8+",
      label: "Años de experiencia",
    },
    {
      icon: <Star />,
      value: "100+",
      label: "Inversores asesorados",
    },
  ],
  image: {
    src: "/img/guillermo.jpg",
    alt: "Guillermo Ortiz",
  },
  quote: {
    text: "La inversión inmobiliaria no se trata solo de comprar propiedades; se trata de construir un futuro financiero sólido y ayudar a otros a hacer lo mismo.",
    author: "Guillermo Ortiz, Fundador de InmoInversor",
  },
};

export default function InfluencerBackground() {
  return (
    <Wrapper className="bg-gradient-to-b from-brand-bg1 to-black">
      <InnerWrap className="py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              {influencerContent.title}
            </h2>
            <div className="space-y-4 text-lg text-slate-300">
              {influencerContent.description.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 2 ? "font-semibold text-white" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              {influencerContent.stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-brand-primary">
                      {stat.icon}
                    </div>
                    <span className="text-2xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-primary/20 to-brand-highlight/20 rounded-xl blur-xl" />
            <div className="relative">
              <Image
                src={influencerContent.image.src}
                alt={influencerContent.image.alt}
                className="w-full h-[600px] object-cover rounded-xl"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
              <blockquote className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-lg font-medium italic">
                  {influencerContent.quote.text}
                </p>
                <footer className="mt-2 text-sm">
                  - {influencerContent.quote.author}
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
