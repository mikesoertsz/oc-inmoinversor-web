"use client";

import Breadcrumbs from "@/app/(shared)/Breadcrumbs";
import React from "react";
import tw from "tailwind-styled-components";

type refundPolicy = {
  title?: string;
  content?: string;
}[];

const Wrapper = tw.div`flex flex-col text-center items-start justify-center px-10 mx-auto text-left max-w-prose py-24`;
const Preheading = tw.h4`uppercase tracking-[2px] text-xs font-medium pt-4 text-left text-gray-700`;
const Heading = tw.h1`text-3xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl`;
const SubHeading = tw.h2`text-md font-medium text-gray-900 pt-3`;
const Body = tw.div`mt-1 max-w-prose text-left text-xs text-gray-800 leading-relaxed tracking-wide`;
export default function page() {
  return (
    <section className="flex flex-col w-full mx-auto">
      <Breadcrumbs content={breadcrumbs} />
      <Wrapper>
        <Heading>Refund Policy</Heading>
        <Preheading>Updated date: July 24th 2023</Preheading>
        {refundPolicy.map((policy, index) => (
          <div key={index}>
            <SubHeading>{policy.title}</SubHeading>
            <Body>{policy.content}</Body>
          </div>
        ))}
      </Wrapper>
    </section>
  );
}

const refundPolicy = [
  {
    title: "General",
    content:
      "At Drifter Apps, we strive to provide our clients with the highest quality service. However, we understand that there may be circumstances where you are not satisfied and consider requesting a refund. Our refund policy, as detailed below, outlines the circumstances under which a refund may be issued.",
  },
  {
    title: "Service Completion",
    content:
      "Once a service has been fully rendered, it is considered complete, and no refund will be issued. This includes any planning, design, coding, and product development services.",
  },
  {
    title: "Project Cancellation",
    content:
      "If a project is cancelled by the client before completion but after work has begun, a partial refund may be issued. The refund amount will be proportional to the amount of work that has not been completed. Any milestones that have been reached before the cancellation will not be eligible for a refund.",
  },
  {
    title: "Non-refundable Services",
    content:
      "Certain services are non-refundable. These include services that involve third-party costs that Drifter Apps has paid on behalf of the client, such as domain registration, hosting, and third-party plugins or software.",
  },
  {
    title: "Stripe Payment Handling",
    content:
      "All payments and refunds are handled through Stripe. Please refer to Stripe's terms and conditions for their specific requirements regarding payment handling and refunds.",
  },
  {
    title: "European Union 14 day cooling off period",
    content:
      "Notwithstanding the above, if you are a resident of the European Union, you have the right to cancel or return your order within 14 days for any reason and without justification. As above, any work that has been completed during this period will not be eligible for a refund.",
  },
  {
    title: "Refund Process",
    content:
      "To request a refund, please contact us at mikeinvestment.yachts. We will review your request and inform you of the outcome. If your refund is approved, it will be processed, and a credit will automatically be applied to your original method of payment within 10 business days.",
  },
  {
    title: "Changes to Refund Policy",
    content:
      "Drifter Apps reserves the right to change this refund policy at any time. Any changes will be posted on this page. Your continued use of our services after a change in the refund policy constitutes your acceptance of the new refund policy.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/home" },
  { label: "Legal", href: "" },
  {
    label: "Refund Policy",
    href: "/legal/refund",
    color: "text-blue-600 dark:text-blue-400",
  },
];
