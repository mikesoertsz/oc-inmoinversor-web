import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import {
  Activity,
  BarChart,
  Check,
  Clock,
  Eye,
  Heart,
  TrendingUp,
  Users,
} from "lucide-react";

const iconSize = 24;

export default function SponsorInfo() {
  const content = {
    channelStats: [
      {
        icon: <Users className="text-black" size={iconSize} />,
        value: "8,600+",
        label: "Suscriptores",
      },
      {
        icon: <Eye className="text-black" size={iconSize} />,
        value: "500,000+",
        label: "Visualizaciones totales",
      },
      {
        icon: <TrendingUp className="text-black" size={iconSize} />,
        value: "35%",
        label: "Crecimiento anual",
      },
    ],
    missionText:
      "Nuestra misión es educar y empoderar a los espectadores con conocimientos prácticos sobre inversión inmobiliaria, renovaciones, financiamiento y estrategias para maximizar el retorno de inversión.",
    audienceDetails: [
      {
        title: "Demografía",
        items: [
          "65% hombres, 35% mujeres",
          "Edad principal: 30-50 años",
          "85% de España, 15% internacional (principalmente Latinoamérica)",
          "Ingresos medios-altos",
          "Profesionales, empresarios e inversores",
        ],
      },
      {
        title: "Intereses",
        items: [
          "Inversión inmobiliaria",
          "Reformas y renovaciones",
          "Decoración y diseño de interiores",
          "Finanzas y préstamos hipotecarios",
          "Alquileres vacacionales y gestión de propiedades",
        ],
      },
    ],
    audienceEngagement: [
      {
        icon: <BarChart className="text-black" size={iconSize} />,
        value: "15,000+",
        label: "Visualizaciones mensuales",
      },
      {
        icon: <Clock className="text-black" size={iconSize} />,
        value: "7.5min",
        label: "Tiempo de visualización",
      },
      {
        icon: <Heart className="text-black" size={iconSize} />,
        value: "12%",
        label: "Tasa de interacción",
      },
      {
        icon: <Activity className="text-black" size={iconSize} />,
        value: "65%",
        label: "Tasa de retención",
      },
    ],
  };

  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-24">
      <InnerWrap className="border max-w-6xl rounded-2xl border-slate-200 bg-white shadow-sm py-0">
        <div className="gap-3 border-b flex flex-col items-center justify-start w-full">
          <div className="gap-3 p-12">
            <TitleBlock
              heading="Acerca de Nuestro Canal"
              body="InmoInversor es un canal de YouTube líder en contenido sobre inversión inmobiliaria en España, alcanzando a miles de inversores actuales y potenciales cada semana."
              theme="light"
              orientation="left"
            />

            <div className="p-3 px-6 rounded-md bg-brand-primary/50 border border-brand-primary/10 mt-6">
              <p className="text-sm text-black">{content.missionText}</p>
            </div>
          </div>
        </div>

        <div className="gap-3 p-12">
          <TitleBlock
            heading="Nuestra Audiencia"
            subheading="El contenido de InmoInversor atrae a un público específico y altamente comprometido, interesado en invertir y mejorar propiedades inmobiliarias."
            theme="light"
            orientation="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-body w-full mt-12">
            {content.audienceDetails.map((detail, index) => (
              <div key={index} className="gap-3">
                <h3 className="text-md font-semibold text-slate-900">
                  {detail.title}
                </h3>

                <ul className="gap-4 mt-2">
                  {detail.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-brand-primary flex-shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-slate-200 border border-slate-200 w-full col-span-3 mt-6">
              {content.channelStats.map((stat, index) => (
                <li
                  key={index}
                  className="p-6 bg-white flex flex-col items-start justify-start gap-2"
                >
                  {stat.icon}
                  <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                    {stat.value}
                  </h3>
                  <p className=" text-sm uppercase text-brand-bg1 font-semibold">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-slate-200 border border-slate-200 w-full col-span-3 border-t-0">
            {content.audienceEngagement.map((engagement, index) => (
              <li
                key={index}
                className="p-6 bg-white flex flex-col items-start justify-start gap-2"
              >
                {engagement.icon}
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {engagement.value}
                </h3>

                <p className="text-brand-bg1 uppercase text-sm font-semibold">
                  {engagement.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
