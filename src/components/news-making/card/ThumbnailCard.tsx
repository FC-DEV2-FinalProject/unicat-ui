import Image from "next/image";
import React from "react";

interface ThumbnailCardProps {
	artStyleId: number;
	thumbnailId: number;
	title: string;
	imageSrc?: string;
	altText: string;
	onClick?: () => void;
	isSelected?: boolean;
}

export default function ThumbnailCard(props: ThumbnailCardProps) {
	const { thumbnailId, artStyleId, title, imageSrc, altText, onClick, isSelected } = props;

	return (
		<div
			className={`w-[268px] h-[480px] overflow-hidden cursor-pointer rounded-[8px] 
              flex flex-col items-center justify-center relative transition-all border 
              ${isSelected ? "border-[10px] border-purple-500 shadow-lg" : "border border-gray-300"}`}
			onClick={onClick}
			data-thumbnail-id={thumbnailId} // ✅ 데이터 속성 추가 가능
			data-art-style-id={artStyleId} // ✅ 데이터 속성 추가 가능
		>
			{/* ✅ 배경 (이미지 위아래로 위치) */}
			<div className="absolute top-0 left-0 w-full h-full bg-gray-5"></div>

			{/* ✅ 제목 개행이 적용되도록 `white-space: pre-line;` 추가 */}
			{/* ✅ 개행 적용 (한 줄에 최대 14자, 최대 3줄 유지) */}
			<div className="absolute top-4 text-center font-bold text-lg text-white whitespace-pre-line">
				{title || "기본 제목"}
			</div>

			{/* ✅ 이미지 (배경 위에서 수직 중앙 정렬) */}
			<Image
				//imageSrc가 undefined, null, ""(빈 문자열)일 경우 false가 되어 기본 이미지를 사용
				src={imageSrc && imageSrc !== "" ? imageSrc : "/images/news-making/thumbnail-dummy.png"}
				alt={altText}
				width={268}
				height={224}
				className="relative z-10 object-cover"
			/>
		</div>
	);
}
