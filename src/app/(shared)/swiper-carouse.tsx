"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Wrapper } from "@/lib/atoms";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  description: string;
  url: string;
  type: string;
  img: string;
  imageWidth: number;
  imageHeight: number;
  linkText?: string;
  centered?: boolean;
};

type SwiperCarouselProps = {
  slides: Slide[];
  breakpoints?: Record<number, { slidesPerView: number }>;
  navigationClasses?: {
    next: string;
    prev: string;
  };
};

const defaultBreakpoints = {
  480: { slidesPerView: 1.5 },
  780: { slidesPerView: 2.03 },
  990: { slidesPerView: 3.1 },
  1380: { slidesPerView: 3.2 },
};

const defaultNavigationClasses = {
  next: "custom-next",
  prev: "custom-prev",
};

export default function SwiperCarousel({
  slides,
  breakpoints = defaultBreakpoints,
  navigationClasses = defaultNavigationClasses,
}: SwiperCarouselProps) {
  const [currentWidth, setCurrentWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setCurrentWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Wrapper className="relative w-full py-24">
      <div className="max-w-[1380px] mx-auto overflow-visible relative py-10">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={breakpoints}
          navigation={{
            nextEl: `.${navigationClasses.next}`,
            prevEl: `.${navigationClasses.prev}`,
          }}
          className="h-auto pb-10 !overflow-visible mt-20"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title} className="h-auto" style={{ height: "auto" }}>
              <div className="w-auto h-full p-2 bg-[#eef1f3] border border-[#e6e8ec] rounded-lg transition-shadow duration-300 hover:shadow-custom cursor-pointer">
                <div className="flex flex-col h-full w-full p-4 bg-white border border-[#e6e8ec] rounded relative">
                  <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                    {slide.type === "youtube" ? (
                      <ReactPlayer
                        url={slide.url}
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                      />
                    ) : (
                      <Image
                        src={slide.img}
                        alt={slide.title}
                        width={slide.imageWidth}
                        height={slide.imageHeight}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold leading-tight tracking-tight mb-4">
                        {slide.title}
                      </h3>
                      <p className="text-base font-medium leading-relaxed mb-4">
                        {slide.description}
                      </p>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="group inline-flex items-center text-base font-medium hover:underline mt-4 text-[.87rem]"
                      >
                        {slide.linkText || "Learn more"}
                        <ChevronRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute flex gap-2 top-10 right-2 z-40">
          <button
            className={`border px-1 py-2 border-gray-300 rounded-sm flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent z-10 ${navigationClasses.prev}`}
          >
            <span className="sr-only">Previous slide</span>
            <ChevronLeft className="w-auto h-6" />
          </button>
          <button
            className={`border px-1 py-2 border-gray-300 rounded-sm flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent z-10 ${navigationClasses.next}`}
          >
            <span className="sr-only">Next slide</span>
            <ChevronRight className="w-auto h-6" />
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
