import { Suspense } from "react";
import FAQ from "../(shared)/faq";
import GridBlocks from "../(shared)/grid-blocks";
import ActionFormWaitlist from "./action-form-waitlist";
import ActionPricing from "./action-pricing";
import AttentionHero from "./attention-hero";
import { AttentionNextCourse } from "./attention-nextcourse";
import { course_es } from "./course_es";
import DesireTestimonialsMarquees from "./desire-testimonial-marquees";
import DesireTestimonialSingle from "./desire-testimonial-single";
import DesireTestimonialVideo from "./desire-testimonial-video";
import DesireTestimonialsGrid from "./desire-testimonials-grid";
import CourseSyllabus from "./interest-syllabus";
import InterestPersonalStory from "./interest-personalstory";

export default function Course() {
  return (
    <main className="flex flex-col w-full h-full">
      <Suspense>
        <AttentionHero />
        <DesireTestimonialSingle />
        <AttentionNextCourse />
        <GridBlocks />
        <InterestPersonalStory />
        {/* <InterestDetails /> */}
        {/* <InterestWhyCreatedCourse /> */}
        <div className="py-[5dvh]">
          <DesireTestimonialVideo
            testimonial={course_es.testimonials.list[6]}
            videoPosition="left"
          />
        </div>
        <CourseSyllabus syllabus={course_es.syllabus} />
        <DesireTestimonialVideo
          videoPosition="right"
          testimonial={course_es.testimonials.list[7]}
        />
        <DesireTestimonialsMarquees />
        <ActionPricing />
        <FAQ faqContent={course_es.faq} />
        <DesireTestimonialsGrid testimonials={course_es.testimonials.list} />
        <ActionFormWaitlist />
      </Suspense>
    </main>
  );
}
