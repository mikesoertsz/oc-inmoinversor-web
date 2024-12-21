import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";

type Testimonial = {
  avatar: string;
  name: string;
  quote: string;
};

const defaultTestimonialContent: Testimonial = {
  avatar: "/img/testimonials/amaia.png",
  name: "Amaia",
  quote:
    "El curso de Invacter Concentido tiene mucho valor y significado. El mensaje que nos han transmitido me ha ayudado mucho, y el grupo que hemos formado es espectacular. Muchas gracias a Aguilar Moya Germania por todo.",
};

type DesireTestimonialSingleProps = {
  testimonial?: Testimonial;
};

export default function DesireTestimonialSingle({
  testimonial = defaultTestimonialContent,
}: DesireTestimonialSingleProps) {
  return (
    <Wrapper>
      <InnerWrap>
        <div className="flex items-center justify-center relative rounded-full overflow-hidden w-14 h-14 border-4 shadow-md border-white">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="absolute inset-0"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col text-center items-center justify-center gap-2 mt-4 max-w-prose">
          <h3 className="text-lg font-semibold">{testimonial.name}</h3>
          <div className="flex">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <span key={i} className="text-yellow-500">
                  ★
                </span>
              ))}
          </div>
          <p className="text-sm leading-relaxed">{testimonial.quote}</p>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
