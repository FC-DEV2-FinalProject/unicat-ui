"use client"; // ✅ 클라이언트 컴포넌트 지정

import React from "react";
import { Button } from "@/src/components/common/Button";
import ArtStyleCard from "@/src/components/news-making/card/ArtStyleCard";
import StepIndicator from "@/src/components/news-making/StepIndicator";
import Image from "next/image";
import Link from "next/link";
import { useArtStyleStore } from "@/src/store/useNewsMakingStore";
import { ART_STYLES } from "@/src/constants/artStyles";
import { useSearchParams } from 'next/navigation';

export default function AiNews() {
    const { selectedArtStyleId } = useArtStyleStore();
    const searchParams = useSearchParams();
    const projectId = searchParams.get('projectId');

    return (
        <div className="mt-[105px] flex flex-col items-center min-h-screen gap-[40px]">
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

                        <div id="뱃지자리" className="bg-base-700 text-basewhite px-2 py-1.5 rounded-lg">
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
                {ART_STYLES.map((style) => (
                    <ArtStyleCard
                        key={style.id}
                        artStyleId={style.id}
                        imageSrc={style.imageSrc}
                        altText={style.alt}
                        isSelected={selectedArtStyleId === style.id}
                        width={268}
                        height={300}
                        projectId={projectId ? parseInt(projectId) : undefined}
                    />
                ))}
            </div>

            {/* 다음으로 버튼 컨테이너 */}
            <div className="w-full flex justify-end">
              <Link href="/news-making/thumbnail">
                <Button
                    className={`w-[268px] h-[80px] rounded-[15px] text-white font-bold text-[24px] transition-colors 
                        ${selectedArtStyleId !== 0 ? "bg-purple-1" : "bg-gray-2"}`}
                    onClick={() => {
                        if (selectedArtStyleId === 0) {
                            alert("스타일을 선택해주세요!");
                        } else {
                            console.log("선택한 스타일 ID:", selectedArtStyleId);
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
