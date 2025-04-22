import { Wrapper } from "@/lib/atoms";

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
        { text: "Careers", url: "/careers" },
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

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Wrapper className="px-4 border-t border-gray-200">
      <footer className="w-full max-w-5xl mx-auto text-sm bg-white dark:border-neutral-700 dark:bg-neutral-900 hidden px-0">
        <ul className="grid w-full grid-cols-1 md:grid-cols-6 rounded-full border border-slate-100">
          {footer.columns.map((column, index) => (
            <li
              key={index}
              className="hidden md:flex items-center justify-center"
            >
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
      <div className="flex flex-col-reverse gap-y-3 py-2 sm:gap-y-0 sm:py-0 sm:flex-row items-center justify-between h-auto sm:h-10 text-xs text-center text-gray-500 border-t border-gray-200 dark:border-neutral-700 dark:text-neutral-200">
        <p>Immo Inversor © {currentYear}. Todos los derechos reservados.</p>
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
    </Wrapper>
  );
}
