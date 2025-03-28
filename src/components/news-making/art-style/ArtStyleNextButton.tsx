"use client";

import React from 'react';
import NextButton from "@/src/components/news-making/button/NextButton";
import { useProjectStore } from "@/src/store/useNewsMakingStore";

interface ArtStyleNextButtonProps {
	onClick?: () => void;
}

export default function ArtStyleNextButton({ onClick }: ArtStyleNextButtonProps) {
	const { projects, currentProjectId } = useProjectStore();
	const currentProject = projects.find(p => p.id === currentProjectId);
	const isDisabled = !currentProject?.selectedArtStyleId;

	return (
		<NextButton 
			onClick={isDisabled ? undefined : onClick}
		/>
	);
} 