import { Suspense } from "react";
import FAQ from "../(shared)/faq";
import GridBlocks from "../(shared)/grid-blocks";
import ActionFormWaitlist from "./action-form-waitlist";
import AttentionHero from "./attention-hero";
import { AttentionNextCourse } from "./attention-nextcourse";
import { course_es } from "./course_es";
import DesireCTAFinal from "./desire-cta-final";
import DesireTestimonialSingle from "./desire-testimonial-single";
import DesireTestimonialsGrid from "./desire-testimonials-grid";
import CourseSyllabus from "./interest-syllabus";
import DesireTestimonialVideo from "./desire-testimonial-video";

export default function Course() {
  return (
    <main className="flex flex-col w-full h-full">
      <Suspense>
        <AttentionHero />
        <DesireTestimonialSingle />
        <AttentionNextCourse />
        <GridBlocks />
        {/* <InterestDetails /> */}
        {/* <InterestWhyCreatedCourse /> */}
        <DesireTestimonialVideo />
        <CourseSyllabus syllabus={course_es.syllabus} />
        <DesireTestimonialVideo
          videoPosition="right"
          testimonial={course_es.testimonials.list[7]}
        />
        <DesireTestimonialsGrid />
        <ActionFormWaitlist />
        <DesireCTAFinal />
        <FAQ faqContent={course_es.faq} />
      </Suspense>
    </main>
  );
}
