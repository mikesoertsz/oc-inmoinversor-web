"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { SlMenu } from "react-icons/sl";
import MobileNavbar from "./nav-mobile";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

const content = {
  navLinks: [
    { text: "Home", url: "/" },
    { text: "Historia", url: "/story" },
    { text: "Blog", url: "/blog" },
    { text: "Patrocinio", url: "/sponsor" },
  ],
  socialLinks: [
    {
      name: "YouTube",
      url: "https://www.youtube.com/channel/UCUt1LXPzzrOVe7PyYNYVjFQ",
      icon: <FaYoutube size={24} />,
      hoverColor: "#FF0000",
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/34609254352",
      icon: <IoLogoWhatsapp size={22} />,
      hoverColor: "#25D366",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/inmo.inversores",
      icon: <FaInstagram size={18} />,
      hoverColor: "#E1306C",
    },
    {
      name: "Twitter",
      url: "https://x.com/inmoinversores",
      icon: <FaXTwitter size={18} />,
      hoverColor: "#1DA1F2",
    },
  ],
};

export default function NavMain() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <MobileNavbar
        navitems={content.navLinks}
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

      <nav
        className={`bg-gray-900 text-white py-3 flex w-full mx-auto pl-4 pr-1 justify-between items-center`}
      >
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
            {content.navLinks.map((link, index) => (
              <li key={index} className="">
                <Button
                  variant="link"
                  asChild
                  className="hover:no-underline hover:text-white transition duration-300 ease-in-out text-gray-300 font-title text-[17px] font-medium text-xs"
                >
                  <Link href={link.url}>{link.text}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex items-center justify-center gap-4">
          {content.socialLinks.map((social, index) => (
            <li key={index}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-[${social.hoverColor}] transition duration-300 ease-in-out`}
              >
                {social.icon}
              </a>
            </li>
          ))}
          <li>
            <Button
              variant="secondary"
              asChild
              className="font-medium font-title px-8"
            >
              <Link href="/course">Ver Curso</Link>
            </Button>
          </li>
          <li>
            <Button
              onClick={() => setOpenNav((e) => !e)}
              className="sm:hidden inline-block"
            >
              {openNav ? <GrClose /> : <SlMenu />}
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
