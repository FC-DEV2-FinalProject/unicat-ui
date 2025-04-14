import { Card, CardContent } from "@/src/components/common/Card";
import { JSX } from "react";
import { DashboardResponse } from "@/src/types/DashboardTypes";
import Link from "next/link";

async function getDashboardData(): Promise<DashboardResponse> {
  const response = await fetch(`${process.env.API_URL}/dashboard`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}

export default async function Dashboard(): Promise<JSX.Element> {
  const dashboardData = await getDashboardData();

  return (
    <div>
      <h2 className="mt-10 mb-5 font-bold-24 text-gray-5 font-bold text-[length:var(--bold-24-font-size)] tracking-[var(--bold-24-letter-spacing)] leading-[var(--bold-24-line-height)]">
        만든 프로젝트
      </h2>

      {/* First Project Row */}
      <Card className="w-full bg-white rounded-2xl border border-solid border-gray-1 shadow-[0px_1px_8px_2px_#0000000a]">
        <div className="flex w-full items-center gap-8 p-5 pb-0">
          <div className="font-med-20 text-base-900 text-[length:var(--med-20-font-size)] tracking-[var(--med-20-letter-spacing)] leading-[var(--med-20-line-height)]">
            {new Date(
              dashboardData.content[0]?.createdAt || ""
            ).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
        </div>
        <CardContent className="flex w-full flex-wrap items-center justify-start gap-6 px-6 py-6">
          {dashboardData.content.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/${project.id}`}
              className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[380px] min-w-[280px]"
            >
              <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden hover:bg-slate-100 transition-colors">
                <div className="w-full bg-[#000000] min-h-[320px] rounded-xl overflow-hidden flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain bg-[#000000]"
                    alt="Project thumbnail"
                    src={project.thumbnailUrl}
                  />
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <div className="font-bold-16 text-gray-5 text-[length:var(--bold-16-font-size)] text-center tracking-[var(--bold-16-letter-spacing)] leading-[var(--bold-16-line-height)] line-clamp-2 font-bold">
                    {project.title}
                  </div>
                  <div className="font-normal text-gray-5 text-base text-center tracking-[0] leading-5 line-clamp-2">
                    {project.subtitle}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
