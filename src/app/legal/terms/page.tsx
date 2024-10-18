"use client";

import Breadcrumbs from "@/app/(shared)/Breadcrumbs";
import tw from "tailwind-styled-components";

type legal = {
  title?: string;
  content?: string;
}[];

const Wrapper = tw.div`flex flex-col text-center items-start justify-center px-10 mx-auto text-left max-w-prose py-24`;
const Preheading = tw.h4`uppercase tracking-[2px] text-xs font-medium pt-4 text-left text-gray-700`;
const Heading = tw.h1`text-3xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl`;
const SubHeading = tw.h2`text-md font-medium text-gray-900 pt-3`;
const Body = tw.div`mt-1 max-w-prose text-left text-xs text-gray-800 leading-relaxed tracking-wide`;
const ColWrapper = tw.div`flex flex-row w-full mx-auto gap-10`;
export default function page() {
  return (
    <section className="flex flex-col w-full mx-auto">
      <Breadcrumbs content={breadcrumbs} />
      <Wrapper>
        <ColWrapper>
          <div>
            <Heading>Legal</Heading>
            <br />
            <Preheading>Updated date: August 20th 2023</Preheading>
            <Body>
              This privacy statement provides an overview of how Drifter Apps
              Unipessoal Limited (VAT:PT515983128), hereinafter DRIFTER,
              processes personal information and how we take your privacy into
              account.
            </Body>
            <SubHeading>About Investment.Yachts</SubHeading>
            <Body className="mb-8">
              <span className="font-semibold">
                The owner of this website is:
              </span>
              <br />
              Drifter Apps, Uni.Ltd <br />R Philip Folque, 2 , 2, <br />
              Lisbon 1050-113 | Lisboa, Portugal
              <br />
              VAT No.: PT515983128
              <br />
              Legal nature: Sociedade Unipessoal por Quotas
              <br />
              <br />
              mikeinvestment.yachts
            </Body>
            {legal.map((policy, index) => (
              <div key={index}>
                <SubHeading>{policy.title}</SubHeading>
                <Body>{policy.content}</Body>
              </div>
            ))}
          </div>
        </ColWrapper>
      </Wrapper>
    </section>
  );
}

const legal = [
  {
    title: "Welcome and Acceptance",
    content:
      'Welcome to the Investment.Yachts website. These terms of use ("Terms") are a legal contract between you and Investment.Yachts ("we" or "our"). By using this website, you indicate that you have read and accept these Terms. You cannot use this website if you do not accept these Terms. We are an international provider of courses in frontend development, and these Terms govern your use of all the text, data, information, software, graphics, photographs, and more ("Materials") that we may make available to you, as well as any services we may provide through our website.',
  },
  {
    title: "Changes to Terms",
    content:
      'We may alter the Materials and services we offer you and/or choose to modify, suspend, or discontinue this website at any time and without notifying you. We may also change, update, add or remove provisions (collectively, "modifications") of these Terms from time to time. We promise to inform you of any modifications by posting them on this website. If you object to any modifications, your sole recourse shall be to cease using this website. Continued use of this website following notice of any modifications indicates you acknowledge and agree to be bound by the modifications.',
  },
  {
    title: "General Use",
    content:
      'By using this website, you promise that you are at least 18 years of age. If you are not yet 18 years old, you must have the permission of an adult to use this website and agree to its terms, and that adult must be a parent or legal guardian who is willing to be responsible for your use of this website. We invite you to use this website for individual consumer purposes ("Permitted Purposes"). In these Terms, we are granting you a limited, personal, non-exclusive, and non-transferable license to use and display the Materials. Your right to use the Materials is conditioned on your compliance with these Terms. You have no other rights in this website or any Materials, and you may not modify, edit, copy, reproduce, create derivative works of, reverse engineer, alter, enhance, or in any way exploit any of this website or Materials in any manner.',
  },
  {
    title: "Registration",
    content:
      "If you want to register for a Investment.Yachts bootcamp, you must submit the following information: name and surname, telephone number, an active email address, and a brief description of why you are interested in Investment.Yachts. During the registration process, you may also provide additional optional information for a more personalized experience. Once you have submitted the requested information, we will determine if we accept your registration. If approved, you will receive an email detailing the steps necessary to complete the registration process. You are responsible for complying with these Terms and maintaining the confidentiality of your information.",
  },
  {
    title: "Electronic Communications",
    content:
      "By using the website, you consent to receiving electronic communications from us, including via email. These communications may include notices about applicable fees, transactional information, and other information related to the website or our courses. You agree that any notices, agreements, disclosures, or other communications that we send you electronically will satisfy any legal communication requirements, including that such communications be in writing.",
  },
  {
    title: "Privacy Policy",
    content:
      "We respect the information that you provide to us and want to be sure you fully understand exactly how we use the information. Please review our Privacy Policy, which explains how we use the information that you provide to us.",
  },
  {
    title: "User Conduct",
    content:
      "You must use this website in accordance with all applicable local, state, national, and international laws, rules, and regulations. You must not use this website for any fraudulent or inappropriate purpose, and you agree not to impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content included on this website, such as text, graphics, logos, images, and software, is the property of Investment.Yachts or its content suppliers and protected by international copyright laws. You agree not to copy, distribute, reproduce, publish, or create derivative works from the content found on the website without expressly being authorized to do so by Investment.Yachts.",
  },
  {
    title: "Dispute Resolution",
    content:
      "Any dispute arising out of or relating to these Terms, or the breach thereof, shall be settled by arbitration administered by a recognized arbitration body, and judgment on the award rendered by the arbitrator(s) may be entered in any court having jurisdiction thereof.",
  },
  {
    title: "Contact Information",
    content:
      "For any questions or concerns regarding these Terms of Use, please contact Investment.Yachts at mike@Investment.Yachts.com.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Legal", href: "" },
  {
    label: "Terms",
    href: "/legal/terms",
    color: "text-blue-600 dark:text-blue-400",
  },
];
