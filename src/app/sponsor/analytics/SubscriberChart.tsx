"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SubscriberChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "pie",
      data: {
        labels: ["Not subscribed", "Subscribed"],
        datasets: [
          {
            data: [99.1, 0.9],
            backgroundColor: [
              "rgba(147, 51, 234, 0.8)",
              "rgba(192, 132, 252, 0.8)",
            ],
            borderColor: ["rgba(147, 51, 234, 1)", "rgba(192, 132, 252, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div style={{ height: "300px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default SubscriberChart;
