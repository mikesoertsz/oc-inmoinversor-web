import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";

export default function DesireTestimonialsGrid() {
  const testimonials = [
    {
      name: "Luisma",
      role: "",
      testimonial:
        "Este curso me transformó en un mejor inversor, cambiando mi mentalidad tanto profesional como personalmente.",
      img: "/img/testimonials/luisma.png",
    },
    {
      name: "Carlos Miearnau",
      role: "",
      testimonial:
        "Recomiendo el curso por la comunidad que se crea y el apoyo constante de los instructores.",
      img: "/img/testimonials/carlos-miarnau.png",
    },
    {
      name: "Mar",
      role: "",
      testimonial:
        "Este curso ha cambiado mi mentalidad. Ahora siento que soy inversora inmobiliaria y puedo invertir en pisos.",
      img: "/img/testimonials/mar.png",
    },
  ];
  return (
    <Wrapper className="py-12 bg-gradient-to-t from-slate-100 to-white">
      <InnerWrap className="py-0">
        <ul className="grid grid-cols-1 gap-0 border divide-x shadow-lg md:grid-cols-3 divide-slate-200 rounded-xl border-slate-200 bg-white">
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
