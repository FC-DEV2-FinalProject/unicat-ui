"use client";

import React, { useState } from "react";
import NextButton from "@/src/components/news-making/button/NextButton";
import PreviewButton from "@/src/components/news-making/button/PreviewButton";
import ThumbnailCard from "@/src/components/news-making/card/ThumbnailCard";
import ImageMakingButton from "@/src/components/news-making/button/ImageMakingButton";
import ThumbnailImageModal from "@/src/components/news-making/ThumbnailImageModal";
import ThumbnailFontMenu from "@/src/components/news-making/ThumbnailFontMenu";

interface ProjectCard {
	id: number;
	artStyleId: number;
	thumbnailId: number;
	imageSrc: string;
	altText: string;
	textAlign: "left" | "center" | "right";
	fontColor: string;
	fontSize: number;
	fontFamily: "Arial" | "Times New Roman" | "Courier New" | "Verdana";
}

const initialProjectCards: ProjectCard[] = [
	{ id: 1, artStyleId: 1, thumbnailId: 101, imageSrc: "", altText: "스타일 1", textAlign: "left", fontColor: "#ff5733", fontSize: 20, fontFamily: "Arial" },
	{ id: 2, artStyleId: 2, thumbnailId: 102, imageSrc: "", altText: "스타일 2", textAlign: "center", fontColor: "#33ff57", fontSize: 24, fontFamily: "Times New Roman" },
	{ id: 3, artStyleId: 3, thumbnailId: 103, imageSrc: "", altText: "스타일 3", textAlign: "right", fontColor: "#3357ff", fontSize: 18, fontFamily: "Courier New" },
	{ id: 4, artStyleId: 4, thumbnailId: 104, imageSrc: "", altText: "스타일 4", textAlign: "center", fontColor: "#ff33a1", fontSize: 22, fontFamily: "Verdana" }
];

// ✅ 가장 작은 폰트 크기 기준으로 `maxLines` 계산
const minFontSize = Math.min(...initialProjectCards.map((card) => card.fontSize));
const lineHeight = minFontSize * 1.2;
const maxTextareaHeight = 108;
const maxLines = Math.floor(maxTextareaHeight / lineHeight);

export default function AiNewsAnima() {
	const [title, setTitle] = useState<string>("");

	const [projectCards, setProjectCards] = useState<ProjectCard[]>(initialProjectCards);

	const updateCard = (id: number, key: keyof ProjectCard, value: any) => {
		setProjectCards((prev) =>
			prev.map((card) => (card.id === id ? { ...card, [key]: value } : card))
		);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value;

		// ✅ 최대 줄 수 제한 (가장 작은 폰트 기준)
		const lines = inputValue.split("\n").slice(0, maxLines);

		// ✅ 한 줄당 최대 14자 제한
		const limitedLines = lines.map((line) => line.slice(0, 14));

		setTitle(limitedLines.join("\n"));
	};

	return (
		<div className="flex flex-col items-center min-h-screen gap-[40px] bg-purple-6">
			{/* 헤더 */}
			<header className="w-full max-w-[1200px] flex justify-between items-center">
				<h1 className="text-gray-5 font-bold text-2xl">만든 프로젝트</h1>
				<div className="text-gray-5 text-2xl">
					<span className="text-purple-1 font-bold">2</span>
					<span className="text-gray-900"> / 4</span>
				</div>
			</header>

			{/* 프로젝트 카드 리스트 */}
			<div className="grid grid-cols-4 gap-10 w-full max-w-[1200px]">
				{projectCards.map((card) => (
					<div key={card.thumbnailId} className="flex flex-col items-center">
						<ThumbnailCard
							artStyleId={card.artStyleId}
							thumbnailId={card.thumbnailId}
							title={title}
							imageSrc={card.imageSrc}
							altText={card.altText}
							textAlign={card.textAlign}
							fontColor={card.fontColor}
							fontSize={card.fontSize}
							fontFamily={card.fontFamily}
						/>
						{/* ✅ 폰트 설정 UI (컴포넌트 분리) */}
						<ThumbnailFontMenu
							fontSize={card.fontSize}
							fontFamily={card.fontFamily}
							fontColor={card.fontColor}
							textAlign={card.textAlign}
							onUpdate={(key, value) => updateCard(card.id, key as keyof ProjectCard, value)}
						/>
					</div>
				))}
			</div>

			{/* ✅ 제목 입력 필드 */}
			<div className="relative w-full max-w-[1200px] h-[120px] flex items-center border border-gray-300 bg-white rounded-lg px-4">
        <textarea
					className="w-full h-full border-none text-center focus:ring-0 focus:outline-none text-gray-700 text-lg resize-none"
					placeholder="영상에서 사용할 제목을 적어주세요."
					value={title}
					onChange={handleInputChange}
					rows={maxLines}
				/>
			</div>

			{/* 버튼 영역 */}
			<ImageMakingButton onClick={() => setIsModalOpen(true)} />
			<div className="w-full max-w-[1200px] flex justify-end gap-6">
				<PreviewButton className="w-[290px] h-[80px]" />
				<NextButton className="w-[290px] h-[80px]" />
			</div>

			{/* 모달 */}
			<ThumbnailImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
}
