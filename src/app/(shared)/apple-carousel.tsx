"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Wrapper } from "@/lib/atoms";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-200">
      <div className="text-slate-500">Cargando video...</div>
    </div>
  ),
});

type Slide = {
  title: string;
  description: string;
  url: string;
  type: string;
  img: string;
  imageWidth: number;
  imageHeight: number;
  centered?: boolean;
};

type AppleCarouselProps = {
  slides?: Slide[];
};

const defaultSlides: Slide[] = [
  {
    title: "One Tap Setup",
    description: "Easily set up your device with a single tap.",
    url: "https://www.youtube.com/watch?v=h34shkm9xJ8",
    type: "youtube",
    img: "/img/episode/slug-title.jpeg", //thumbnail
    imageWidth: 343,
    imageHeight: 375,
  },
  {
    title: "Personalized Spatial Audio",
    description: "Experience audio tailored just for you.",
    url: "https://www.youtube.com/watch?v=z1ZhSrPrbWY",
    type: "youtube",
    img: "/slide-img/spatial-audio.jpeg",
    imageWidth: 211,
    imageHeight: 375,
  },
  {
    title: "Audio Sharing",
    description: "Share your audio with friends effortlessly.",
    url: "https://www.youtube.com/watch?v=7UvPN9VE9jY",
    type: "youtube",
    img: "/slide-img/audio-sharing.jpeg",
    imageWidth: 265,
    imageHeight: 352,
    centered: true,
  },
  {
    title: "Automatic Switching",
    description: "Seamlessly switch between devices.",
    url: "https://www.youtube.com/watch?v=XSa2mRzyW2c",
    type: "youtube",
    img: "/slide-img/automatic-switching.jpeg",
    imageWidth: 336,
    imageHeight: 100,
    centered: true,
  },
  {
    title: "Siri",
    description: "Use Siri to control your devices hands-free.",
    url: "https://www.youtube.com/watch?v=XSa2mRzyW2c",
    type: "youtube",
    img: "/slide-img/siri.jpeg",
    imageWidth: 168,
    imageHeight: 168,
    centered: true,
  },
  {
    title: "Accessibility",
    description: "Features designed for everyone.",
    url: "https://www.youtube.com/watch?v=XSa2mRzyW2c",
    type: "youtube",
    img: "/slide-img/a11y.jpeg",
    imageWidth: 135,
    imageHeight: 135,
    centered: true,
  },
];

const slideWidth = 400;
const slideMargin = 20;

const scrollToSlide = (slider: HTMLUListElement | null, slideIndex: number) => {
  if (!slider) return;
  slider.scrollTo({
    left: slideIndex * (slideWidth + slideMargin),
    behavior: "smooth",
  });
};

export default function AppleCarousel({
  slides = defaultSlides,
}: AppleCarouselProps) {
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState(0);

  const currentSlide = useMemo(() => {
    return Math.floor(sliderPosition / (slideWidth + slideMargin));
  }, [sliderPosition]);

  const scrolledToEndOfSlider = useMemo(() => {
    if (!sliderRef.current) return false;
    return (
      sliderRef.current.scrollWidth -
        sliderRef.current.scrollLeft -
        sliderRef.current.clientWidth ===
      0
    );
  }, []);

  const goToNextSlide = useCallback(() => {
    scrollToSlide(sliderRef.current, currentSlide + 1);
  }, [currentSlide]);

  const goToPreviousSlide = useCallback(() => {
    scrollToSlide(sliderRef.current, currentSlide - 1);
  }, [currentSlide]);

  return (
    <Wrapper className="py-24">
      <div className="h-[400px] overflow-hidden">
        <ul
          ref={sliderRef}
          onScroll={(ev) => {
            setSliderPosition(ev.currentTarget.scrollLeft);
          }}
          className="flex h-[440px] pb-10 overflow-x-auto snap-x snap-mandatory gap-4"
        >
          {slides.map((slide) => (
            <li className="snap-start snap-always shrink-0" key={slide.title}>
              <div className="slide-center relative flex flex-col w-[400px] rounded-2xl">
                {slide.type === "youtube" ? (
                  <div className="aspect-video rounded-2xl overflow-hidden border border-white hover:shadow-md transition transform duration-300 ease-in-out">
                    <ReactPlayer url={slide.url} width="100%" height="100%" />
                  </div>
                ) : (
                  <div
                    className={classNames(
                      "flex h-full justify-center",
                      slide.centered ? "items-center" : "items-start"
                    )}
                  >
                    <Image
                      src={slide.img}
                      alt={slide.title}
                      width={slide.imageWidth}
                      height={slide.imageHeight}
                    />
                  </div>
                )}
                <h3 className="mt-auto text-xl font-semibold pt-4">
                  {slide.title}
                </h3>
                <p className="text-sm text-gray-500">{slide.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        <button
          disabled={currentSlide === 0}
          onClick={() => goToPreviousSlide()}
          className="disabled:text-gray-400 disabled:border-gray-400 w-8 h-8 border-2 border-black rounded-full flex items-center justify-center mr-2 hover:bg-slate-200"
        >
          <span className="sr-only">Previous slide</span>
          <ChevronLeft
            className="hover:bg-slate-200"
            size={18}
            strokeWidth={2.5}
          />
        </button>
        <button
          disabled={scrolledToEndOfSlider || currentSlide === slides.length}
          onClick={() => goToNextSlide()}
          className="disabled:text-gray-400 disabled:border-gray-400  w-8 h-8 border-2 border-black rounded-full flex items-center justify-center hover:bg-slate-200"
        >
          <span className="sr-only">Next slide</span>
          <ChevronRight
            className="hover:bg-slate-200"
            size={18}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </Wrapper>
  );
}
