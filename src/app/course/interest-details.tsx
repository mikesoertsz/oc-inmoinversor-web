import React from "react";
import { InnerWrap, Wrapper } from "@/lib/atoms";

export default function InterestDetails() {
  const courseContent = {
    title: "Master Real Estate Investment Strategies",
    features: [
      {
        title: "Property Analysis",
        description:
          "Learn how to effectively analyze properties to identify profitable investment opportunities.",
      },
      {
        title: "Transaction Management",
        description:
          "Gain insights into managing real estate transactions smoothly and efficiently.",
      },
      {
        title: "Flipping for Profit",
        description:
          "Understand the strategies for flipping properties to maximize your returns.",
      },
    ],
  };
  return (
    <Wrapper>
      <InnerWrap>
        <h2 className="text-3xl font-bold text-center mb-8">
          {courseContent.title}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="bg-gray-800 text-white p-8 rounded-2xl border border-gray-700 row-span-2">
            <h3 className="text-xl font-semibold">Property Analysis</h3>
            <p className="mt-2">
              Learn how to effectively analyze properties to identify profitable
              investment opportunities.
            </p>
          </li>
          <li className="bg-gray-800 text-white p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold">Transaction Management</h3>
            <p className="mt-2">
              Gain insights into managing real estate transactions smoothly and
              efficiently.
            </p>
          </li>
          <li className="bg-gray-800 text-white p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold">Flipping for Profit</h3>
            <p className="mt-2">
              Understand the strategies for flipping properties to maximize your
              returns.
            </p>
          </li>
        </ul>
      </InnerWrap>
    </Wrapper>
  );
}
