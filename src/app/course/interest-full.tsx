import { InnerWrap, Wrapper } from "@/lib/atoms";

export default function InterestFull() {
  const full = {
    mainTitle: "¿Estás listo para empezar?",
    mainQuote: "La mejor inversión que puedes hacer es en ti mismo",
    subheading: "Lo que necesitas para empezar:",
    registerText: "Empezar ahora",
    requirements: [
      {
        icon: "🎯",
        title: "Compromiso",
        description:
          "Dedicación para aprender y aplicar los conocimientos adquiridos.",
      },
      {
        icon: "💡",
        title: "Mentalidad",
        description:
          "Disposición para aprender y crecer como inversor inmobiliario.",
      },
      {
        icon: "🚀",
        title: "Acción",
        description:
          "Voluntad para tomar acción y comenzar tu viaje de inversión.",
      },
    ],
  };

  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-[1dvh] mt-12">
      <InnerWrap className="items-center justify-center max-w-4xl text-center text-white">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {full.mainTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 italic">
            &ldquo;{full.mainQuote}&rdquo;
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-lg md:text-lg font-medium mb-8">
            {full.subheading}
          </h2>
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-white border border-slate-200 rounded-xl">
            {full.requirements.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition transform duration-200 ease-in-out border border-slate-200 text-slate-800"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#register"
          className="px-12 py-4 mt-12 mb-4 font-medium text-black transition duration-300 ease-in-out rounded-md bg-brand-highlight hover:bg-gray-50 text-xl"
        >
          {full.registerText}
        </a>
      </InnerWrap>
    </Wrapper>
  );
}
