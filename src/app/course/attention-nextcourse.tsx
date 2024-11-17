import { InnerWrap, Wrapper } from "@/lib/atoms";

export function AttentionNextCourse() {
  const detalles = [
    {
      pretitle: "Fecha",
      title: "10 Diciembre 2024",
      description: "Marca tu calendario.",
      icon: "",
      value: "",
    },
    {
      pretitle: "Hora",
      title: "10:00 AM - 4:00 PM",
      description: "Día de aprendizaje y networking.",
      icon: "",
      value: "",
    },
    {
      pretitle: "Ubicación",
      title: "Madrid, España y Online",
      description: "Únete en Madrid o en línea.",
      icon: "",
      value: "",
    },
    {
      pretitle: "Instructores",
      title: "Guillermo Ortiz",
      description: "Aprende de un experto inversor.",
      icon: "",
      value: "",
    },
  ];

  return (
    <Wrapper className="py-4 bg-white">
      <InnerWrap className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          {detalles.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-start w-full p-3 rounded-lg border-0 border-slate-300 last:border-0 md:border-r"
            >
              <h4 className="text-[9px] uppercase font-semibold tracking-[0.1em] text-slate-600">
                {item.pretitle}
              </h4>
              <h3 className="mt-1 text-md font-medium">{item.title}</h3>
              <p className="text-xs text-left text-gray-600">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
