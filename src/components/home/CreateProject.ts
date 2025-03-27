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

            const project = await apiClient('/api/projects', {
                method: 'POST',
                headers,
            }).then(res => res.data);

            addProject({
                id: project.id,
                createdAt: new Date().toISOString()
            });
            
            // URL 파라미터에 projectId 추가
            router.push(`/news-making/artStyle?projectId=${project.id}`);
        } catch (error) {
            console.error("Failed to create project:", error);
            alert("프로젝트 생성에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return { createProject };
}; 