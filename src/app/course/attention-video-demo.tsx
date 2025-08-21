import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-slate-200">
      <div className="text-slate-500">Cargando video...</div>
    </div>
  ),
});

const videoContent = {
  preheading: "Vista Previa",
  heading: "Aprende con Ejemplos Reales",
  subheading:
    "Descubre cómo analizamos y seleccionamos propiedades rentables a través de casos prácticos.",
  videoId: "UzoSfWMylxQ",
  cta: {
    text: "¿Te gustaría aprender más?",
    buttonText: "Únete al Curso",
  },
};

export default function AttentionVideoDemo() {
  return (
    <Wrapper className="bg-gradient-to-b from-brand-bg1 to-black">
      <InnerWrap className="py-[10dvh] items-center justify-center text-center text-white">
        <span className="text-brand-primary font-medium mb-4 block">
          {videoContent.preheading}
        </span>
        <h2 className="text-4xl font-bold mb-4">{videoContent.heading}</h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          {videoContent.subheading}
        </p>

        <div className="max-w-4xl mx-auto mb-16 aspect-video rounded-xl overflow-hidden">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoContent.videoId}`}
            width="100%"
            height="100%"
            pip
          />
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">{videoContent.cta.text}</h3>
          <Button
            size="lg"
            className="bg-brand-highlight hover:bg-brand-highlight/90"
          >
            {videoContent.cta.buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
