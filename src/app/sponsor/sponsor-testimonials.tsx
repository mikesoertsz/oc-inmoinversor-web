import { InnerWrap, Wrapper } from "@/lib/atoms";
import { Quote } from "lucide-react";

const testimonialsContent = {
  preheading: "Lo Que Dicen Nuestros Patrocinadores",
  heading: "Resultados Reales",
  subheading: "Descubre por qué las marcas confían en nosotros",
  testimonials: [
    {
      quote:
        "Colaborar con InmoInversor nos dio acceso directo al nicho de inversión inmobiliaria en España. Su audiencia confía en su experiencia, y ahora confían en nuestra marca.",
      author: "María González",
      position: "Directora de Marketing",
      company: "Reformas Premium SL",
      image: "/path/to/image1.jpg", // Replace with actual image path
    },
    {
      quote:
        "El ROI que hemos visto de nuestras campañas con InmoInversor ha superado nuestras expectativas. La audiencia está realmente comprometida y busca productos de calidad.",
      author: "Carlos Ruiz",
      position: "CEO",
      company: "Inversiones Seguras",
      image: "/path/to/image2.jpg", // Replace with actual image path
    },
  ],
};

export default function SponsorTestimonials() {
  return (
    <Wrapper className="bg-gradient-to-b from-brand-bg1 to-black py-[10dvh]">
      <InnerWrap className="items-center justify-center max-w-6xl text-white">
        <div className="text-center mb-16">
          <span className="text-brand-highlight font-medium mb-4 block">
            {testimonialsContent.preheading}
          </span>

          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            {testimonialsContent.heading}
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {testimonialsContent.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonialsContent.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-900/50 p-8 rounded-xl border border-slate-800"
            >
              <Quote className="h-8 w-8 text-brand-highlight mb-6" />

              <blockquote className="text-lg mb-6 text-slate-300">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center mr-4"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-slate-400">
                    {testimonial.position}
                  </div>
                  <div className="text-sm text-brand-highlight">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
