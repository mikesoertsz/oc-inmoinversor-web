import { InnerWrap, Wrapper } from "@/lib/atoms";
import AttentionCoursePreview from "./attention-coursepreview";

const heroContent = {
  title: "Masterclass de Inversión Inmobiliaria",
  description:
    "Únete a nuestro curso para aprender estrategias de inversión inmobiliaria y construir un portafolio exitoso.",
  buttonText: "Acceso Instantáneo",
  offerText: "Oferta limitada, precios subirán pronto.",
};

export default function AttentionHero() {
  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-[8dvh]">
      <InnerWrap className="items-center justify-center text-center text-white max-w-4xl">
        <h1 className="text-5xl font-semibold tracking-tight mb-4">
          {heroContent.title}
        </h1>
        <p className="mb-8 text-lg max-w-prose">{heroContent.description}</p>
        <a
          href="#register"
          className="bg-brand-highlight text-black font-medium px-8 py-3 rounded-md mb-4 hover:bg-gray-50 mt-12 transition duration-300 ease-in-out"
        >
          {heroContent.buttonText}
        </a>
        <p className="text-sm opacity-50">{heroContent.offerText}</p>
        <AttentionCoursePreview />
      </InnerWrap>
    </Wrapper>
  );
}
