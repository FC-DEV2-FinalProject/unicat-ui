"use client";

import { MovieList } from "@/src/components/home/MovieList";
import { groupMoviesByDate } from "@/src/components/home/MovieCardGroup";
import React, { JSX } from "react";
import Image from "next/image";
import { DummyMovie } from '@/src/types/newsMakingTypes';
import { useRouter } from "next/navigation";

const dummyMovies: DummyMovie[] = [
  { id: 1, image: "/images/dummy-thumbnail.png", title: "피겨스케이팅 2025", description: "입상했습니다.", date: "2025.03.02" },
  { id: 2, image: "/images/dummy-thumbnail.png", title: "다큐멘터리 제작", description: "AI 기술을 활용한 다큐멘터리", date: "2025.03.02" },
  { id: 3, image: "/images/dummy-thumbnail.png", title: "뉴스 보도", description: "최근 이슈 뉴스 보도", date: "2025.03.02" },
  { id: 4, image: "/images/dummy-thumbnail.png", title: "스포츠 뉴스", description: "국제 스포츠 경기 소식", date: "2025.02.26" },
  { id: 5, image: "/images/dummy-thumbnail.png", title: "경제 뉴스", description: "금융 시장 업데이트", date: "2025.02.26" },
  { id: 6, image: "/images/dummy-thumbnail.png", title: "연예 뉴스", description: "최신 연예 뉴스", date: "2025.02.26" },
  { id: 7, image: "/images/dummy-thumbnail.png", title: "테크 뉴스", description: "최신 기술 동향", date: "2025.02.25" },
];

const homeDashboardMovies = groupMoviesByDate(dummyMovies, { maxItemsPerDate: 3, sortByDate: "desc" });

export default function AiNews(): JSX.Element {
  const router = useRouter();

  const handleCreateProject = async () => {
    try {
      const project = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: "새로운 프로젝트",
          content: "",
          artStyleId: 0
        })
      }).then(res => res.json());
      router.push(`/news-making/artStyle?projectId=${project.id}`);
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("프로젝트 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // Project data for the first row

  return (
      <div className="mt-[105px] flex flex-col items-center justify-center gap-[90px] relative bg-purple-6 min-h-screen">
        {/* Main Content */}
        <main className="flex flex-col w-full w-[1200px] max-w-[1200px] items-start gap-6 relative flex-[0_0_auto]">
          {/* Hero Section */}
          <section className="relative w-full h-[262px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-cover bg-center">
              <Image
                  src="/images/news-making-background.png"
                  alt="뉴스 메이킹 배경"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
              />
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
                <div className="relative">
                  <Image
                      src="/images/news-making-button.png"
                      alt="뉴스 제작하기 버튼"
                      width={185}
                      height={52}
                      className="cursor-pointer"
                      onClick={handleCreateProject}
                  />
                </div>
              </div>
            </div>
          </section>


          {/* Projects Section */}
          <h2 className="font-bold-24 text-gray-5 font-bold text-[length:var(--bold-24-font-size)] tracking-[var(--bold-24-letter-spacing)] leading-[var(--bold-24-line-height)]">
            만든 프로젝트
          </h2>

          {/* ✅ 날짜별로 동적으로 `MovieList` 생성 (시간순 정렬 포함) */}
          {homeDashboardMovies.map(({ date, movies }) => (
              <MovieList
                  key={date}
                  className="min-w-[1000px] w-full bg-white rounded-2xl border border-solid border-gray-1 shadow-md p-5"
                  movies={movies}
              />
          ))}

        </main>
      </div>
  );
}
