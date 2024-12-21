import { InnerWrap, Wrapper } from "@/lib/atoms";
import Marquee from "react-fast-marquee";
import Image from "next/image";

type Testimonial = {
  avatar: string;
  name: string;
  quoteshort: string;
};

const testimonials: Testimonial[] = [
  {
    avatar: "",
    name: "Luisma",
    quoteshort:
      "Este curso me cambió la mentalidad sobre las inversiones, transformándome en un mejor inversor tanto profesional como personalmente.",
  },
  {
    avatar: "",
    name: "Carlos Niearnau",
    quoteshort:
      "Recomiendo el curso por la experiencia de comunidad que se crea y el apoyo constante de los instructores.",
  },
];

export default function DesireTestimonialsMany() {
  return (
    <Wrapper>
      <InnerWrap>
        <Marquee gradient={false} direction="left">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-center mx-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm">{testimonial.quoteshort}</p>
              </div>
            </div>
          ))}
        </Marquee>
        <Marquee gradient={false} direction="right">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-center mx-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm">{testimonial.quoteshort}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </InnerWrap>
    </Wrapper>
  );
}
