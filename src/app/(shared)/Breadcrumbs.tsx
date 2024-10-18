import React from "react";
import { FiChevronRight } from "react-icons/fi";
import tw from "tailwind-styled-components";

type Props = {
  content: {
    label?: string;
    href?: string;
  }[];
};

export default function Breadcrumbs({ content }: Props) {
  const Wrapper = tw.section`mx-auto w-full py-15`;
  const InnerWrap = tw.div`container mx-auto max-w-6xl`;

  return (
    <Wrapper>
      <InnerWrap>
        <div className="mx-auto flex h-10 max-w-7xl items-center overflow-hidden whitespace-nowrap py-4 pt-8">
          {content.map((step, i) => (
            <div key={i} className="flex items-center">
              {i !== 0 && (
                <span className="mx-1 text-gray-400 dark:text-gray-50">
                  <FiChevronRight />
                </span>
              )}
              <a
                href={step.href}
                className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-50 tracking-wide"
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
