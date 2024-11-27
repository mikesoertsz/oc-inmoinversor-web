import { InnerWrap, Wrapper } from "@/lib/atoms";
import React from "react";
import { TitleBlock } from "@/components/ui/titleblock";

export default function InterestWhyCreatedCourse() {
  return (
    <Wrapper className="bg-gradient-to-b from-black to-brand-bg1 py-[8dvh]">
      <InnerWrap className="bg-slate-900 text-white p-8 rounded-xl shadow-lg py-4 md:py-12 px-8 md:px-24 lg:pb-24">
        <TitleBlock
          heading="Why I Created This"
          subheading="We often choose the easier way - working for others. But in the long run, it's not easy at all."
          theme="dark"
          orientation="center"
        />
        <div className="text-slate-300 gap-5 flex flex-col pt-4 text-lg">
          <p>
            Growing up, I was exposed to a life of luxury from an early age. I
            attended the top schools in Madrid and the US, and I always aspired
            to live a life of freedom and abundance.
          </p>
          <p>
            However, I also witnessed firsthand how the pursuit of wealth and
            status can come at a great personal cost, as I saw families torn
            apart by the demands of work and the neglect of personal
            relationships.
          </p>
          <p>
            Despite following the traditional path of success - university,
            internships, consulting, and investment banking - I never felt truly
            fulfilled. I worked for a multinational company and was even sent to
            Chile, but I always felt insignificant in the grand scheme of
            things.
          </p>
          <p>
            I then joined a top Spanish startup, but something was still
            missing. That&apos;s when I discovered the power of real estate
            investing. After taking a quick course, I started investing in
            properties and, despite making some mistakes along the way, I
            ultimately succeeded.
          </p>
          <p>
            I borrowed money to accelerate my investments, and I involved other
            investors, which brought its own challenges and loneliness. But
            through it all, I grew and learned, and I realized that real estate
            investing offered a diverse range of strategies that could be
            tailored to fit anyone&apos;s needs and goals.
          </p>
          <p>
            If I can do it, so can you. The only barrier is fear, and that can
            be overcome through education. That&apos;s why I started teaching
            others about real estate investing three years ago. I&apos;ve seen
            that success varies, but the right attitude is key.
          </p>
          <p>
            I&apos;m living proof that you don&apos;t need a wealthy background
            to succeed in real estate. If your current job is unfulfilling,
            there&apos;s a proven solution waiting for you. All you have to do
            is take the first step.
          </p>
        </div>
      </InnerWrap>
    </Wrapper>
  );
}
