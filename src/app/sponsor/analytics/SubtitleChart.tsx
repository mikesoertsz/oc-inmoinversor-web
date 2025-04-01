"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SubtitleChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: [
          "No subtitles/CC",
          "Spanish (Spain)",
          "Spanish",
          "English (auto)",
          "Vietnamese (auto)",
        ],
        datasets: [
          {
            label: "Subtitle Usage (%)",
            data: [51.5, 42.9, 1.3, 0.0, 0.0],
            backgroundColor: "rgba(147, 51, 234, 0.5)",
            borderColor: "rgba(147, 51, 234, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          y: {
            grid: {
              display: false,
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

export default SubtitleChart;
