import { InnerWrap, Wrapper } from "@/lib/atoms";
import AttentionCoursePreview from "./attention-coursepreview";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
// import AttentionCoursePreview from "./attention-coursepreview";

const heroContent = {
  title: "Curso de Inversión Inmobiliaria",
  description:
    "Únete a nuestro curso para aprender estrategias de inversión inmobiliaria y construir un portafolio exitoso.",
  buttonText: "Empezar ahora",
  offerText: "Oferta limitada, precios subirán pronto.",
};

export default function AttentionHero() {
  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 pt-[5dvh]">
      <InnerWrap className="items-center justify-center max-w-4xl text-center text-white">
        <h1 className="mb-4 text-5xl font-semibold tracking-tight">
          {heroContent.title}
        </h1>
        <p className="mb-8 text-lg max-w-prose">{heroContent.description}</p>
        <a
          href="#register"
          className="px-12 py-4 mt-12 mb-4 font-medium text-black transition duration-300 ease-in-out rounded-md bg-brand-highlight hover:bg-gray-50"
        >
          {heroContent.buttonText}
        </a>
        <p className="text-sm opacity-80">{heroContent.offerText}</p>
        <AttentionCoursePreview />
      </InnerWrap>
      <VelocityScroll
        text="FULLLLL"
        default_velocity={1}
        className="font-title text-center text-6xl font-black tracking-[-0.02em] text-brand-highlight drop-shadow-sm dark:text-brand-highlight md:text-9xl md:leading-[8rem] opacity-100"
      />
    </Wrapper>
  );
}
