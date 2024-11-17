import React from "react";
import { FiChevronRight } from "react-icons/fi";
import tw from "tailwind-styled-components";

type Props = {
  content: {
    label?: string;
    href?: string;
  }[];
};

const Wrapper = tw.section`mx-auto w-full py-15 font-body`;
const InnerWrap = tw.div`container mx-auto max-w-6xl`;

export default function Breadcrumbs({ content }: Props) {
  return (
    <Wrapper>
      <InnerWrap>
        <div className="flex items-center h-10 py-4 pt-8 mx-auto overflow-hidden max-w-7xl whitespace-nowrap">
          {content.map((step, i) => (
            <div key={i} className="flex items-center">
              {i !== 0 && (
                <span className="mx-1 text-gray-400 dark:text-gray-50">
                  <FiChevronRight />
                </span>
              )}
              <a
                href={step.href}
                className="text-xs tracking-wide text-gray-400 hover:text-gray-600 dark:text-gray-50"
              >
                {step.label}
              </a>
            </div>
          ))}
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
