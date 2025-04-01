"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ViewerActivityChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Generate 24 hours
    const hours = Array.from(
      { length: 24 },
      (_, i) => i.toString().padStart(2, "0") + ":00"
    );

    // Create datasets for each day
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const datasets = days.map((day, index) => ({
      label: day,
      data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
      backgroundColor: `rgba(147, 51, 234, ${0.3 + index * 0.1})`,
      borderColor: `rgba(147, 51, 234, ${0.5 + index * 0.1})`,
      borderWidth: 1,
    }));

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: hours,
        datasets: datasets,
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
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
              callback: function (value, index) {
                return index % 3 === 0 ? value : "";
              },
            },
          },
          y: {
            stacked: true,
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

export default ViewerActivityChart;
