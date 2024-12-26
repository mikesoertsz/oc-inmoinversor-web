"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import MobileNavbar from "./nav-mobile";
import { SlMenu } from "react-icons/sl";
import { GrClose } from "react-icons/gr";

type NavLink = {
  text: string;
  url: string;
};

const navLinks: NavLink[] = [
  { text: "Historia", url: "/story" },
  { text: "Blog", url: "/blog" },
];

export default function NavMain() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <nav
      className={`bg-black text-white py-4 px-0 flex w-full max-w-[100vw] sm:overflow-hidden ${
        openNav ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      <MobileNavbar
        navitems={navLinks}
        buttons={[
          {
            text: "Ver en YouTube",
            icon: (
              <FaYoutube size={20} className="mr-2 text-sm text-[#FF0000]" />
            ),
            url: "https://www.youtube.com/@Inmoinversores",
          },
        ]}
        open={openNav}
      />
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
          <ul className="hidden sm:flex text-sm font-medium text-gray-300 ml-8">
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
            variant="link"
            asChild
            className="hidden  hover:no-underline hover:text-white transition duration-300 ease-in-out text-gray-300 font-title font-medium sm:flex items-center"
          >
            <a
              href="https://www.youtube.com/@Inmoinversores"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} className="mr-2 text-sm text-[#FF0000]" />
              Ver en YouTube
            </a>
          </Button>
          <Button
            variant="secondary"
            asChild
            className="font-medium font-title"
          >
            <Link href="/course">Ver Curso</Link>
          </Button>
          <Button
            onClick={() => setOpenNav((e) => !e)}
            className="sm:hidden inline-block"
          >
            {openNav ? <GrClose /> : <SlMenu />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
