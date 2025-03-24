"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const dummyAnalyticsData = {
  labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  datasets: [
    {
      label: "조회수",
      data: [120, 190, 300, 500, 220, 330, 410, 290, 370, 450, 390, 480],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
    {
      label: "좋아요 수",
      data: [20, 40, 60, 80, 50, 70, 90, 65, 72, 85, 74, 91],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "댓글 수",
      data: [23, 8, 12, 15, 9, 11, 14, 10, 13, 16, 14, 17],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    },
  ],
};

export default function YoutubeAnalytics() {
  return (
    <div className="flex flex-col items-center min-h-screen mt-[205px] gap-[40px]">
      <header className="flex w-full items-center justify-between">
        <h1 className="text-gray-5 font-bold-24 text-[24px] font-bold leading-[28px]">
          YouTube 통계
        </h1>
      </header>

      {/* 그래프 */}
      <div className="w-full max-w-[800px]">
        <Bar
          data={dummyAnalyticsData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
