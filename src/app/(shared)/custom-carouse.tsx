"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "./carousel-card";

// Reusable AnimatedTitle Component
const AnimatedTitle = ({ currentCompany }: { currentCompany: string }) => {
    const [resetDots, setResetDots] = useState(false);

    useEffect(() => {
        setResetDots(true);
        const timeout = setTimeout(() => setResetDots(false), 0);
        return () => clearTimeout(timeout);
    }, [currentCompany]);

    return (
        <div className="text-4xl md:text-5xl font-semibold text-center mb-6">
            Why
            <div className="relative mx-3 inline-block align-middle">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCompany}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-center"
                    >
                        {currentCompany.split("").map((letter, i) => (
                            <motion.span
                                key={`${letter}-${i}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.06,
                                    ease: "easeOut",
                                }}
                                className="inline-block"
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
            loves Antimetal
        </div>
    );
};

// Reusable TestimonialWall Component
interface Testimonial {
    quote: string;
    author: string;
    designation: string;
}

interface TestimonialWallProps {
    companies: string[];
    testimonials: Testimonial[];
    subtitle: string;
    description: string;
}

const TestimonialWall = ({ companies, testimonials, subtitle, description }: TestimonialWallProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full py-16">
            {/* Subtitle */}
            <div className="text-gray-600 text-center mb-4">{subtitle}</div>

            {/* Animated Title */}
            <AnimatedTitle currentCompany={companies[activeIndex]} />

            {/* Description */}
            <div className="text-gray-600 text-center mb-12">{description}</div>

            {/* Testimonial Slider */}
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                breakpoints={{
                    480: { slidesPerView: 1.25, spaceBetween: 2 },
                    780: { slidesPerView: 1.5, spaceBetween: 4 },
                    980: { slidesPerView: 2, spaceBetween: 8 },
                }}
                centeredSlides
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className="h-full w-full">
                        <div>
                            <TestimonialCard
                                quote={testimonial.quote}
                                author={testimonial.author}
                                designation={testimonial.designation}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TestimonialWall;
