"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

type Props = {
  text?: string;
  color?: string;
};

export default function DesireBanner({
  text = `Limited-time offer: Save $500 on bundle with code "BUNDLE2024" at checkout.`,
  color = "bg-red-500",
}: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        className={clsx("h-12 px-4 text-white drop-shadow-md", color)}
      >
        <div className="flex justify-between items-center h-12 w-full text-sm font-medium">
          <div></div>
          <span>{text}</span>
          <button
            onClick={handleClose}
            className="hover:text-white transition duration-300 ease-in-out rounded-lg hover:bg-red-600 
            h-7 w-7 flex items-center justify-center"
          >
            <X />
          </button>
        </div>
      </motion.div>
    )
  );
}
