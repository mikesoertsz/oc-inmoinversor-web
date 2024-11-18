import FAQ from "../(shared)/faq";
import ActionFormWaitlist from "./action-form-waitlist";
import AttentionHero from "./attention-hero";
import { AttentionNextCourse } from "./attention-nextcourse";
import { course_es } from "./course_es";
import DesireTestimonialsGrid from "./desire-testimonials-grid";
import InterestDetails from "./interest-details";
import CourseSyllabus from "./interest-syllabus";

const courseFaqContent = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas sobre nuestro curso de inversión inmobiliaria en Madrid.",
  questions: [
    {
      id: "item-1",
      question: "¿Qué temas se cubren en el curso?",
      answer:
        "El curso cubre una amplia gama de temas, incluyendo análisis de mercado, estrategias de inversión, gestión de propiedades y estudios de casos reales en Madrid.",
    },
    {
      id: "item-2",
      question: "¿El curso está disponible en modalidad online?",
      answer:
        "Sí, ofrecemos el curso tanto en modalidad presencial en Madrid como online para que puedas aprender desde cualquier lugar.",
    },
    {
      id: "item-3",
      question: "¿Cuáles son los beneficios de tomar el curso?",
      answer:
        "Al tomar el curso, obtendrás conocimientos prácticos y teóricos sobre la inversión inmobiliaria, acceso a recursos exclusivos y la oportunidad de conectar con otros inversores.",
    },
    {
      id: "item-4",
      question: "¿Hay algún requisito previo para inscribirse?",
      answer:
        "No se requieren conocimientos previos en inversión inmobiliaria. El curso está diseñado para principiantes y profesionales que deseen mejorar sus habilidades.",
    },
    {
      id: "item-5",
      question: "¿Cómo puedo inscribirme en el curso?",
      answer:
        "Puedes inscribirte en el curso a través de nuestro sitio web. Simplemente completa el formulario de inscripción y selecciona la modalidad que prefieras.",
    },
  ],
  footer: {
    message: "¿Tienes más preguntas?",
    contact:
      "Contáctanos para obtener más información y asistencia personalizada.",
    buttonText: "Contacto",
  },
};

export default function Course() {
  return (
    <main className="flex flex-col w-full h-full">
      <AttentionHero />
      <AttentionNextCourse />
      <InterestDetails />
      <CourseSyllabus syllabus={course_es.syllabus} />
      <DesireTestimonialsGrid />
      <ActionFormWaitlist />
      <FAQ faqContent={courseFaqContent} />
    </main>
  );
}
