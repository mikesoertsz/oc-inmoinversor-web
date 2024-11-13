import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InnerWrap, Wrapper } from "@/lib/atoms";

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
    <Wrapper>
      <InnerWrap>
        <div className="flex w-full flex-col item-center justify-center max-w-3xl py-[5dvh] text-center">
          <h2 className="text-3xl font-bold mb-4">{faqContent.title}</h2>
          <p className="mb-8">{faqContent.description}</p>
          <Accordion type="single" collapsible>
            {faqContent.questions.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="text-left"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 flex items-center justify-center flex-col">
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
