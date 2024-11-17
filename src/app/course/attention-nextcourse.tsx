import { InnerWrap, Wrapper } from "@/lib/atoms";

export function AttentionNextCourse() {
  const details = [
    {
      pretitle: "Date",
      title: "December 10, 2024",
      description: "Mark your calendar for this important event.",
      icon: "",
      value: "",
    },
    {
      pretitle: "Time",
      title: "10:00 AM - 4:00 PM",
      description: "A full day of learning and networking.",
      icon: "",
      value: "",
    },
    {
      pretitle: "Location",
      title: "Madrid, Spain & Online",
      description: "Join us in Madrid or participate online from anywhere.",
      icon: "",
      value: "",
    },
    {
      pretitle: "Instructors",
      title: "Guillermo Ortiz",
      description: "Learn from an expert investor with a decade of experience.",
      icon: "",
      value: "",
    },
  ];

  return (
    <Wrapper className="py-4 bg-white">
      <InnerWrap className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          {details.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-start justify-start w-full p-3 rounded-lg border-0 border-slate-300 last:border-0 md:border-r"
            >
              <p className="text-[9px] uppercase font-semibold tracking-[0.1em] text-slate-600">
                {item.pretitle}
              </p>
              <div className="mt-1 text-lg font-medium">{item.title}</div>
              <div className="text-xs text-left text-gray-600">
                {item.description}
              </div>
            </li>
          ))}
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
