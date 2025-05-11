"use client";
import { useEffect, useState } from "react";
import CombinedCTA from "./action-pricing-combined";

export default function CombinedCTAABTestWrapper() {
  const [showPrice, setShowPrice] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("ab_show_price");
    if (stored === "shown" || stored === "hidden") {
      setShowPrice(stored === "shown");
    } else {
      const random = Math.random() < 0.5;
      setShowPrice(random);
      localStorage.setItem("ab_show_price", random ? "shown" : "hidden");
    }
  }, []);
  if (showPrice === null) return null;
  return <CombinedCTA showPrice={showPrice} />;
}
