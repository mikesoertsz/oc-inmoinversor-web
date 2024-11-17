import { Body, Heading, PreHeading, SubHeading } from "@/lib/atoms";
import { cva } from "class-variance-authority";

export type Titles = {
  icon?: React.ReactNode;
  image?: string;
  preheading?: string;
  heading?:
    | React.ReactNode[]
    | React.ReactNode
    | string
    | string[]
    | JSX.Element;
  subheading?: string | React.ReactNode | string[] | JSX.Element;
  body?: string | React.ReactNode | React.ReactNode[];
};

const titleStyles = cva("flex w-full max-w-3xl", {
  variants: {
    theme: {
      light: "text-black",
      dark: "text-white",
    },
    orientation: {
      center:
        "flex-col items-center justify-center w-full text-center gap-2 mb-6",
      left: "flex-col items-start justify-start w-full text-left gap-2",
    },
  },
  compoundVariants: [
    {
      theme: "light",
      orientation: "center",
      class: "flex-col items-center justify-center text-black",
    },
    {
      theme: "light",
      orientation: "left",
      class: "flex-col items-start justify-start text-black",
    },
    {
      theme: "dark",
      orientation: "center",
      class: "flex-col items-center justify-center text-white",
    },
    {
      theme: "dark",
      orientation: "left",
      class: "flex-col items-start justify-start text-gray-200",
    },
  ],
  defaultVariants: {
    theme: "light",
    orientation: "center",
  },
});

interface TitleBlockProps extends Titles {
  icon?: JSX.Element;
  image?: string;
  preheading?: string;
  heading?: string;
  subheading?: string;
  body?: string | React.ReactNode;
  theme: "light" | "dark";
  orientation: "center" | "left";
}

export function TitleBlock({
  preheading,
  heading,
  subheading,
  body,
  theme = "light",
  orientation = "center",
}: TitleBlockProps) {
  const darkModeStyles = {
    preHeading: "text-brand-g1", // Example color for PreHeading in dark mode
    body: "text-gray-400", // Example color for Body in dark mode
  };

  return (
    <div className={titleStyles({ theme, orientation })}>
      {preheading && (
        <PreHeading
          className={theme === "dark" ? darkModeStyles.preHeading : ""}
        >
          {preheading}
        </PreHeading>
      )}
      {heading && (
        <Heading className="font-newsreader text-4xl md:text-[2.5em] font-medium tracking-tighter">
          {heading}
        </Heading>
      )}
      {subheading && <SubHeading>{subheading}</SubHeading>}
      {body && (
        <Body className={theme === "dark" ? darkModeStyles.body : ""}>
          {body}
        </Body>
      )}
    </div>
  );
}
