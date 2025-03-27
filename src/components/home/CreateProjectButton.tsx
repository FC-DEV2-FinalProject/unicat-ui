"use client";

import React from 'react';
import Image from 'next/image';
import { useCreateProject } from './CreateProject';

export const CreateProjectButton: React.FC = () => {
  const { createProject } = useCreateProject();

  return (
    <div className="relative">
      <Image
        src="/images/news-making-button.png"
        alt="뉴스 제작하기 버튼"
        width={185}
        height={52}
        className="cursor-pointer"
        onClick={createProject}
      />
    </div>
  );
}; 