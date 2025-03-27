"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import apiClient from "@/src/utils/apiClient";
import { useProjectStore } from "@/src/store/useNewsMakingStore";

export const MainNewsMakingButton: React.FC = () => {
  const router = useRouter();
  const { addProject } = useProjectStore();

  const handleCreateProject = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const project = await apiClient('/api/projects', {
        method: 'POST',
        headers,
      }).then(res => res.data);

      addProject(project.id);
      router.push('/news-making/artStyle');
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("프로젝트 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
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
  );
}; 