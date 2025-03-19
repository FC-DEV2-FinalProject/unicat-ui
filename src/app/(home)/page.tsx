import { Card, CardContent } from "@/src/components/ui/card/card";
import React, { JSX } from "react";

export default function AiNews(): JSX.Element {
  // Project data for the first row
  const firstRowProjects = [
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
    {
      image: "/images/dummy-thumbnail.png",
      title: "피겨스케이팅 2025년 선수권 대회 입상",
      description: "네 입상했다고 하네요(내용 간단한...)",
    },
  ];

  // Project data for the second row
  const secondRowProjects = [
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
    {
      image: "/images/dummy-thumbnail.png",
      title: "피겨스케이팅 2025년 선수권 대회 입상",
      description: "네 입상했다고 하네요(내용 간단한...)",
    },
  ];

  return (
      <div className="flex flex-col items-center justify-center gap-[90px] relative bg-purple-6 min-h-screen">
        {/* Main Content */}
        <main className="flex flex-col w-full max-w-[1200px] items-start gap-6 relative flex-[0_0_auto]">
          {/* Hero Section */}
          <section className="relative w-full h-[262px] rounded-2xl overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/images/news-making-background.png')" }}
            >
              {/* 내용 전체를 감싸는 div (위 50px, 왼쪽 32px 여백) */}
              <div className="absolute top-[50px] left-[32px] flex flex-col">
                {/* "뉴스에 대한 어떠한 의견"과 "뉴스만들기" 사이 간격 12px */}
                <div className="text-gray-5 font-bold-18 font-semibold mb-[12px]">
                  뉴스에 대한 어떠한 의견
                </div>
                {/* "뉴스만들기"와 버튼 사이 간격 42px */}
                <div className="text-gray-5 font-bold text-[length:var(--bold-32-font-size)]  mb-[32px]">
                  뉴스만들기
                </div>
                {/* 버튼 이미지 (185px × 52px) */}
                <img
                    src="/images/news-making-button.png"
                    alt="뉴스 제작하기 버튼"
                    className="w-[185px] h-[52px] cursor-pointer"
                />
              </div>

            </div>
          </section>


          {/* Projects Section */}
          <h2 className="font-bold-24 text-gray-5 font-bold text-[length:var(--bold-24-font-size)] tracking-[var(--bold-24-letter-spacing)] leading-[var(--bold-24-line-height)]">
            만든 프로젝트
          </h2>

          {/* First Project Row */}
          <Card className="w-full h-[306px] bg-white rounded-2xl border border-solid border-gray-1 shadow-[0px_1px_8px_2px_#0000000a]">
            <div className="flex w-full h-8 items-center gap-8 p-5 pb-0">
              <div className="font-med-20 text-base-900 text-[length:var(--med-20-font-size)] tracking-[var(--med-20-letter-spacing)] leading-[var(--med-20-line-height)]">
                2025.03.02
              </div>
            </div>
            <CardContent className="flex w-full items-center justify-between pt-[72px] px-6 pb-6">
              {firstRowProjects.map((project, index) => (
                  <div key={index} className="relative w-[368px] h-[210px]">
                    <div className="relative h-[210px] bg-base-50 rounded-xl overflow-hidden">
                      <img
                          className="absolute w-[368px] h-[140px] top-0 left-0 object-cover"
                          alt="Project thumbnail"
                          src={project.image}
                      />
                      <div className="absolute w-[343px] top-[150px] left-4 font-bold-16 text-gray-5 text-[length:var(--bold-16-font-size)] text-center tracking-[var(--bold-16-letter-spacing)] leading-[var(--bold-16-line-height)]">
                        {project.title}
                      </div>
                      <div className="absolute w-[343px] top-44 left-4 font-normal text-gray-5 text-base text-center tracking-[0] leading-5">
                        {project.description}
                      </div>
                    </div>
                  </div>
              ))}
            </CardContent>
          </Card>

          {/* Second Project Row */}
          <Card className="w-full h-[306px] bg-white rounded-2xl border border-solid border-gray-1 shadow-[0px_1px_8px_2px_#0000000a]">
            <div className="flex w-full h-8 items-center gap-8 p-5 pb-0">
              <div className="font-med-20 text-base-900 text-[length:var(--med-20-font-size)] tracking-[var(--med-20-letter-spacing)] leading-[var(--med-20-line-height)]">
                2025.02.26
              </div>
            </div>
            <CardContent className="flex w-full items-center justify-between pt-[72px] px-6 pb-6">
              {secondRowProjects.map((project, index) => (
                  <div key={index} className="relative w-[368px] h-[210px]">
                    <div className="relative h-[210px] bg-base-50 rounded-xl overflow-hidden">
                      <img
                          className="absolute w-[368px] h-[140px] top-0 left-0 object-cover"
                          alt="Project thumbnail"
                          src={project.image}
                      />
                      <div className="absolute w-[343px] top-[150px] left-4 font-bold-16 text-gray-5 text-[length:var(--bold-16-font-size)] text-center tracking-[var(--bold-16-letter-spacing)] leading-[var(--bold-16-line-height)]">
                        {project.title}
                      </div>
                      <div className="absolute w-[343px] top-44 left-4 font-normal text-gray-5 text-base text-center tracking-[0] leading-5">
                        {project.description}
                      </div>
                    </div>
                  </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
  );
}
