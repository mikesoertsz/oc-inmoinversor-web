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
      title: "Recursos",
      links: [
        { text: "Blog", url: "/blog" },
        { text: "Herramientas", url: "/tools" },
        { text: "Perspectivas", url: "/insights" },
        { text: "Contacto", url: "/contact" },
        { text: "Nosotros", url: "/about" },
      ],
    },
    {
      title: "Conectar",
      links: [
        { text: "Webinars", url: "/webinars" },
        { text: "Eventos", url: "/events" },
        { text: "Casos", url: "/case-studies" },
        { text: "FAQs", url: "/faqs" },
        { text: "Recursos", url: "/resources" },
      ],
    },
    {
      title: "Redes Sociales",
      links: [
        { text: "Facebook", url: "https://facebook.com" },
        { text: "Instagram", url: "https://instagram.com" },
        { text: "Twitter/X", url: "https://twitter.com" },
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
      <footer className="w-full max-w-5xl pt-8 mx-auto text-sm bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <ul className="grid w-full grid-cols-1 md:grid-cols-6">
          {footer.columns.map((column, index) => (
            <li key={index} className="hidden md:block">
              <h3 className="mb-1 text-sm font-medium tracking-tight">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-1">
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
      <div className="flex items-center justify-between h-10 px-8 mt-8 text-xs text-center text-gray-500 border-t border-gray-200 dark:border-neutral-700 dark:text-neutral-200">
        <p>© 2024 Immo Inversor. Todos los derechos reservados.</p>
        <div className="flex items-center justify-center gap-2">
          <div className="flex justify-center gap-2 mr-8">
            {socialLinks.map(({ icon, url }, index) => (
              <a
                key={index}
                href={url}
                className="transition duration-300 ease-in-out hover:text-gray-900"
              >
                {icon}
              </a>
            ))}
          </div>
          <div className="items-center justify-center hidden md:flex md:justify-end">
            <p>
              Hecho por{" "}
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
