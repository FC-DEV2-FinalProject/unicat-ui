import Image from "next/image";
import React from "react";
import { cn } from "@/src/utils/cn"; // ✅ cn 함수 가져오기

interface ThumbnailCardProps {
	artStyleId: number;
	thumbnailId: number;
	title: string;
	imageSrc?: string;
	altText: string;
	onClick?: () => void;
	isSelected?: boolean;
	className?: string;
}

export default function ThumbnailCard(props: ThumbnailCardProps) {
	const { thumbnailId, artStyleId, title, imageSrc, altText, onClick, isSelected, className } = props;

	return (
		<div
			className={cn(
				"w-[268px] h-[480px] overflow-hidden cursor-pointer rounded-[8px] flex flex-col items-center justify-center relative transition-all border",
				isSelected ? "border-[10px] border-purple-500 shadow-lg" : "border border-gray-300",
				className
			)}
			onClick={onClick}
			data-thumbnail-id={thumbnailId}
			data-art-style-id={artStyleId}
		>
			{/* ✅ 배경 (이미지 위아래로 위치) */}
			<div className="absolute top-0 left-0 w-full h-full bg-gray-5"></div>

			{/* ✅ 제목 개행이 적용되도록 `white-space: pre-line;` 추가 */}
			<div className="absolute top-4 text-center font-bold text-lg text-white whitespace-pre-line">
				{title || "기본 제목"}
			</div>

			{/* ✅ 이미지 (배경 위에서 수직 중앙 정렬) */}
			<Image
				src={imageSrc && imageSrc !== "" ? imageSrc : "/images/news-making/thumbnail-dummy.png"}
				alt={altText}
				width={268}
				height={224}
				className="relative z-10 object-cover"
			/>
		</div>
	);
}
