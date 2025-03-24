import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface ThumbnailCardProps {
	thumbnailId: number;
	artStyleId: number;
	title: string;
	imageSrc: string;
	altText: string;
	textAlign: "left" | "center" | "right";
	fontColor: string;
	fontSize: number;
	fontFamily: string;
}

export default function ThumbnailCard(props: ThumbnailCardProps) {
	const { thumbnailId, artStyleId, title, imageSrc, altText, textAlign, fontColor, fontSize, fontFamily } = props;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// ✅ 캔버스 크기 설정
		const canvasWidth = 265;
		const canvasHeight = 108;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;

		// ✅ 기존 배경 유지 (div 배경은 그대로, 캔버스는 텍스트만 출력)
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// ✅ 텍스트 스타일 적용
		ctx.font = `${fontSize}px ${fontFamily}`;
		ctx.fillStyle = fontColor;
		ctx.textAlign = textAlign as CanvasTextAlign;
		ctx.textBaseline = "top";

		// ✅ 최대 줄 수 제한 (현재 폰트 기준)
		const lineHeight = fontSize * 1.2;
		const maxLines = Math.floor(canvasHeight / lineHeight);
		const maxWidth = canvasWidth - 40; // 좌우 여백 고려

		// ✅ 사용자가 입력한 줄바꿈(`\n`)을 그대로 유지
		let lines = title.split("\n").slice(0, maxLines); // ✅ 초과된 줄 제거

		// ✅ 각 줄별로 최대 너비 체크 후 잘라서 표시
		lines = lines.map((line) => {
			let shortenedLine = "";
			for (const char of line) {
				if (ctx.measureText(shortenedLine + char).width > maxWidth) break;
				shortenedLine += char;
			}
			return shortenedLine;
		});

		// ✅ 줄별로 텍스트 그리기
		lines.forEach((line, i) => {
			const textX = textAlign === "left" ? 20 : textAlign === "right" ? canvas.width - 20 : canvas.width / 2;
			const textY = 10 + i * lineHeight;
			ctx.fillText(line, textX, textY);
		});

	}, [title, fontSize, fontColor, fontFamily, textAlign]);

	return (
		<div
			className="relative w-[268px] h-[480px] overflow-hidden cursor-pointer rounded-[8px] flex flex-col items-center justify-center transition-all border border-gray-300"
		>
			{/* ✅ 기존 배경 유지 */}
			<div className="absolute top-0 left-0 w-full h-full bg-gray-5"></div>

			{/* ✅ 캔버스를 제목 텍스트로 사용 */}
			<canvas ref={canvasRef} className="absolute top-4 left-0 w-full h-[108px] pointer-events-none" />

			{/* ✅ 이미지 */}
			<Image src={imageSrc || "/images/news-making/thumbnail-dummy.png"} alt={altText} width={268} height={224} className="relative z-10 object-cover" />
		</div>
	);
}
