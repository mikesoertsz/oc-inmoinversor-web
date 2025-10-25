import { InnerWrap, Wrapper } from "@/lib/atoms";
import { FaYoutube } from "react-icons/fa";

const heroContent = {
  title: "Invertir en Bienes Raíces, Compartiendo el Viaje Contigo",
  description:
    "Descubre las últimas estrategias en inversión inmobiliaria a través de nuestro blog y canal de YouTube.",
  imageUrl: "/img/hero.jpg",
  imageAlt: "Perspectivas Inmobiliarias",
  ctas: [
    {
      text: "Ver en YouTube",
      url: "",
      icon: <FaYoutube size={20} className="mr-2 text-sm text-[#FF0000]" />,
    },
  ],
};

export default function Hero() {
  return (
    <Wrapper className="bg-gradient-to-t from-black to-brand-bg1 text-white py-[5dvh]">
      <InnerWrap className="items-center justify-center text-center md:py-[10dvh] py-[5dvh]">
        <h1 className="text-[2rem] sm:text-[2.5rem] leading-[1.35]  md:text-[3.2rem] balanced font-title font-semibold tracking-tighter mb-1 md:leading-[4rem]">
          {heroContent.title}
        </h1>
        <p className="mb-8 text-base md:text-lg max-w-prose pt-2">
          {heroContent.description}
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="https://www.youtube.com/@inmoinversor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-100 text-black px-8 py-4 rounded-md hover:bg-gray-700"
          >
            <FaYoutube size={20} className="mr-2 text-sm text-[#FF0000]" />
            Ver en YouTube
          </a>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
