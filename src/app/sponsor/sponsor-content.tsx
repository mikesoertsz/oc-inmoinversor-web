import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import {
  Building2,
  Camera,
  Clapperboard,
  FileText,
  Presentation,
  Speech,
  Video,
} from "lucide-react";

const iconSize = 24;

const content = {
  contentTypes: [
    {
      icon: <Video className="text-black" size={iconSize} />,
      title: "Análisis de Propiedades",
      description: "Evaluaciones de propiedades y oportunidades.",
    },
    {
      icon: <Presentation className="text-black" size={iconSize} />,
      title: "Tutoriales",
      description: "Guías sobre inversión y gestión inmobiliaria.",
    },
    {
      icon: <Building2 className="text-black" size={iconSize} />,
      title: "Tours de Propiedades",
      description: "Visitas virtuales a propiedades y reformas.",
    },
    {
      icon: <Camera className="text-black" size={iconSize} />,
      title: "Vlogs",
      description: "Detrás de cámaras y experiencias diarias.",
    },
    {
      icon: <FileText className="text-black" size={iconSize} />,
      title: "Guías y Recursos",
      description: "Documentos y recursos educativos descargables.",
    },
    {
      icon: <Clapperboard className="text-black" size={iconSize} />,
      title: "Series Temáticas",
      description: "Series sobre temas específicos estructurados.",
    },
  ],
  collaborationOpportunities: [
    {
      icon: <Video className="text-black" size={iconSize} />,
      title: "Videos Patrocinados",
      description: "Contenido que presenta su producto naturalmente.",
    },
    {
      icon: <Building2 className="text-black" size={iconSize} />,
      title: "Reseñas de Productos",
      description: "Análisis honestos de productos del sector.",
    },
    {
      icon: <Speech className="text-black" size={iconSize} />,
      title: "Menciones en Videos",
      description: "Integración de su marca en nuestro contenido.",
    },
    {
      icon: <Camera className="text-black" size={iconSize} />,
      title: "Colaboraciones Especiales",
      description: "Proyectos alineados con su marca.",
    },
  ],
};

export default function SponsorContent() {
  return (
    <Wrapper className="bg-gradient-to-t from-black to-black py-24">
      <InnerWrap className="border max-w-6xl rounded-2xl border-slate-200 bg-white shadow-sm py-0">
        <div className="gap-3 border-b flex flex-col items-center justify-start w-full">
          <div className="gap-3 p-12">
            <TitleBlock
              heading="Tipos de Contenido"
              subheading="Creamos contenido diverso y de alta calidad enfocado en el sector inmobiliario."
              theme="light"
              orientation="left"
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 gap-[1px] bg-slate-200 border border-slate-200">
              {content.contentTypes.map((item, i) => (
                <li
                  key={i}
                  className="p-6 bg-white flex flex-col items-start justify-start gap-2"
                >
                  <div className="text-brand-primary">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gap-3 p-12 w-full">
          <TitleBlock
            heading="Oportunidades de Colaboración"
            subheading="Ofrecemos diversas formas de integrar su marca o producto en nuestro contenido."
            theme="light"
            orientation="left"
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-[1px] bg-slate-200 border border-slate-200">
            {content.collaborationOpportunities.map((item, i) => (
              <li
                key={i}
                className="p-6 bg-white flex flex-col items-start justify-start gap-2"
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
