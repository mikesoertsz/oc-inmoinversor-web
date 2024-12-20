import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InnerWrap, Wrapper } from "@/lib/atoms";
import { TitleBlock } from "@/components/ui/titleblock";

type FAQContent = {
  title: string;
  description: string;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
  footer: {
    message: string;
    contact: string;
    buttonText: string;
  };
};

const defaultFaqContent: FAQContent = {
  title: "Preguntas Frecuentes",
  description:
    "Explora respuestas a preguntas comunes sobre la inversión inmobiliaria en España para guiar tu camino.",
  questions: [
    {
      id: "item-1",
      question: "¿Qué temas se tratan en el canal de YouTube?",
      answer:
        "Nuestro canal de YouTube cubre una amplia gama de temas, incluyendo análisis de mercado, estrategias de inversión, consejos de gestión de propiedades y entrevistas con expertos en bienes raíces en España.",
    },
    {
      id: "item-2",
      question: "¿Cómo puedo empezar a invertir en bienes raíces en España?",
      answer:
        "Para comenzar a invertir en bienes raíces en España, mira nuestra serie de guías para principiantes en YouTube. Cubre todo, desde entender el mercado hasta encontrar la propiedad adecuada y asegurar financiación.",
    },
    {
      id: "item-3",
      question: "¿Cuáles son los beneficios de suscribirse al canal?",
      answer:
        "Al suscribirte a nuestro canal, tendrás acceso a los últimos vídeos sobre tendencias inmobiliarias, oportunidades de inversión y consejos de expertos. Mantente informado y toma mejores decisiones de inversión.",
    },
    {
      id: "item-4",
      question:
        "¿Puedo obtener asesoramiento personalizado a través del canal?",
      answer:
        "Aunque nuestros vídeos ofrecen consejos generales, puedes contactarnos para consultas personalizadas. También organizamos sesiones de preguntas y respuestas en vivo donde puedes hacer preguntas específicas sobre tus planes de inversión.",
    },
    {
      id: "item-5",
      question: "¿Con qué frecuencia se sube nuevo contenido?",
      answer:
        "Subimos nuevo contenido semanalmente, incluyendo actualizaciones de mercado, consejos de inversión y entrevistas con profesionales del sector. Asegúrate de suscribirte y activar la campana de notificaciones para mantenerte actualizado.",
    },
  ],
  footer: {
    message: "¿Todavía tienes preguntas?",
    contact: "Contáctanos para obtener asesoramiento y apoyo personalizado.",
    buttonText: "Contacto",
  },
};

interface FAQProps {
  faqContent?: FAQContent;
}

export default function FAQ({ faqContent = defaultFaqContent }: FAQProps) {
  return (
    <Wrapper className="py-[0dvh]">
      <InnerWrap>
        <div className="flex w-full flex-col item-center justify-center max-w-3xl  text-center">
          <TitleBlock
            heading={faqContent.title}
            body={faqContent.description}
            theme="light"
            orientation="center"
          />
          <Accordion
            type="single"
            collapsible
            className="w-full bg-slate-100 border border-slate-200 p-4 rounded-2xl"
          >
            {faqContent.questions.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="px-4 mt-2 transition ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm duratin-300 first:mt-0 hover:shadow-md"
              >
                <AccordionTrigger className="flex w-full items-center justify-between py-4 font-medium text-left text-slate-900">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-left text-slate-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 items-center justify-center flex-col hidden">
            <h3 className="text-xl font-semibold">
              {faqContent.footer.message}
            </h3>
            <p className="mb-4">{faqContent.footer.contact}</p>
            <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700">
              {faqContent.footer.buttonText}
            </button>
          </div>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
