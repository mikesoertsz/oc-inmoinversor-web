import { Wrapper } from "@/lib/atoms";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutubeSquare,
} from "react-icons/fa";

type FooterLink = {
  text: string;
  url: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footer: { columns: FooterColumn[] } = {
  columns: [
    {
      title: "Resources",
      links: [
        { text: "Blog Articles", url: "/blog" },
        { text: "Investment Tools", url: "/tools" },
        { text: "Market Insights", url: "/insights" },
        { text: "Contact Us", url: "/contact" },
        { text: "About Us", url: "/about" },
      ],
    },
    {
      title: "Connect",
      links: [
        { text: "Webinars", url: "/webinars" },
        { text: "Events", url: "/events" },
        { text: "Case Studies", url: "/case-studies" },
        { text: "FAQs", url: "/faqs" },
        { text: "Resource Library", url: "/resources" },
      ],
    },
    {
      title: "Socials",
      links: [
        { text: "Facebook", url: "https://facebook.com" },
        { text: "Instagram", url: "https://instagram.com" },
        { text: "X", url: "https://twitter.com" },
        { text: "LinkedIn", url: "https://linkedin.com" },
        { text: "YouTube", url: "https://youtube.com" },
      ],
    },
  ],
};

const socialLinks = [
  { icon: <FaYoutubeSquare size={18} />, url: "https://youtube.com" },
  { icon: <FaInstagram size={18} />, url: "https://instagram.com" },
  { icon: <FaTwitter size={18} />, url: "https://twitter.com" },
  { icon: <FaLinkedin size={18} />, url: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <Wrapper className="px-0 border-t border-gray-200">
      <footer className="bg-white pt-8 text-sm dark:border-neutral-700 dark:bg-neutral-900 w-full max-w-5xl mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-6">
          {footer.columns.map((column, index) => (
            <li key={index} className="hidden md:block">
              <h3 className="text-sm font-medium tracking-tight mb-1">
                {column.title}
              </h3>
              <ul className="flex gap-1 flex-col">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="text-[12px]">
                    <a href={link.url} className="hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </footer>
      <div className="text-center mt-8 flex items-center justify-between px-8 border-t border-gray-200 h-10 text-gray-500 text-xs dark:border-neutral-700 dark:text-neutral-200">
        <p>© 2024 Immo Inversor. All rights reserved.</p>
        <div className="flex items-center justify-center gap-2">
          <div className="flex justify-center gap-2 mr-8">
            {socialLinks.map(({ icon, url }, index) => (
              <a
                key={index}
                href={url}
                className="hover:text-gray-900 transition duration-300 ease-in-out"
              >
                {icon}
              </a>
            ))}
          </div>
          <div className="items-center justify-center hidden md:flex md:justify-end">
            <p>
              Made by{" "}
              <a
                href="http://www.drifter.agency"
                className="font-semibold text-gray-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                Drifter
              </a>
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
