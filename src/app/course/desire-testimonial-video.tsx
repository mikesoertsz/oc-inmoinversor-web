"use client";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import clsx from "clsx";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-200">
      <div className="text-slate-500">Cargando video...</div>
    </div>
  ),
});

type Testimonial = {
  avatar: string;
  name: string;
  quoteshort: string;
  quotelong: string;
  video: string;
};

const defaultTestimonialContent: Testimonial = {
  avatar: "/img/testimonials/jose-lopez.png",
  name: "Jose Lopez",
  quoteshort:
    "Desde el principio me sirvió mucho, aprendí creo que todo el necesario para empezar a invertir, luego además tuve toda la ayuda personal de Guillermo a la hora de tomar la decisión.",
  quotelong: "",
  video: "/vids/jose_1.mp4", // Local video URL
};

type DesireTestimonialSingleProps = {
  testimonial?: Testimonial;
  videoPosition?: "left" | "right";
};

export default function DesireTestimonialVideo({
  testimonial = defaultTestimonialContent,
  videoPosition = "left",
}: DesireTestimonialSingleProps) {
  return (
    <Wrapper className="py-0">
      <InnerWrap className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div
            className={clsx(
              "w-full aspect-video overflow-hidden rounded-xl shadow-md border-white col-span-2 border-4 relative",
              {
                "order-1": videoPosition === "left",
                "order-2": videoPosition === "right",
              }
            )}
          >
            <ReactPlayer url={testimonial.video} width="100%" height="100%" />
          </div>
          <div
            className={clsx(
              "flex flex-col text-left items-start justify-center gap-2 max-w-prose bg-white rounded-lg shadow-md p-4 px-8 h-full",
              {
                "order-2": videoPosition === "left",
                "order-1": videoPosition === "right",
              }
            )}
          >
            <div className="flex items-center justify-start relative rounded-full overflow-hidden w-14 h-14 border-4 shadow-md border-white">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="absolute inset-0"
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3 className="text-base font-semibold">{testimonial.name}</h3>
            <div className="flex">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              {testimonial.quoteshort}
            </p>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
