import { InnerWrap, Wrapper } from "@/lib/atoms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqContent = {
  preheading: "Preguntas Frecuentes",
  heading: "Todo lo que Necesitas Saber",
  subheading: "Respuestas a las preguntas más comunes sobre patrocinios",
  faqs: [
    {
      question: "¿Cómo se integra mi marca en el contenido?",
      answer:
        "Trabajamos contigo para crear una integración natural que resuene con nuestra audiencia. Puede ser una demostración de producto, un caso de uso real, o una mención estratégica que aporte valor al contenido.",
    },
    {
      question: "¿Cuántos suscriptores tiene el canal?",
      answer:
        "Nuestro canal está en crecimiento constante. Lo más importante es nuestra tasa de engagement y retención, que supera la media del sector. Contacta con nosotros para obtener las métricas más actualizadas.",
    },
    {
      question: "¿Puedo elegir en qué videos aparece mi marca?",
      answer:
        "Sí, trabajamos contigo para seleccionar los videos más relevantes para tu marca. Te proporcionamos un calendario de contenido y puedes elegir los temas que mejor se alineen con tu mensaje.",
    },
    {
      question: "¿Qué métricas recibiré después de la campaña?",
      answer:
        "Proporcionamos un informe detallado que incluye visualizaciones, tiempo de retención, engagement, clics en enlaces, y cualquier métrica específica que necesites para medir el ROI.",
    },
    {
      question: "¿Hay un compromiso mínimo de videos?",
      answer:
        "No hay un mínimo obligatorio, pero ofrecemos descuentos atractivos para paquetes de múltiples videos. Esto permite una presencia más consistente y mejores resultados.",
    },
    {
      question: "¿Cómo se mide el éxito de la campaña?",
      answer:
        "Definimos KPIs claros antes de comenzar y los monitorizamos durante toda la campaña. Típicamente medimos visualizaciones, engagement, clics, conversiones y el sentimiento general de la audiencia.",
    },
  ],
};

export default function SponsorFAQ() {
  return (
    <Wrapper className="bg-slate-100">
      <InnerWrap className="items-center justify-center max-w-4xl text-black">
        <div className="text-center mb-16">
          <span className="text-brand-primary font-medium mb-4 block">
            {faqContent.preheading}
          </span>

          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            {faqContent.heading}
          </h2>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {faqContent.subheading}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqContent.faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </InnerWrap>
    </Wrapper>
  );
}
