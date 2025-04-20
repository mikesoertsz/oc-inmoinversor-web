import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Play } from "lucide-react";

const videoContent = {
  preheading: "Calidad de Contenido",
  heading: "Producción Profesional que Destaca",
  subheading:
    "Nuestros vídeos mantienen a la audiencia enganchada con contenido de alta calidad",
  videoId: "YOUR_YOUTUBE_VIDEO_ID", // Replace with actual video ID
  stats: [
    {
      label: "Duración Media de Visualización",
      value: "8:45 min",
    },
    {
      label: "Engagement Rate",
      value: "12.5%",
    },
  ],
};

export default function SponsorVideoDemo() {
  return (
    <Wrapper className="bg-white py-[10dvh]">
      <InnerWrap className="items-center justify-center max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-medium mb-4 block">
            {videoContent.preheading}
          </span>

          <h2 className="text-4xl font-bold mb-4 tracking-tight text-slate-900">
            {videoContent.heading}
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {videoContent.subheading}
          </p>
        </div>

        <div className="grid lg:grid-cols-6 gap-8 items-center">
          <div className="lg:col-span-4 aspect-video bg-slate-100 rounded-xl overflow-hidden relative group cursor-pointer shadow-sm">
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoContent.videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {videoContent.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-50 p-6 rounded-xl border border-slate-200"
              >
                <div className="text-3xl font-bold text-brand-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
