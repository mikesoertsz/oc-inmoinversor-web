import { InnerWrap, Wrapper } from "@/lib/atoms";
// import AttentionCoursePreview from "./attention-coursepreview";

const heroContent = {
  title: "Curso de Inversión Inmobiliaria",
  description:
    "Únete a nuestro curso para aprender estrategias de inversión inmobiliaria y construir un portafolio exitoso.",
  buttonText: "Acceso Instantáneo",
  offerText: "Oferta limitada, precios subirán pronto.",
};

export default function AttentionHero() {
  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-[8dvh]">
      <InnerWrap className="items-center justify-center max-w-4xl text-center text-white">
        <h1 className="mb-4 text-5xl font-semibold tracking-tight">
          {heroContent.title}
        </h1>
        <p className="mb-8 text-lg max-w-prose">{heroContent.description}</p>
        <a
          href="#register"
          className="px-8 py-3 mt-12 mb-4 font-medium text-black transition duration-300 ease-in-out rounded-md bg-brand-highlight hover:bg-gray-50"
        >
          {heroContent.buttonText}
        </a>
        <p className="text-sm opacity-50">{heroContent.offerText}</p>
        {/* <AttentionCoursePreview /> */}
      </InnerWrap>
    </Wrapper>
  );
}
