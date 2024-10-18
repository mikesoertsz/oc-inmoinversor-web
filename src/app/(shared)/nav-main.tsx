import Image from "next/image";
import React from "react";

type NavLink = {
  text: string;
  url: string;
};

const navLinks: NavLink[] = [
  { text: "About", url: "/about" },
  { text: "Blog", url: "/blog" },
];

export default function NavMain() {
  return (
    <nav className="bg-brand-bg1 text-white py-4 px-0 flex w-full">
      <div className="flex w-full mx-auto px-4 justify-between items-center">
        <div className="text-lg font-semibold">
          <a href="/" className="hover:underline">
            <Image
              src="/img/logo-navv.png"
              alt="Logo"
              width={100}
              height={50}
              className=""
            />
          </a>
        </div>
        <div className="flex items-center justify-center gap-4">
          <ul className="flex gap-1 text-sm font-medium text-gray-300 mr-4">
            {navLinks.map((link, index) => (
              <li key={index} className="px-3">
                <a href={link.url} className="hover:underline">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <a
              href="https://youtube.com"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold text-sm font-title"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
