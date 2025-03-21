"use client";

import React, { useState } from "react";
import NextButton from "@/src/components/news-making/button/NextButton";
import PreviewButton from "@/src/components/news-making/button/PreviewButton";
import ThumbnailCard from "@/src/components/news-making/card/ThumbnailCard";
import ImageMakingButton from "@/src/components/news-making/button/ImageMakingButton";
import ThumbnailImageModal from "@/src/components/news-making/ThumbnailImageModal";

const projectCards = [
	{ id: 1, artStyleId: 1, thumbnailId: 101, imageSrc: "", altText: "스타일 1" },
	{ id: 2, artStyleId: 2, thumbnailId: 102, imageSrc: "", altText: "스타일 2" },
	{ id: 3, artStyleId: 3, thumbnailId: 103, imageSrc: "", altText: "스타일 3" },
	{ id: 4, artStyleId: 4, thumbnailId: 104, imageSrc: "", altText: "스타일 4" },
];

export default function AiNewsAnima() {
	const [title, setTitle] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 추가
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
					<ThumbnailCard
						key={card.thumbnailId}
						artStyleId={card.artStyleId}
						thumbnailId={card.thumbnailId}
						title={title || "기본 제목"} // ✅ 입력된 제목을 모든 카드에 반영
						imageSrc={card.imageSrc}
						altText={card.altText}
					/>
				))}
			</div>

			{/* 제목 입력 필드 */}
			<div className="w-full max-w-[1200px] h-[120px] flex items-center border border-gray-300 bg-white rounded-lg px-4">
				<textarea
					className="w-full h-full border-none text-center focus:ring-0 focus:outline-none text-gray-700 text-lg resize-none"
					placeholder="영상에서 사용할 제목을 적어주세요."
					value={title}
					onChange={(e) => {
						// 현재 입력값
						const inputValue = e.target.value;

						// 줄 단위로 분리
						const lines = inputValue.split("\n");

						// ✅ 각 줄의 최대 길이를 14자로 제한
						const limitedLines = lines.map((line) => line.slice(0, 14));

						// ✅ 최대 3줄까지만 입력 가능
						if (limitedLines.length > 3) return;

						// 상태 업데이트
						setTitle(limitedLines.join("\n"));
					}}
					rows={3} // ✅ 기본 3줄 입력 가능
				/>
			</div>
			{/* 버튼 영역 */}
			<ImageMakingButton onClick={() => setIsModalOpen(true)}></ImageMakingButton>
			<div className="w-full max-w-[1200px] flex justify-end gap-6">
				<PreviewButton className="w-[290px] h-[80px]"></PreviewButton>
				<NextButton className="w-[290px] h-[80px]"></NextButton>
			</div>
			{/* 모달 */}
			<ThumbnailImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
}
