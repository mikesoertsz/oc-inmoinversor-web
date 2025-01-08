import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import { Wrapper } from "@/lib/atoms";
import Image from "next/image";
import Marquee from "react-fast-marquee";

type Testimonial = {
  name: string;
  role: string;
  quoteshort: string;
  quotelong: string;
  video: string;
  avatar: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    name: "Luisma",
    role: "",
    quoteshort:
      "Este curso me transformó en un mejor inversor, cambiando mi mentalidad tanto profesional como personalmente.",
    quotelong: "",
    video: "",
    avatar: "/img/testimonials/luisma.png",
  },
  {
    name: "Carlos Miearnau",
    role: "",
    quoteshort:
      "Recomiendo el curso por la comunidad que se crea y el apoyo constante de los instructores.",
    quotelong: "",
    video: "",
    avatar: "/img/testimonials/carlos-miarnau.png",
  },
  {
    name: "Mar",
    role: "",
    quoteshort:
      "Este curso ha cambiado mi mentalidad. Ahora siento que soy inversora inmobiliaria y puedo invertir en pisos.",
    quotelong: "",
    video: "",
    avatar: "/img/testimonials/mar.png",
  },
];

type DesireTestimonialsMarqueesProps = {
  testimonials?: Testimonial[];
};

export default function DesireTestimonialsMarquees({
  testimonials = defaultTestimonials,
}: DesireTestimonialsMarqueesProps) {
  return (
    <Wrapper className="py-12 bg-gradient-to-t from-slate-200 to-white px-0">
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
              className="flex flex-col items-start justify-between p-10 bg-white shadow-lg rounded-xl h-[370px] w-[380px] mr-4"
            >
              <blockquote className="mb-4 text-sm grow flex h-full">
                {testimonial.quoteshort}
              </blockquote>
              <div className="flex items-center mt-4 gap-4">
                <div className="flex items-center justify-center w-9 h-9 overflow-hidden rounded-full relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="absolute inset-0"
                    style={{ objectFit: "cover" }}
                  />
                </div>
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
