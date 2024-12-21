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
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col text-center items-center justify-center gap-2 mt-4">
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
          <p className="text-sm">{testimonial.quote}</p>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
