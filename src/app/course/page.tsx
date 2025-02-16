import { Suspense } from "react";
import FAQ from "../(shared)/faq";
import GridBlocks from "../(shared)/grid-blocks";
import AttentionHero from "./attention-hero";
import { course_es } from "./course_es";
import DesireTestimonialsMarquees from "./desire-testimonial-marquees";
import DesireTestimonialVideo from "./desire-testimonial-video";
import DesireTestimonialsGrid from "./desire-testimonials-grid";
import InterestFull from "./interest-full";
import InterestPersonalStory from "./interest-personalstory";
import { CourseSignupForm } from "./action-form-waitlist";

export default function Course() {
  return (
    <main className="flex flex-col w-full h-full">
      <Suspense>
        <AttentionHero />
        <div className="pt-[5dvh]">
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
        <DesireTestimonialsMarquees
          testimonials={course_es.testimonials.list}
        />
        {/* <ActionPricing /> */}
        <DesireTestimonialsGrid testimonials={course_es.testimonials.list} />
        <FAQ faqContent={course_es.faq} />
        <CourseSignupForm />
      </Suspense>
    </main>
  );
}
