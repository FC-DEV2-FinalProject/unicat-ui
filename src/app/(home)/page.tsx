"use client";

import { MovieList } from "@/src/components/home/MovieList";
import { groupMoviesByDate } from "@/src/components/home/MovieCardGroup";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { DummyMovie } from '@/src/types/newsMakingTypes';
import { CreateProjectButton } from "@/src/components/home/CreateProjectButton";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter } from "next/navigation";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getCookie } from "cookies-next";

const dummyMovies: DummyMovie[] = [
  { id: 1, image: "/images/news-mock.png", title: "악어의 하루", description: " ", date: "2025.04.03" },
  { id: 2, image: "/images/news-mock3.png", title: "쇼츠에 썸네일 넣는 방법", description: " ", date: "2025.04.03" },
  { id: 3, image: "/images/news-mock.png", title: "악어의 하루", description: " ", date: "2025.04.03" },
  { id: 4, image: "/images/news-mock4.png", title: "해변에서 인생샷 찍는 방법", description: " ", date: "2025.04.03" },
];

const homeDashboardMovies = groupMoviesByDate(dummyMovies, { maxItemsPerDate: 3, sortByDate: "desc" });

export default function AiNews(): JSX.Element | null {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: 인증 체크 복구
  // useEffect(() => {
  //   // 토큰 확인
  //   const authToken = getCookie("Authorization");
  //   const tokenCookie = getCookie("token");
  //   const authTokenLower = getCookie("authorization");
  //   
  //   const hasToken = authToken || tokenCookie || authTokenLower;
  //   
  //   if (!hasToken) {
  //     router.replace("/login");
  //   } else {
  //     setIsAuthenticated(true);
  //   }
  // }, [router]);

  // 인증 체크 임시 비활성화 (항상 true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAuthenticated = true;

  // 인증되지 않은 경우 아무것도 렌더링하지 않음
  // if (!isAuthenticated) {
  //   return null;
  // }

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
                AI 기술로 만드는 나만의 맞춤 영상
              </div>
              {/* "뉴스만들기"와 버튼 사이 간격 42px */}
              <div className="text-gray-5 font-bold text-[length:var(--bold-32-font-size)]  mb-[32px]">
                영상만들기
              </div>
              {/* 프로젝트 생성 버튼 */}
              <CreateProjectButton />
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
