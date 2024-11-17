import { Body, MediumHeading } from "@/lib/atoms";
import React from "react";

type Props = {
  header: {
    preheading?: string;
    icon?: React.ReactNode;
    title: string | React.ReactNode | JSX.Element;
    subtitle?: string | React.ReactNode;
    description?: string | React.ReactNode;
  };
  right?: React.ReactNode;
  right2?: React.ReactNode;
};

export default function CourseSectionHeader({ header, right, right2 }: Props) {
  return (
    <div className="flex flex-col items-center justify-between w-full py-2 text-sm text-slate-500">
      <div className="flex items-center justify-between w-full gap-1 pb-1 text-gray-600">
        <div className="flex items-center gap-1">
          {header.icon && <div className="flex-shrink-0">{header.icon}</div>}
          <p className="font-normal">{header.preheading}</p>
        </div>
        {right && <div className="flex-shrink-0">{right}</div>}
      </div>
      <div className="grid w-full grid-cols-1 gap-8 pt-8 pb-12 border-t md:grid-cols-2 border-slate-200">
        <div className="flex flex-col items-start justify-start w-full text-left text-gray-900">
          <MediumHeading>{header.title}</MediumHeading>
          <Body className="pt-1 text-left">{header.subtitle}</Body>
        </div>
        <div className="flex flex-col items-start justify-start">
          {right2 ? (
            <>{right2}</>
          ) : (
            <div className="pt-2 leading-relaxed text-left text-gray-600">
              {header.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
