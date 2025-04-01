"use client";

import GeographyChart from "./GeographyChart";
import SubtitleChart from "./SubtitleChart";
import DeviceChart from "./DeviceChart";
import SubscriberChart from "./SubscriberChart";
import AgeGenderChart from "./AgeGenderChart";
import ViewerActivityChart from "./ViewerActivityChart";

const chartData = [
  {
    ChartComponent: GeographyChart,
    title: "Geographic Distribution",
    description: "Primary viewer locations and their relative engagement:",
    details: [
      "Strong presence in Mexico (33.9%) and Peru (31.5%)",
      "Significant viewership from Argentina (19%)",
      "Growing audience in Spain and Colombia",
    ],
  },
  {
    ChartComponent: SubtitleChart,
    title: "Subtitle Usage",
    description: "Content accessibility and language preferences:",
    details: [
      "51.5% watch without subtitles",
      "High Spanish (Spain) subtitle usage (42.9%)",
      "Minimal use of auto-translated subtitles",
    ],
  },
  {
    ChartComponent: DeviceChart,
    title: "Device Distribution",
    description: "How viewers access our content:",
    details: [
      "Mobile dominance (53.3%)",
      "Strong TV viewership (38%)",
      "Desktop and tablet comprise 8.4% combined",
    ],
  },
  {
    ChartComponent: SubscriberChart,
    title: "Subscriber Analysis",
    description: "Viewer loyalty metrics:",
    details: [
      "99.1% of views from non-subscribers",
      "High potential for subscriber growth",
      "Opportunity for subscription drive",
    ],
  },
  {
    ChartComponent: AgeGenderChart,
    title: "Age and Gender Demographics",
    description: "Audience demographic breakdown:",
    details: [
      "Balanced gender distribution (55.5% male, 44.5% female)",
      "Strong 65+ demographic (32.8%)",
      "Significant 55-64 age group (18.9%)",
      "Growing younger audience (25-34: 14%)",
    ],
  },
  {
    ChartComponent: ViewerActivityChart,
    title: "Weekly Viewing Patterns",
    description: "When our audience is most active:",
    details: [
      "Peak viewing hours during morning and evening",
      "Consistent engagement throughout weekdays",
      "Weekend patterns show different viewing habits",
    ],
  },
];

export default function AnalyticsDashboard() {
  return (
    <section className="py-16 px-4 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Channel Analytics
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive analytics showing viewer demographics, engagement
          patterns, and content consumption preferences across our YouTube
          channel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chartData.map(
            ({ ChartComponent, title, description, details }, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="aspect-square flex items-center justify-center p-4 px-10">
                  <ChartComponent />
                </div>
                <div className="gap-2 bg-white p-4 flex flex-col justify-center px-8">
                  <h3 className="text-md font-semibold mb-2">{title}</h3>
                  <p className="text-xs text-gray-600">{description}</p>
                  <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                    {details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
