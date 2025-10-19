"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";

export default function CoursePopupDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(6);

  useEffect(() => {
    // Check if user has already seen the popup
    // For testing: uncomment the line below to reset popup state
    // localStorage.removeItem("course-popup-seen");

    const hasSeenPopup = localStorage.getItem("course-popup-seen");
    if (!hasSeenPopup) {
      setIsOpen(true);
      // Track popup display
      trackEvent("popup_displayed", "engagement", "course_popup");
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("course-popup-seen", "true");
    // Track popup close
    trackEvent("popup_closed", "engagement", "course_popup");
  };

  const handleButtonClick = () => {
    // Track button click before navigation
    trackEvent("popup_cta_clicked", "conversion", "course_popup");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-white border-0 shadow-2xl">
        {/* Timer */}
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
            Se cierra en {timeLeft}s
          </div>
        </div>

        <div className="relative">
          {/* Course Poster Image */}
          <div className="aspect-[4/3] relative">
            <Image
              src="/img/guillermo.jpg"
              alt="Curso de Inversión Inmobiliaria - InmoInversor"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Course badge */}
            <div className="absolute top-6 right-6 bg-brand-highlight text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              NUEVO CURSO
            </div>
          </div>

          {/* Large CTA Button - Bottom Left */}
          <div className="absolute bottom-6 left-6 z-20">
            <Button
              asChild
              size="lg"
              className="bg-brand-highlight hover:bg-brand-highlight/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={handleButtonClick}
            >
              <Link href="/course">¡Descubre el Curso!</Link>
            </Button>
          </div>

          {/* Course title overlay */}
          <div className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
              Curso de Inversión Inmobiliaria
            </h2>
            <p className="text-lg opacity-90 drop-shadow-md">
              Aprende a invertir en bienes raíces con expertos
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
