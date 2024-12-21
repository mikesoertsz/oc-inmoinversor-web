import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";

export default function DesireTestimonialsGrid() {
  const testimonials = [
    {
      name: "Luisma",
      role: "",
      testimonial:
        "Este curso me cambió la mentalidad sobre las inversiones, transformándome en un mejor inversor tanto profesional como personalmente. Me han cambiado totalmente la mentalidad de respeto las inversiones, respeto a tu espetal mismo, me he hecho cambiar muchas falsetas de mi vida en cuanto a profesional y a personal, para precisamente poder llevar a ser un buen inversor.",
      img: "/img/testimonials/luisma.png",
    },
    {
      name: "Carlos Miearnau",
      role: "",
      testimonial:
        "Recomiendo el curso por la experiencia de comunidad que se crea y el apoyo constante de los instructores. Lo que más me ha gustado del curso es el grupo que se crea, ya que considero que es una comunidad. Hemos tenido un grupo de las ventias personas que hemos participado, pasamos oportunidades cada una, cada día noticias, entonces el cine estamos muy en contacto.",
      img: "/img/testimonials/carlos-miearnau.png",
    },
    {
      name: "Mar",
      role: "",
      testimonial:
        "Este curso ha cambiado mi mentalidad. Ahora siento que soy inversora inmobiliaria, ahora siento que de verdad puedo invertir en pisos de hecho, ya hemos empezado a hacerlo y que esto es lo que yo quería.",
      img: "/img/testimonials/mar.png",
    },
  ];
  return (
    <Wrapper className="py-12 bg-gradient-to-t from-slate-100 to-white">
      <InnerWrap className="py-0">
        <ul className="grid grid-cols-1 gap-0 border divide-x shadow-lg md:grid-cols-3 divide-slate-200 rounded-xl border-slate-300">
          {testimonials.map((testimonial, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-between p-10"
            >
              <blockquote className="mb-4 text-sm">
                {testimonial.testimonial}
              </blockquote>
              <div className="flex items-center mt-4">
                <Image
                  src={testimonial.img}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="mr-3 overflow-hidden rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
