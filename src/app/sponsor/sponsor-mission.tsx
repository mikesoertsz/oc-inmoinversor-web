import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Rocket, Target } from "lucide-react";

const missionContent = {
  missionTitle: "Misión",
  missionText:
    "Ser la marca líder en educación y asesoramiento de inversión inmobiliaria en mercados hispanohablantes, proporcionando contenido de alta calidad y estrategias prácticas que transformen a inversores principiantes en expertos confiados.",
  visionTitle: "Visión",
  visionText:
    "Empoderar a una nueva generación de inversores inmobiliarios en el mundo hispano, facilitando el acceso al conocimiento y las herramientas necesarias para construir patrimonio y alcanzar la libertad financiera a través de inversiones inmobiliarias inteligentes.",
};

export default function SponsorMission() {
  return (
    <Wrapper className="">
      <InnerWrap className="">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target size={24} className="text-brand-primary" />
              <h2 className="text-2xl font-medium tracking-tight text-slate-900">
                {missionContent.missionTitle}
              </h2>
            </div>
            <div className="space-y-2 text-base text-slate-600">
              <p>{missionContent.missionText}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Rocket size={24} className="text-brand-primary" />
              <h2 className="text-2xl font-medium tracking-tight text-slate-900">
                {missionContent.visionTitle}
              </h2>
            </div>
            <div className="space-y-2 text-base text-slate-600">
              <p>{missionContent.visionText}</p>
            </div>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
