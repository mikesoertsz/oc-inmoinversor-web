import { InnerWrap, Wrapper } from "@/lib/atoms";
import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  quoteshort: string;
  quotelong: string;
  video: string;
  avatar: string;
};

type DesireTestimonialsGridProps = {
  testimonials?: Testimonial[];
};

export default function DesireTestimonialsGrid({
  testimonials = [],
}: DesireTestimonialsGridProps) {
  // Function to select first 3 testimonials (deterministic)
  const getSelectedTestimonials = (testimonials: Testimonial[]) => {
    return testimonials.slice(0, 3);
  };

  const selectedTestimonials = getSelectedTestimonials(testimonials);

  return (
    <Wrapper className="py-12 bg-gradient-to-b from-slate-100 to-white">
      <InnerWrap className="py-0">
        <ul className="grid grid-cols-1 gap-0 border divide-x shadow-lg md:grid-cols-3 divide-slate-200 rounded-xl border-slate-200 bg-white">
          {selectedTestimonials.map((testimonial, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-between p-10"
            >
              <blockquote className="mb-4 text-sm">
                {testimonial.quoteshort}
              </blockquote>
              <div className="flex items-center mt-4">
                <Image
                  src={testimonial.avatar}
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
