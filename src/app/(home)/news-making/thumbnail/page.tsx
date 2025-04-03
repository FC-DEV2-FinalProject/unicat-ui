"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import NextButton from "@/src/components/news-making/button/NextButton";
import PreviewButton from "@/src/components/news-making/button/PreviewButton";
import ThumbnailCard from "@/src/components/news-making/card/ThumbnailCard";
import ImageMakingButton from "@/src/components/news-making/button/ImageMakingButton";
import ThumbnailImageModal from "@/src/components/news-making/ThumbnailImageModal";
import ThumbnailFontMenu from "@/src/components/news-making/ThumbnailFontMenu";
import { useProjectStore } from "@/src/store/useNewsMakingStore";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECT_STAGES } from "@/src/types/newsMakingTypes";
import apiClient from "@/src/utils/apiClient";

interface ProjectCard {
	id: number;
	artStyleId: number;
	thumbnailId: number;
	imageSrc: string;
	altText: string;
	textAlign: "left" | "center" | "right";
	fontColor: string;
	fontSize: number;
	fontFamily: string;
}

const initialProjectCards: ProjectCard[] = [
	{ id: 1, artStyleId: 1, thumbnailId: 101, imageSrc: "", altText: "스타일 1", textAlign: "left", fontColor: "#ff5733", fontSize: 20, fontFamily: "Dongle" },
	{ id: 2, artStyleId: 2, thumbnailId: 102, imageSrc: "", altText: "스타일 2", textAlign: "center", fontColor: "#33ff57", fontSize: 24, fontFamily: "Gaegu" },
	{ id: 3, artStyleId: 3, thumbnailId: 103, imageSrc: "", altText: "스타일 3", textAlign: "right", fontColor: "#3357ff", fontSize: 18, fontFamily: "Nanum Gothic" },
	{ id: 4, artStyleId: 4, thumbnailId: 104, imageSrc: "", altText: "스타일 4", textAlign: "center", fontColor: "#ff33a1", fontSize: 22, fontFamily: "Pretendard" }
];

// ✅ 가장 작은 폰트 크기 기준으로 `maxLines` 계산
const minFontSize = Math.min(...initialProjectCards.map((card) => card.fontSize));
const lineHeight = minFontSize * 1.2;
const maxTextareaHeight = 108;
const maxLines = Math.floor(maxTextareaHeight / lineHeight);

export default function AiNewsAnima() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { projects, currentProjectId } = useProjectStore();
	//const currentProject = projects.find(p => p.id === currentProjectId);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ThumbnailContent />
		</Suspense>
	);
}

function ThumbnailContent() {
	const [title, setTitle] = useState<string>("");
	const [projectCards, setProjectCards] = useState<ProjectCard[]>(initialProjectCards);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
	const [lastClickedButton, setLastClickedButton] = useState<'self' | 'ai' | null>(null);
	const [fontsLoaded, setFontsLoaded] = useState(false);
	const { updateSelectedThumbnail, updateProjectStage } = useProjectStore();
	const router = useRouter();
	const searchParams = useSearchParams();
	const projectId = searchParams.get('projectId');
	
	type CardRef = { captureCard: (callback: (dataUrl: string) => void) => void };
	const cardRefs = useRef<{ [key: number]: React.MutableRefObject<CardRef | null> }>({});

	// 컴포넌트 마운트 시 ref 초기화
	useEffect(() => {
		projectCards.forEach(card => {
			if (!cardRefs.current[card.id]) {
				cardRefs.current[card.id] = { current: null };
			}
		});
	}, [projectCards]);

	// Google Fonts 스타일시트 로드
	useEffect(() => {
		const loadFonts = async () => {
			// 이미 로드된 경우 스킵
			if (document.querySelector('link[href*="fonts.googleapis.com"]')) {
				setFontsLoaded(true);
				return;
			}

			const link = document.createElement('link');
			link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;500;700&family=Nanum+Gothic:wght@400;700;800&family=Nanum+Myeongjo:wght@400;700;800&family=Nanum+Pen+Script&family=Nanum+Brush+Script&family=Gaegu&family=Dongle&family=Jua&family=Poor+Story&family=Gowun+Dodum&family=Gowun+Batang&family=IBM+Plex+Sans+KR:wght@400;500;600&family=IBM+Plex+Serif+KR:wght@400;500;600&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Lato:wght@400;700&family=Montserrat:wght@400;500;600&family=Poppins:wght@400;500;600&family=Source+Sans+Pro:wght@400;600&family=Ubuntu:wght@400;500&family=Raleway:wght@400;500;600&family=Nunito:wght@400;600;700&display=swap';
			link.rel = 'stylesheet';
			
			// 폰트 로드 완료 감지
			const loadPromise = new Promise((resolve) => {
				link.onload = resolve;
			});

			document.head.appendChild(link);
			await loadPromise;
			setFontsLoaded(true);
		};

		loadFonts();
	}, []);

	// ProjectCart에 맞게 key, value 선언
	const updateCard = <K extends keyof ProjectCard>(id: number, key: K, value: ProjectCard[K]) => {
		setProjectCards((prev) =>
			prev.map((card) => (card.id === id ? { ...card, [key]: value } : card))
		);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = e.target.value;
		// ✅ 최대 줄 수 제한 (가장 작은 폰트 기준)
		const lines = inputValue.split("\n").slice(0, maxLines);
		// ✅ 한 줄당 최대 14자 제한
		const limitedLines = lines.map((line) => line.slice(0, 14));
		setTitle(limitedLines.join("\n"));
	};

	const updateAllCardImages = (imageSrc: string) => {
		setProjectCards(prev => 
			prev.map(card => ({
				...card,
				imageSrc
			}))
		);
	};

	const handleCardClick = (id: number) => {
		setSelectedCardId(id === selectedCardId ? null : id);
	};

	// Base64 문자열을 Blob으로 변환하는 함수
	const base64ToBlob = (base64: string) => {
		const byteString = atob(base64.split(',')[1]);
		const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		
		return new Blob([ab], { type: mimeString });
	};

	const handleNext = async () => {
		if (!selectedCardId) {
			alert("썸네일을 선택해주세요!");
			return;
		}

		if (!title.trim()) {
			alert("제목을 입력해주세요!");
			return;
		}

		const selectedCard = projectCards.find(card => card.id === selectedCardId);
		if (!selectedCard) return;

		if (!selectedCard.imageSrc) {
			alert("이미지를 업로드해주세요!");
			return;
		}

		// 선택된 썸네일 정보 저장
		const handleCapture = async (dataUrl: string) => {
			if (projectId) {
				try {
					//todo 추후 self 요청일시 수정 폼데이터 작동 X self else로 내리기
					console.log('handleCapture 시작 🎯 lastClickedButton:', lastClickedButton);
					// AI 생성 이미지는 항상 JSON으로 전송
					// api가 변경되어서 양쪽 모두 sections/1에 대해 patch 요청
					if (lastClickedButton === 'self' || lastClickedButton === 'ai') {
						console.log('AI 생성 이미지 처리 시작 🎯');
						await apiClient.patch(`/api/projects/${projectId}/sections/1`, {
							imageUrl: dataUrl,
							alt: title,
							script: ''
						}, {
							headers: {
								'Content-Type': 'application/json',
							},
						});
						console.log('썸네일 이미지 업로드 완료 🎯 (AI 생성 - JSON)');
					} else if (lastClickedButton === 'selfxxx') {
						console.log('직접 업로드 이미지 처리 시작 🎯');
						// 직접 업로드한 이미지는 FormData로 전송
						const formData = new FormData();
						const imageBlob = base64ToBlob(dataUrl);
						formData.append('multipartFile', imageBlob, 'thumbnail.png');
						formData.append('alt', title);
						formData.append('script', '');
						// 썸네일은 무조건 sectionId 1로 고정
						await apiClient.patch(`/api/projects/${projectId}/sections/1`, formData, {
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						});
						console.log('썸네일 이미지 업로드 완료 🎯 (직접 업로드 - FormData)');
					}

					// API 호출이 성공한 후에만 상태 업데이트 및 페이지 이동
					updateSelectedThumbnail(
						selectedCardId,
						title,
						selectedCard.textAlign,
						selectedCard.fontColor,
						selectedCard.fontSize,
						selectedCard.fontFamily,
						dataUrl
					);

					// 캡처 완료 후 프로젝트 단계 업데이트 및 페이지 이동
					updateProjectStage(parseInt(projectId), PROJECT_STAGES.CREATING);
					router.push(`/news-making/create?projectId=${projectId}`);
				} catch (error) {
					console.error('썸네일 이미지 업로드 실패:', error);
				}
			}
		};

		// ref를 통해 직접 캡처 함수 호출
		const cardRef = cardRefs.current[selectedCardId];
		if (cardRef?.current) {
			cardRef.current.captureCard(handleCapture);
		}
	};

	if (!fontsLoaded) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-white">
				<div className="flex flex-col items-center gap-4">
					<div className="w-12 h-12 border-4 border-purple-1 border-t-transparent rounded-full animate-spin"></div>
					<p className="text-gray-600">페이지를 불러오는 중...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mt-[105px] flex flex-col items-center min-h-screen gap-[40px] bg-purple-6">
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
							ref={(el) => {
								if (cardRefs.current[card.id]) {
									cardRefs.current[card.id].current = el;
								}
							}}
							artStyleId={card.artStyleId}
							thumbnailId={card.thumbnailId}
							title={title}
							imageSrc={card.imageSrc}
							altText={card.altText}
							textAlign={card.textAlign}
							fontColor={card.fontColor}
							fontSize={card.fontSize}
							fontFamily={card.fontFamily}
							isSelected={card.id === selectedCardId}
							onClick={() => handleCardClick(card.id)}
						/>
						{/* ✅ 폰트 설정 UI (컴포넌트 분리) */}
						<ThumbnailFontMenu
							fontSize={card.fontSize}
							fontFamily={card.fontFamily}
							fontColor={card.fontColor}
							textAlign={card.textAlign}
							onUpdate={(key, value) => updateCard(card.id, key as keyof ProjectCard, value)}
							areaIndex={card.id - 1}
							fontsLoaded={fontsLoaded}
						/>
					</div>
				))}
			</div>

			{/* ✅ 제목 입력 필드 */}
			<div className="w-full max-w-[1200px] h-[108px] bg-white rounded-lg p-4 border border-gray-200">
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
			<div className="flex gap-[20px]">
				<PreviewButton className="w-[290px] h-[80px]" />
				<NextButton className="w-[290px] h-[80px]" onClick={handleNext} />
			</div>

			{/* 모달 */}
			<ThumbnailImageModal 
				isOpen={isModalOpen} 
				onClose={() => setIsModalOpen(false)} 
				onImageUpload={(imageSrc) => {
					updateAllCardImages(imageSrc);
				}}
				onButtonTypeChange={(type) => {
					setLastClickedButton(type);
				}}
			/>
		</div>
	);
}
