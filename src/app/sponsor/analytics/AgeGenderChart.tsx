"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const AgeGenderChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
        datasets: [
          {
            label: "Female (44.5%)",
            data: [0.1, 4.1, 6.2, 5.2, 6.0, 8.4, 14.5],
            backgroundColor: "rgba(216, 180, 254, 0.8)",
            borderColor: "rgba(216, 180, 254, 1)",
            borderWidth: 1,
          },
          {
            label: "Male (55.5%)",
            data: [0.1, 5.1, 7.8, 6.4, 7.4, 10.5, 18.3],
            backgroundColor: "rgba(147, 51, 234, 0.8)",
            borderColor: "rgba(147, 51, 234, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
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

export default AgeGenderChart;
