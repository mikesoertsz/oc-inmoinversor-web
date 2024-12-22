import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { Wrapper } from "@/lib/atoms";
import Image from "next/image";
import Marquee from "react-fast-marquee";

type Testimonial = {
  name: string;
  role: string;
  testimonial: string;
  img: string;
};

const defaultTestimonials: Testimonial[] = [
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

type DesireTestimonialsMarqueesProps = {
  testimonials?: Testimonial[];
};

export default function DesireTestimonialsMarquees({
  testimonials = defaultTestimonials,
}: DesireTestimonialsMarqueesProps) {
  return (
    <Wrapper className="py-12 bg-gradient-to-t from-slate-200 to-white">
      <VelocityScroll
        text="Testimonios"
        default_velocity={1}
        className="font-title text-center text-4xl font-bold tracking-[-0.02em] text-slate-400 drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem] opacity-10"
      />
      <Marquee autoFill={true} speed={20} pauseOnHover={true}>
        <ul className="flex items-center justify-center py-8">
          {testimonials.map((testimonial, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-between p-10 bg-white shadow-lg rounded-xl h-[250px] aspect-video mr-4"
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
      </Marquee>
    </Wrapper>
  );
}
