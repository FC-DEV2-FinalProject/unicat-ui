"use client"; // ✅ 클라이언트 컴포넌트 지정

import React, { useState } from "react";
import { Button } from "@/src/components/common/Button";
import ArtStyleCard from "@/src/components/news-making/card/ArtStyleCard";
import StepIndicator from "@/src/components/news-making/StepIndicator";
import Image from "next/image";
import Link from "next/link";

const artStyles = [
    { id: 1, imageSrc: "/images/news-making/news-style-1.png", alt: "스타일 1" },
    { id: 2, imageSrc: "/images/news-making/news-style-2.png", alt: "스타일 2" },
    { id: 3, imageSrc: "/images/news-making/news-style-3.png", alt: "스타일 3" },
    { id: 4, imageSrc: "/images/news-making/news-style-4.png", alt: "스타일 4" },
];

export default function AiNews() {
    const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

    return (

        <div className="flex flex-col items-center min-h-screen gap-[40px]">
          {/* 헤더 */}
          <header className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-gray-5 font-bold-24 text-[24px] font-bold leading-[28px]">
                어떤 그림체로 영상을 생성할 건지 골라주세요.
              </h1>

              <div className="flex items-center">
                <div className="p-1">
                  <Image
                    alt="info"
                    src="/images/info.png"
                    width={20}
                    height={20}
                    priority
                  />
                </div>

                <div id ="뱃지자리" className="bg-base-700 text-basewhite px-2 py-1.5 rounded-lg">
                  <span className="font-bold-14 text-[14px] font-bold">
                    추후 단계에서 사용자가 직접 사진을 업로드할 수 있습니다.
                  </span>
                </div>
              </div>
            </div>

            <StepIndicator currentStep={1} totalSteps={4}/>
          </header>

            {/* ✅ 이미지 선택 영역 */}
            <div className="flex flex-wrap justify-center gap-[42px] max-w-[1200px] w-full">
                {artStyles.map((style) => (
                    <ArtStyleCard
                        key={style.id}
                        imageSrc={style.imageSrc}
                        altText={style.alt}
                        onClick={() => setSelectedStyle(style.id)} // ✅ 클릭 시 상태 변경
                        isSelected={selectedStyle === style.id} // ✅ 선택된 경우 스타일 변경
                        width={268}
                        height={300}
                    />
                ))}
            </div>

            {/* ✅ 선택된 경우 `NextButton` 스타일 변경 */}
            {/* 다음으로 버튼 컨테이너 */}
            <div className="w-full flex justify-end">
              <Link href="/news-making/thumbnail">
                <Button
                    className={`w-[268px] h-[80px] rounded-[15px] text-white font-bold text-[24px] transition-colors 
                        ${selectedStyle !== null ? "bg-purple-1" : "bg-gray-2"}`}
                    onClick={() => {
                        if (selectedStyle !== null) {
                            console.log("선택한 스타일 ID:", selectedStyle);
                            //handleNext(selectedStyle);
                        } else {
                            alert("스타일을 선택해주세요!");
                        }
                    }}
                >
                    다음으로
                </Button>
              </Link>
            </div>

        </div>
    );
}
