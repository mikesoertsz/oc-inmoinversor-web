import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type NavLink = {
  text: string;
  url: string;
};

const navLinks: NavLink[] = [
  { text: "Historia", url: "/story" },
  { text: "Blog", url: "/blog" },
  // { text: "Boletín", url: "/newsletter" },
  // { text: "Recursos", url: "/resources" },
];

export default function NavMain() {
  return (
    <nav className="bg-black text-white py-4 px-0 flex w-full">
      <div className="flex w-full mx-auto px-4 justify-between items-center">
        <div className="text-lg font-semibold flex items-center">
          <Link href="/" className="hover:underline flex items-center">
            <Image
              src="/img/logo-navv.png"
              alt="Logo"
              width={100}
              height={50}
              className="mr-2"
            />
          </Link>
          <ul className="flex text-sm font-medium text-gray-300 ml-8">
            {navLinks.map((link, index) => (
              <li key={index} className="">
                <Button
                  variant="link"
                  asChild
                  className="hover:no-underline hover:text-white transition duration-300 ease-in-out text-gray-300 font-title text-[17px] font-medium"
                >
                  <Link href={link.url}>{link.text}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="secondary"
            asChild
            className="font-medium font-title"
          >
            <Link href="/course">Ver Curso</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
