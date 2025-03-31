"use client";

import React from 'react';
import NextButton from "@/src/components/news-making/button/NextButton";
import { useProjectStore } from "@/src/store/useNewsMakingStore";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECT_STAGES } from "@/src/types/newsMakingTypes";
import apiClient from "@/src/utils/apiClient";

interface ArtStyleNextButtonProps {
	onClick?: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ArtStyleNextButton({ onClick }: ArtStyleNextButtonProps) {
	const { projects, currentProjectId, updateProjectStage } = useProjectStore();
	const currentProject = projects.find(p => p.id === currentProjectId);
	const isDisabled = !currentProject?.selectedArtStyleId;
	const router = useRouter();
	const searchParams = useSearchParams();
	const projectId = searchParams.get('projectId');

	const handleClick = async () => {
		if (projectId) {
			try {
				// 1. 섹션 생성
				const sectionResponse = await apiClient.post(`/api/projects/${projectId}/sections`);
				const sectionId = sectionResponse.data.id;
				console.log('섹션 생성 완료 🎯 섹션 ID:', sectionId);

				// 2. 프로젝트 단계 업데이트
				updateProjectStage(parseInt(projectId), PROJECT_STAGES.THUMBNAIL);
				
				// 3. 다음 페이지로 이동
				router.push(`/news-making/thumbnail?projectId=${projectId}`);
			} catch (error) {
				console.error('섹션 생성 실패:', error);
				alert('섹션 생성에 실패했습니다. 다시 시도해주세요.');
			}
		}
	};

	return (
		<NextButton 
			onClick={isDisabled ? undefined : handleClick}
		/>
	);
} 