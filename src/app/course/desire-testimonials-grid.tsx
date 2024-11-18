import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";

export default function DesireTestimonialsGrid() {
  const testimonials = [
    {
      name: "María López",
      role: "Agente Inmobiliario",
      testimonial:
        "Guillermo es un experto y hace que aprender sea muy fácil. Recomiendo este curso a todos.",
      img: "/img/testimonials/avatar-4.png",
    },
    {
      name: "Carlos García",
      role: "Empresario",
      testimonial:
        "El valor que obtuve de este curso es inigualable. Ahora tengo una estrategia clara para invertir en bienes raíces.",
      img: "/img/testimonials/avatar-2.png",
    },
    {
      name: "Ana Martínez",
      role: "Consultora",
      testimonial:
        "Este curso transformó mi forma de ver las inversiones inmobiliarias. He logrado resultados sorprendentes.",
      img: "/img/testimonials/avatar-3.png",
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
