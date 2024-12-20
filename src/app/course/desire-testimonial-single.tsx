import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";

type Testimonial = {
  avatar: string;
  name: string;
  quote: string;
};

const defaultTestimonialContent: Testimonial = {
  avatar: "/img/guillermo.jpg",
  name: "John Doe",
  quote: "This is a default testimonial quote.",
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
