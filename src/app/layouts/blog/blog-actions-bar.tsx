"use client";
import React, { useState } from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaDiscord,
  FaTiktok,
  FaRegBookmark,
} from "react-icons/fa";
import { PiHandsClappingDuotone, PiHandsClappingFill } from "react-icons/pi";

const socialMediaIcons = [
  { icon: FaTwitter, url: "https://twitter.com/yourbrand" },
  { icon: FaLinkedin, url: "https://linkedin.com/company/yourbrand" },
  { icon: FaInstagram, url: "https://instagram.com/yourbrand" },
  { icon: FaYoutube, url: "https://youtube.com/yourbrand" },
  { icon: FaDiscord, url: "https://discord.com/yourbrand" },
  { icon: FaTiktok, url: "https://tiktok.com/@yourbrand" },
];

export default function BlogActionsBar() {
  const [clapCount, setClapCount] = useState(102);
  const [clapped, setClapped] = useState(false);

  const handleClapClick = () => {
    setClapped(!clapped);
    setClapCount(clapped ? clapCount - 1 : clapCount + 1);
  };

  return (
    <div className="flex gap-2">
      <div className="rounded-full p-2 border border-gray-200 flex gap-2 px-3 h-8 items-center justify-center relative">
        <span
          style={{ color: clapped ? "orange" : "gray" }}
          onClick={handleClapClick}
        >
          {clapped ? (
            <PiHandsClappingFill size={18} />
          ) : (
            <PiHandsClappingDuotone size={18} />
          )}
        </span>
        <span className="text-xs font-medium pr-2">{clapCount}</span>
        <button className="flex items-center justify-center">
          <FaRegBookmark className="" size={14} />
        </button>
      </div>
      <ul className="flex gap-3 items-center justify-center rounded-full p-2 border border-gray-200 px-4">
        {socialMediaIcons.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <social.icon className="" size={14} />
          </a>
        ))}
      </ul>
    </div>
  );
}
