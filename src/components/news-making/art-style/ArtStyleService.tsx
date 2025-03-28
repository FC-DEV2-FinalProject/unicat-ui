"use client";

import { useProjectStore } from "@/src/store/useNewsMakingStore";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from "react";
import Image from 'next/image';
import ArtStyleCard from "@/src/components/news-making/art-style/ArtStyleCard";
import StepIndicator from "@/src/components/news-making/StepIndicator";
import { ART_STYLES } from "@/src/constants/artStyles";
import ArtStyleNextButton from "@/src/components/news-making/art-style/ArtStyleNextButton";
import { JSX } from "react";

/**
 * @description ArtStyleService - 아트스타일 선택 페이지의 비즈니스 로직을 관리
 * 
 * @example
* 
* // 프로젝트 스토어 상태
* {
*   projects: [
*     { id: 1, createdAt: "2024-03-20", selectedArtStyleId: 2 },
*     { id: 2, createdAt: "2024-03-21", selectedArtStyleId: 0 }
*   ],
*   currentProjectId: 1  // 현재 작업 중인 프로젝트 ID
* }
* 
* // 아트스타일 스토어 상태
* {
*   selectedArtStyleId: 2,  // 선택된 아트스타일 ID
*   imageSrc: "/images/art-style-2.png",
*   altText: "아트스타일 2",
*   isSelected: true,
*   width: 268,
*   height: 300,
*   setSelectedArtStyle: (id, src, alt) => void,
*   clearSelectedArtStyle: () => void
* }
* 
*/
export const useArtStyleService = () => {
    const { projects, currentProjectId, updateProjectArtStyle, setCurrentProject } = useProjectStore();
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectId = searchParams.get('projectId');

    useEffect(() => {
        if (projectId) {
            const id = parseInt(projectId);
            if (!isNaN(id)) {
                const projectExists = projects.some(project => project.id === id);
                
                if (!projectExists) {
                    router.push('/');
                    return;
                }
                
                setCurrentProject(id);
            }
        } else {
            router.push('/');
        }
    }, [projectId, projects, router]);

    const handleNext = (nextPath: string) => {
        const currentProject = projects.find(p => p.id === currentProjectId);
        if (!currentProject?.selectedArtStyleId) {
            alert("스타일을 선택해주세요!");
            return;
        }

        // 현재 projectId를 URL 파라미터로 유지
        const nextPathWithProjectId = projectId ? `${nextPath}?projectId=${projectId}` : nextPath;
        router.push(nextPathWithProjectId);
    };

    const handleArtStyleSelect = (artStyleId: number) => {
        if (!currentProjectId) return;
        
        const currentProject = projects.find(p => p.id === currentProjectId);
        const isSelected = currentProject?.selectedArtStyleId === artStyleId;

        if (isSelected) {
            updateProjectArtStyle(currentProjectId, 0); // 선택 해제
        } else {
            updateProjectArtStyle(currentProjectId, artStyleId);
        }
    };

    const renderArtStyleContent = (): JSX.Element => {
        const currentProject = projects.find(p => p.id === currentProjectId);

        return (
            <div className="mt-[105px] flex flex-col items-center min-h-screen">
                {/* 헤더 */}
                <header className="flex w-full items-center justify-between mb-[40px]">
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

                {/* 이미지 선택 영역 */}
                <div className="flex flex-wrap justify-center gap-[42px] max-w-[1200px] w-full mb-[40px]">
                    {ART_STYLES.map((style) => (
                        <ArtStyleCard
                            key={style.id}
                            imageSrc={style.imageSrc}
                            altText={style.alt}
                            isSelected={currentProject?.selectedArtStyleId === style.id}
                            width={268}
                            height={300}
                            onClick={() => handleArtStyleSelect(style.id)}
                        />
                    ))}
                </div>

                {/* 다음으로 버튼 */}
                <div className="w-full flex justify-end">
                    <ArtStyleNextButton onClick={() => handleNext("/news-making/thumbnail")} />
                </div>
            </div>
        );
    };

    return {
        renderArtStyleContent,
        handleNext,
        handleArtStyleSelect
    };
}; 