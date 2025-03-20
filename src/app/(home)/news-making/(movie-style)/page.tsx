"use client"; // ✅ 클라이언트 컴포넌트 지정

import { useState } from "react";
import { Button } from "@/src/components/common/Button";
import ArtStyleCard from "@/src/components/news-making/card/ArtStyleCard";

const artStyles = [
    { id: 1, imageSrc: "/images/news-making/news-style-1.png", alt: "스타일 1" },
    { id: 2, imageSrc: "/images/news-making/news-style-2.png", alt: "스타일 2" },
    { id: 3, imageSrc: "/images/news-making/news-style-3.png", alt: "스타일 3" },
    { id: 4, imageSrc: "/images/news-making/news-style-4.png", alt: "스타일 4" },
];

export default function AiNews() {
    const [selectedStyle, setSelectedStyle] = useState<number | null>(null);

    return (
        <div className="flex flex-col items-center min-h-screen mt-[205px] gap-[40px]">
            <h2 className="text-xl font-bold">어떤 그림체로 영상을 생성할 건지 골라주세요.</h2>

            {/* ✅ 이미지 선택 영역 */}
            <div className="flex flex-wrap justify-center gap-[42px] max-w-[1200px] w-full">
                {artStyles.map((style) => (
                    <ArtStyleCard
                        key={style.id}
                        imageSrc={style.imageSrc}
                        altText={style.alt}
                        onClick={() => setSelectedStyle(style.id)} // ✅ 클릭 시 상태 변경
                        isSelected={selectedStyle === style.id} // ✅ 선택된 경우 스타일 변경
                    />
                ))}
            </div>

            {/* ✅ 선택된 경우 `NextButton` 스타일 변경 */}
            {/* 버튼 컨테이너 */}
            <div className="w-full flex justify-end">
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

            </div>

        </div>
    );
}
