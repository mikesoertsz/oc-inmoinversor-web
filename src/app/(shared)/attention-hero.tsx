import { InnerWrap, Wrapper } from "@/lib/atoms";
import { FaYoutube } from "react-icons/fa";

const heroContent = {
  title: "Invertir en Bienes Raíces, Compartiendo el Viaje Contigo",
  description:
    "Descubre las últimas estrategias en inversión inmobiliaria a través de nuestro blog y canal de YouTube.",
  imageUrl: "/img/hero.jpg",
  imageAlt: "Perspectivas Inmobiliarias",
};

export default function Hero() {
  return (
    <Wrapper className="bg-slate-100 py-[5dvh]">
      <InnerWrap className="items-start justify-center">
        <h1 className="text-[3.7rem] font-title font-semibold tracking-tighter mb-1 leading-[4rem]">
          {heroContent.title}
        </h1>
        <p className="mb-8 text-lg max-w-prose pt-2">
          {heroContent.description}
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="https://www.youtube.com/@Inmoinversores"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            <FaYoutube className="mr-2" />
            Ver en YouTube
          </a>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
