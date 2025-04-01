"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DeviceChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Mobile phone", "TV", "Computer", "Tablet"],
        datasets: [
          {
            data: [53.3, 38.0, 4.8, 3.6],
            backgroundColor: [
              "rgba(147, 51, 234, 0.8)",
              "rgba(168, 85, 247, 0.8)",
              "rgba(192, 132, 252, 0.8)",
              "rgba(216, 180, 254, 0.8)",
            ],
            borderColor: [
              "rgba(147, 51, 234, 1)",
              "rgba(168, 85, 247, 1)",
              "rgba(192, 132, 252, 1)",
              "rgba(216, 180, 254, 1)",
            ],
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

export default DeviceChart;
