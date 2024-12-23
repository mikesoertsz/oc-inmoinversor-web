"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
    backgroundImage?: string;
    logoSvg?: React.ReactNode;
    quote: string;
    author: string;
    designation: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
    backgroundImage = "https://antimetal.com/images/wall/gnosis.png",
    logoSvg,
    quote,
    author,
    designation,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1200px] relative rounded-2xl overflow-hidden"
        >
            {/* Background Image */}
            <div className="relative h-[532px] w-full">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

                {/* Content Container */}
                <div className="absolute bottom-0 left-0 w-full p-12 md:p-14 text-white">
                    {/* Logo */}
                    {logoSvg || (
                        <div className="w-32 h-9 bg-white/10 rounded flex items-center justify-center">
                            <span className="text-white text-xl font-bold">POLITICO</span>
                        </div>
                    )}

                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="my-10 text-lg md:text-xl lg:text-2xl font-light leading-tight tracking-tight"
                    >

                        <div className="space-1">
                            {'"'}{quote.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                </span>
                            ))}{'"'}
                        </div>
                    </motion.div>

                    {/* Author Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="text-lg font-medium">{author}</div>
                        <div className="text-sm text-white/60">{designation}</div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialCard
