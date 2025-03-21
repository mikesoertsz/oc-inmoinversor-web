import { InnerWrap, Wrapper } from "@/lib/atoms";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqContent = {
  preheading: "Preguntas Frecuentes",
  heading: "¿Tienes Dudas?",
  subheading:
    "Encuentra respuestas a las preguntas más comunes sobre nuestro curso.",
  faqs: [
    {
      question: "¿Qué incluye el curso?",
      answer:
        "El curso incluye más de 40 horas de contenido en video, recursos descargables, acceso a nuestra comunidad privada, y asesoramiento personalizado. Cubrimos desde los fundamentos básicos hasta estrategias avanzadas de inversión inmobiliaria.",
    },
    {
      question: "¿Necesito experiencia previa?",
      answer:
        "No, el curso está diseñado tanto para principiantes como para inversores con experiencia. Comenzamos desde lo básico y progresivamente avanzamos hacia conceptos más complejos.",
    },
    {
      question: "¿Por cuánto tiempo tendré acceso al curso?",
      answer:
        "Una vez inscrito, tendrás acceso de por vida al contenido del curso y todas las actualizaciones futuras. También mantendrás acceso a nuestra comunidad privada.",
    },
    {
      question: "¿Ofrecen garantía de devolución?",
      answer:
        "Sí, ofrecemos una garantía de devolución de 30 días. Si no estás satisfecho con el curso, te devolvemos el 100% de tu inversión sin hacer preguntas.",
    },
    {
      question: "¿Cómo es el método de pago?",
      answer:
        "Aceptamos todas las tarjetas de crédito principales y PayPal. También ofrecemos opciones de pago en cuotas para hacer el curso más accesible.",
    },
    {
      question: "¿Tendré apoyo durante el curso?",
      answer:
        "Sí, tendrás acceso a sesiones de preguntas y respuestas en vivo, soporte por email, y nuestra comunidad privada donde podrás interactuar con otros estudiantes y mentores.",
    },
  ],
};

export default function AttentionFAQ() {
  return (
    <Wrapper className="bg-slate-50">
      <InnerWrap className="py-[10dvh] items-center justify-center text-center">
        <span className="text-brand-primary font-medium mb-4 block">
          {faqContent.preheading}
        </span>
        <h2 className="text-4xl font-bold mb-4">{faqContent.heading}</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          {faqContent.subheading}
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="text-left">
            {faqContent.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
