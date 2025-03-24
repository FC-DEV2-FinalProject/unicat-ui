import { Card, CardContent} from "@/src/components/common/Card";
import { JSX } from "react";

export default function Dashboard(): JSX.Element {
  // Project data for the first row
  const firstRowProjects = [
    {
      image: "/images/dummy-thumbnail.png",
      title: "2025년 피겨 스케이팅 수상",
      description: "네 입상했다고 하네요(내용 간단한...)",
    },
    {
      image: "/images/dummy-thumbnail.png",
      title: "피겨스케이팅 2025년 선수권 대회 입상",
      description: "네 입상했다고 하네요(내용 간단한...)",
    },
    {
      image: "/images/dummy-thumbnail.png",
      title: "피겨스케이팅 2025년 선수권 대회 입상",
      description: "네 입상했다고 하네요(내용 간단한...)",
    },
  ];

  return (
    <div>
      <h2 className="mb-5 font-bold-24 text-gray-5 font-bold text-[length:var(--bold-24-font-size)] tracking-[var(--bold-24-letter-spacing)] leading-[var(--bold-24-line-height)]">
        만든 프로젝트
      </h2>

      {/* First Project Row */}
      <Card className="w-full bg-white rounded-2xl border border-solid border-gray-1 shadow-[0px_1px_8px_2px_#0000000a]">
        <div className="flex w-full items-center gap-8 p-5 pb-0">
          <div className="font-med-20 text-base-900 text-[length:var(--med-20-font-size)] tracking-[var(--med-20-letter-spacing)] leading-[var(--med-20-line-height)]">
            2025.03.02
          </div>
        </div>
        <CardContent className="flex w-full flex-wrap items-center justify-center gap-6 px-6 py-6">
          {firstRowProjects.map((project, index) => (
            <div
              key={index}
              className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] h-[210px] min-w-[280px]"
            >
              <div className="flex flex-col h-full bg-slate-50 rounded-xl overflow-hidden">
                <img
                  className="w-full h-[140px] object-cover"
                  alt="Project thumbnail"
                  src={project.image}
                />
                <div className="flex flex-col gap-2 p-4">
                  <div className="font-bold-16 text-gray-5 text-[length:var(--bold-16-font-size)] text-center tracking-[var(--bold-16-letter-spacing)] leading-[var(--bold-16-line-height)] line-clamp-2 font-bold">
                    {project.title}
                  </div>
                  <div className="font-normal text-gray-5 text-base text-center tracking-[0] leading-5 line-clamp-2">
                    {project.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
