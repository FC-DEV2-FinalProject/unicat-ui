import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { ThumbnailCardProps } from "@/src/types/newsMakingTypes";
import { motion, AnimatePresence } from "framer-motion";

const ThumbnailCard = forwardRef<
	{ captureCard: (callback: (dataUrl: string) => void) => void },
	ThumbnailCardProps & { onCapture?: (dataUrl: string) => void }
>(({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	artStyleId,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	thumbnailId,
	title,
	imageSrc,
	altText,
	textAlign,
	fontColor,
	fontSize,
	fontFamily,
	onClick,
	isSelected,
	onCapture
}, ref) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const captureCanvasRef = useRef<HTMLCanvasElement>(null);

	// 카드 전체 영역을 PNG로 캡처하는 함수
	const captureCard = (callback?: (dataUrl: string) => void) => {
		console.log('captureCard 시작');
		
		if (!cardRef.current || !canvasRef.current || !captureCanvasRef.current) {
			console.log('캡처 실패:', {
				cardRef: !!cardRef.current,
				canvasRef: !!canvasRef.current,
				captureCanvasRef: !!captureCanvasRef.current
			});
			return;
		}

		const canvas = captureCanvasRef.current;
		canvas.width = 268;
		canvas.height = 480;
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.log('캔버스 컨텍스트 가져오기 실패');
			return;
		}

		console.log('캔버스 설정 완료');

		// 배경색 채우기 (전체 영역)
		ctx.fillStyle = 'rgb(243 244 246)'; // bg-gray-5
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		console.log('배경색 채우기 완료');

		// 텍스트 캔버스 그리기
		if (canvasRef.current) {
			ctx.drawImage(canvasRef.current, 0, 0);
			console.log('텍스트 캔버스 그리기 완료');
		}

		// 이미지 그리기
		if (imageRef.current && imageSrc) {
			// 이미지 영역 배경색 다시 채우기
			ctx.fillStyle = 'rgb(243 244 246)'; // bg-gray-5
			ctx.fillRect(0, 128, 268, 224);
			
			ctx.drawImage(
				imageRef.current,
				0, 128,  // 이미지 시작 위치
				268, 224 // 이미지 크기
			);
			console.log('이미지 그리기 완료');
		}

		// PNG로 변환
		const dataUrl = canvas.toDataURL('image/png');
		console.log('PNG 변환 완료, dataUrl 길이:', dataUrl.length);
		
		if (callback) {
			callback(dataUrl);
			console.log('캡처 콜백 호출 완료');
		} else if (onCapture) {
			onCapture(dataUrl);
			console.log('캡처 콜백 호출 완료');
		}
	};

	useImperativeHandle(ref, () => ({
		captureCard
	}));

	useEffect(() => {
		if (onCapture) {
			captureCard();
		}
	}, [onCapture]);

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
		ctx.fillStyle = fontColor ?? 'black';
		ctx.textAlign = textAlign as CanvasTextAlign;
		ctx.textBaseline = "top";

		// ✅ 최대 줄 수 제한 (현재 폰트 기준)
		const lineHeight = ((fontSize ?? 3) * 1.2);
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
		<div className="relative w-[268px] h-[480px] cursor-pointer group" ref={cardRef}>
			{/* 선택 효과 테두리 */}
			<div className={`absolute inset-0 rounded-[8px] transition-colors z-20 pointer-events-none ${isSelected ? 'border-[8px] border-purple-1' : ''}`} />
			
			{/* 실제 컨텐츠 - 캡처 영역 */}
			<div
				className="absolute inset-0 overflow-hidden rounded-[8px] flex flex-col items-center justify-center bg-gray-5"
				onClick={onClick}
			>
				{/* ✅ 이미지 */}
				{imageSrc && (
					<div className="absolute top-[128px] left-0 right-0 mx-auto w-[268px] h-[224px] overflow-hidden">
						<img
							ref={imageRef}
							src={imageSrc}
							alt={altText}
							className="w-[268px] h-[224px] object-cover object-center"
							style={{ maxWidth: '268px', maxHeight: '224px' }}
						/>
						<AnimatePresence>
							{isSelected && (
								<>
									{/* 선택 효과 - 보라색 오버레이 */}
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 0.3 }}
										exit={{ opacity: 0 }}
										className="absolute inset-0 bg-purple-1"
									/>
									{/* 체크 아이콘 */}
									<motion.div
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										exit={{ scale: 0 }}
										className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									>
										<svg width="48" height="48" viewBox="0 0 48 48" fill="none">
											<circle cx="24" cy="24" r="24" fill="white"/>
											<path d="M16 24L22 30L32 18" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</motion.div>
								</>
							)}
						</AnimatePresence>
					</div>
				)}

				{/* ✅ 캔버스를 제목 텍스트로 사용 */}
				<canvas ref={canvasRef} className="absolute top-4 left-0 w-full h-[108px] pointer-events-none" />
			</div>

			{/* 캡처용 숨겨진 캔버스 */}
			<canvas ref={captureCanvasRef} className="hidden" />
		</div>
	);
});

ThumbnailCard.displayName = 'ThumbnailCard';

export default ThumbnailCard;
