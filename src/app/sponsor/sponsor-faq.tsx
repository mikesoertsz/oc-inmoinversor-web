"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TitleBlock } from "@/components/ui/titleblock";
import { InnerWrap, Wrapper } from "@/lib/atoms";

const faqContent = {
  preheading: "Preguntas Frecuentes",
  heading: "Todo lo que Necesitas Saber",
  subheading: "Respuestas a las preguntas más comunes sobre colaboraciones",
  faqs: [
    {
      question: "¿Cómo funciona el proceso de colaboración?",
      answer:
        "Tras contactar, programamos una llamada para discutir objetivos y detalles. Desarrollamos un brief creativo, acordamos fechas y procedemos con la producción. Recibirás actualizaciones regulares y un informe final de resultados.",
    },
    {
      question: "¿Qué tipos de marcas son adecuadas?",
      answer:
        "Colaboramos con marcas relacionadas con inversión inmobiliaria, construcción, reformas, finanzas, seguros y tecnología para el sector inmobiliario. La clave es que aporten valor real a nuestra audiencia.",
    },
    {
      question: "¿Cuánto tiempo tarda la producción?",
      answer:
        "El tiempo de producción varía según el tipo de contenido. Un video patrocinado típico toma 2-3 semanas desde la aprobación del brief hasta la publicación. Proyectos más extensos pueden requerir 4-6 semanas.",
    },
    {
      question: "¿Qué métricas de rendimiento proporcionan?",
      answer:
        "Proporcionamos informes detallados que incluyen visualizaciones, tiempo de retención, engagement rate, clicks en enlaces y datos demográficos de la audiencia. También podemos personalizar el seguimiento según tus KPIs específicos.",
    },
    {
      question: "¿Ofrecen exclusividad por sector?",
      answer:
        "Sí, podemos acordar períodos de exclusividad para tu sector. Esto significa que no promocionaremos productos o servicios competidores durante el período acordado.",
    },
  ],
};

export default function SponsorFAQ() {
  return (
    <Wrapper className="bg-white py-12">
      <InnerWrap className="items-center justify-center max-w-5xl ">
        <TitleBlock
          preheading={faqContent.preheading}
          heading={faqContent.heading}
          subheading={faqContent.subheading}
          theme="light"
          orientation="center"
        />

        <div className="flex w-full p-12 border rounded-2xl shadow-sm">
          <Accordion type="single" collapsible className="space-y-4 w-full">
            {faqContent.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-slate-900 border-b-0 px-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 border border-b-0 border-t-0 p-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
