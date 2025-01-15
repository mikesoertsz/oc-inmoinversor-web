"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti-boom";

const thankyou = {
  title: "¡Gracias!",
  message: "Su consulta ha sido enviada con éxito.",
};

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 500); // Start confetti after 1 second

    const stopTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 6000); // Stop confetti after 5 seconds

    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return (
    <main className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center fillscreen">
        {showConfetti && (
          <Confetti
            mode="boom"
            particleCount={200}
            shapeSize={12}
            colors={["#ff577f", "#ff884b", "#ffd384", "#fff9b0"]}
          />
        )}
        <h1 className="text-4xl font-bold">{thankyou.title}</h1>
        <p className="text-lg mt-4">{thankyou.message}</p>
        <Button variant="ghost" className="mt-9 gap-2 hover:pointer">
          <ChevronLeft className="" size={16} />
          Volver al inicio
        </Button>
      </div>
    </main>
  );
}
