import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import { ThumbnailCardProps } from "@/src/types/newsMakingTypes";
import { motion, AnimatePresence } from "framer-motion";

const ThumbnailCard = forwardRef<
	{ captureCard: (callback: (dataUrl: string) => void) => void },
	ThumbnailCardProps
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
	className
}, ref) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const captureCanvasRef = useRef<HTMLCanvasElement>(null);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);

	// 텍스트 상단 여백 (top-2 = 8px)
	const TEXT_TOP_MARGIN = 8; // tailwind의 top-2에 해당하는 픽셀값

	// AI 생성 이미지를 base64로 변환하는 함수
	const convertUrlToBase64 = async (url: string) => {
		try {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			
			return new Promise<string>((resolve, reject) => {
				img.onload = () => {
					const canvas = document.createElement('canvas');
					canvas.width = img.width;
					canvas.height = img.height;
					const ctx = canvas.getContext('2d');
					if (!ctx) {
						reject(new Error('Canvas context not available'));
						return;
					}
					ctx.drawImage(img, 0, 0);
					resolve(canvas.toDataURL('image/png'));
				};
				img.onerror = reject;
				img.src = url;
			});
		} catch (error) {
			console.error('이미지 변환 실패:', error);
			return null;
		}
	};

	// AI 생성 이미지 URL이 변경될 때 base64로 변환
	useEffect(() => {
		if (imageSrc && imageSrc.startsWith('http')) {
			convertUrlToBase64(imageSrc).then(base64 => {
				setCapturedImage(base64);
			});
		}
	}, [imageSrc]);

	/**
	 * 📸 전체 카드를 PNG 이미지로 캡처하는 함수
	 * @param callback 캡처 완료 후 실행될 콜백 함수 (dataUrl을 인자로 받음)
	 */
	const captureCard = (callback: (dataUrl: string) => void) => {
		// 🔍 필요한 ref들이 모두 존재하는지 체크
		if (!cardRef.current || !canvasRef.current || !captureCanvasRef.current) {
			console.log('캡처 실패:', {
				cardRef: !!cardRef.current,
				canvasRef: !!canvasRef.current,
				captureCanvasRef: !!captureCanvasRef.current
			});
			return;
		}

		// 🎨 캡처용 캔버스 설정
		const canvas = captureCanvasRef.current;
		canvas.width = 268;  // 썸네일 카드 너비
		canvas.height = 480; // 썸네일 카드 높이
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			console.log('캔버스 컨텍스트 가져오기 실패');
			return;
		}

		console.log('캔버스 설정 완료');

		// 🎨 배경색 채우기 (전체 영역)
		ctx.fillStyle = 'rgba(58, 58, 58, 1)'; // --gray-5 색상
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		console.log('배경색 채우기 완료');

		// ✍️ 텍스트 캔버스 그리기
		if (canvasRef.current) {
			// 텍스트 캔버스를 상단 여백(8px)을 포함하여 그림
			ctx.drawImage(canvasRef.current, 0, TEXT_TOP_MARGIN);
			console.log('텍스트 캔버스 그리기 완료');
		}

		// 🖼️ 이미지 그리기
		if (imageSrc) {
			const img = new Image();
			img.crossOrigin = 'anonymous'; // CORS 이슈 해결을 위한 설정
			img.onload = () => {
				// 이미지를 정해진 위치(128px)에 그림
				ctx.drawImage(
					img,
					0, 128,  // 이미지 시작 위치 (텍스트 영역 아래)
					268, 224 // 이미지 크기 (너비 x 높이)
				);
				console.log('이미지 그리기 완료');

				// 📷 PNG로 변환
				const dataUrl = canvas.toDataURL('image/png');
				console.log('PNG 변환 완료, dataUrl 길이:', dataUrl.length);
				
				// ✅ 콜백 함수 실행
				if (callback) {
					callback(dataUrl);
					console.log('캡처 콜백 호출 완료');
				}
			};
			// ❌ 이미지 로드 실패 시 처리
			img.onerror = (error) => {
				console.error('이미지 로드 실패:', error);
				if (callback) {
					callback(imageSrc);
				}
			};
			img.src = imageSrc;
		} else if (callback) {
			// 이미지가 없는 경우 빈 문자열 반환
			callback('');
		}
	};

	useImperativeHandle(ref, () => ({
		captureCard
	}));

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		// ✅ 캔버스 크기 설정
		const canvasWidth = 265;
		const canvasHeight = 106;
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
				{imageSrc ? (
					<div className={`absolute top-[128px] left-0 right-0 mx-auto w-[268px] h-[224px] overflow-hidden ${className || ''}`}>
						<img
							ref={imageRef}
							src={capturedImage || imageSrc}
							alt={altText}
							className="w-[268px] h-[224px] object-cover object-center"
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
				) : (
					<div className="absolute top-[128px] left-0 right-0 mx-auto w-[268px] h-[224px] bg-[rgb(189,188,189)]" />
				)}

				{/* ✅ 캔버스를 제목 텍스트로 사용 */}
				<canvas 
					ref={canvasRef} 
					className="absolute left-0 w-full h-[118px] pointer-events-none"
					style={{ top: `${TEXT_TOP_MARGIN}px` }}
				/>
			</div>

			{/* 캡처용 숨겨진 캔버스 */}
			<canvas ref={captureCanvasRef} className="hidden" />
		</div>
	);
});

ThumbnailCard.displayName = 'ThumbnailCard';

export default ThumbnailCard;
