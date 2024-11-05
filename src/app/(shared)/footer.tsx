import { getLatestArticleAction } from "@/server/actions/articles";
import Image from "next/image";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
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
      title: "Resources Section",
      links: [
        { text: "Blog Articles", url: "/blog" },
        { text: "Investment Tools", url: "/tools" },
        { text: "Market Insights", url: "/insights" },
        { text: "Contact Us", url: "/contact" },
        { text: "About Us", url: "/about" },
      ],
    },
    {
      title: "Connect With Us",
      links: [
        { text: "Webinars", url: "/webinars" },
        { text: "Events", url: "/events" },
        { text: "Case Studies", url: "/case-studies" },
        { text: "FAQs", url: "/faqs" },
        { text: "Resource Library", url: "/resources" },
      ],
    },
    {
      title: "Social Media",
      links: [
        { text: "Facebook", url: "https://facebook.com" },
        { text: "Instagram", url: "https://instagram.com" },
        { text: "X", url: "https://twitter.com" },
        { text: "LinkedIn", url: "https://linkedin.com" },
        { text: "YouTube", url: "https://youtube.com" },
        { text: "Discord", url: "https://discord.com" },
      ],
    },
  ],
};

export default async function Footer() {
  const latestArticle = await getLatestArticleAction();

  return (
    <footer className="bg-white pt-8 text-sm border-t border-gray-200 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Latest Video</h3>
            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden bg-slate-100 dark:bg-neutral-900">
              <a
                href={latestArticle.video_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={latestArticle.image}
                  alt={latestArticle.title}
                  fill
                  className="aspect-video absolute inset-0"
                />
              </a>
            </div>
            <a
              href="https://youtube.com/channel/your-channel-id" // Replace with your YouTube channel URL
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 dark:bg-white dark:text-neutral-900"
            >
              Watch on YouTube
            </a>
          </div>
          {footer.columns.map((column, index) => (
            <div key={index} className="hidden md:block">
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <a href={link.url} className="hover:underline">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 flex items-center justify-between px-8 border-t border-gray-200 h-10 text-gray-500 text-xs dark:border-neutral-700 dark:text-neutral-200">
          <p>© 2024 Immo Inversor. All rights reserved.</p>
          <div className="flex justify-center gap-2">
            <a href="https://facebook.com" className="hover:underline">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" className="hover:underline">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" className="hover:underline">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="hover:underline">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="https://youtube.com" className="hover:underline">
              <FaYoutube className="w-6 h-6" />
            </a>
            <a href="https://discord.com" className="hover:underline">
              <FaDiscord className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
