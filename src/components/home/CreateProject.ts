"use client";

import { useRouter } from "next/navigation";
import apiClient from "@/src/utils/apiClient";
import { useProjectStore } from "@/src/store/useNewsMakingStore";

export const useCreateProject = () => {
    const router = useRouter();
    const { addProject } = useProjectStore();

    const createProject = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            // API 호출 및 응답 데이터 직접 받기
            const { data } = await apiClient('/api/projects', {
                method: 'POST',
                headers,
            });

            console.log('API Response:', data); // 응답 확인용 로그
            console.log('Store before addProject:', useProjectStore.getState()); // 저장 전 스토어 상태

            // 프로젝트 스토어에 저장
            addProject({ id: data.id, createdAt: new Date().toISOString(), stage: "art_style" });
            
            console.log('Store after addProject:', useProjectStore.getState()); // 저장 후 스토어 상태
            console.log('LocalStorage after addProject:', localStorage.getItem('project-storage')); // localStorage 확인
            
            // URL 파라미터에 projectId 추가
            router.push(`/news-making/artStyle?projectId=${data.id}`);
        } catch (error) {
            console.error("Failed to create project:", error);
            alert("프로젝트 생성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return { createProject };
}; 