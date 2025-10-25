import FAQ from "../(shared)/faq";
import GridBlocks from "../(shared)/grid-blocks";
import AttentionHero from "./attention-hero";
import CombinedCTAABTestWrapper from "./CombinedCTAABTestWrapper";
import { course_es } from "./course_es";
import DesireTestimonialsMarquees from "./desire-testimonial-marquees";
import DesireTestimonialVideo from "./desire-testimonial-video";
import InterestFull from "./interest-full";
import InterestPersonalStory from "./interest-personalstory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curso de Inversión Inmobiliaria",
  description:
    "Aprende a invertir en bienes raíces con el curso completo de Guillermo Ortiz. Estrategias probadas, análisis de propiedades y gestión de alquileres para generar ingresos pasivos.",
};

export default function Course() {
  return (
    <main className="flex flex-col w-full h-full">
      <AttentionHero />
      <div className="pt-[5dvh] gap-4 flex flex-col">
        <DesireTestimonialVideo
          videoPosition="left"
          testimonial={course_es.testimonials.list[3]}
        />
        <DesireTestimonialVideo
          videoPosition="right"
          testimonial={course_es.testimonials.list[1]}
        />
      </div>
      <GridBlocks />
      <InterestPersonalStory />
      {/* <InterestDetails /> */}
      {/* <InterestWhyCreatedCourse /> */}
      <div className="py-[5dvh]">
        <DesireTestimonialVideo
          testimonial={course_es.testimonials.list[0]}
          videoPosition="left"
        />
      </div>
      {/* <CourseSyllabus syllabus={course_es.syllabus} /> */}
      <DesireTestimonialVideo
        videoPosition="right"
        testimonial={course_es.testimonials.list[2]}
      />
      <InterestFull />
      <DesireTestimonialsMarquees testimonials={course_es.testimonials.list} />
      {/* <ActionPricing /> */}
      {/* <DesireTestimonialsGrid testimonials={course_es.testimonials.list} /> */}
      <FAQ faqContent={course_es.faq} />
      <CombinedCTAABTestWrapper />
    </main>
  );
}
