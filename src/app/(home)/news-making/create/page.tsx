"use client"

// Lucide 아이콘 라이브러리에서 아이콘을 가져옴
import { PlusIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "@/src/components/news-making/button/CreateCommonButton";
import { Card, CardContent } from "@/src/components/news-making/card/CreateCard";
import { Checkbox } from "@/src/components/news-making/CreateCheckbox";
import ArtStyleCard from "@/src/components/news-making/card/ArtStyleCard";
import ThumbnailCard from "@/src/components/news-making/card/ThumbnailCard";
import VoiceDropdown from "@/src/components/news-making/VoiceDropdown";

const artStyles = [
	{ id: 1, imageSrc: "/images/news-making/news-style-1.png", alt: "스타일 1" },
	{ id: 2, imageSrc: "/images/news-making/news-style-2.png", alt: "스타일 2" },
	{ id: 3, imageSrc: "/images/news-making/news-style-3.png", alt: "스타일 3" },
	{ id: 4, imageSrc: "/images/news-making/news-style-4.png", alt: "스타일 4" },
];

// ✅ 아무거나 하나 선택 (예: 첫 번째 스타일 사용)
const selectedStyle = artStyles[0]; // 혹은 다른 인덱스로 변경 가능

export default function Element () {

	const contentSections = [
		{ title: "내레이션", buttonText: "LLM 수정 버튼", hasCheckbox: true },
		{ title: "텍스트를 입력하세요", buttonText: "LLM 수정 버튼", hasCheckbox: true },
	];

	return (
		<div className="bg-white flex flex-row justify-center w-full">
			<div className="bg-white w-full max-w-[1920px] p-6 relative">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* 왼쪽 컬럼: 비디오 스타일 & 썸네일 */}
					<div className="md:col-span-1 space-y-6 overflow-hidden">
						{/* 왼쪽 영역 상단: ArtStyleCard 적용 */}
						<Card className="overflow-hidden border rounded-lg shadow-sm h-auto"> {/* ✅ 여기 추가 */}
							<CardContent className="flex flex-col justify-center items-center h-auto">
								<h3 className="text-3xl font-bold font-bold-32 mb-3 p-3 mt-3">
									{"영상 스타일"}
								</h3>
								<div className="rounded-md">
									<ArtStyleCard
										imageSrc={selectedStyle.imageSrc}
										altText={selectedStyle.alt}
										isSelected={true}
										onClick={() => {}}
										className="mx-auto"
										width={200}
										height={224}
										applyBorderBox={true}
									/>
								</div>
							</CardContent>
						</Card>
						<div className="md:col-span-1 space-y-6 overflow-hidden">
						</div>
						{/* 왼쪽 영역 하단: Thumbnail Card 적용 */}
						<Card className="overflow-hidden border rounded-lg shadow-sm h-auto">
							<CardContent className="flex flex-col justify-center items-center h-auto">
								{/* 카드 제목 */}
								<h3 className="text-3xl font-bold font-bold-32 mb-3 p-3 mt-3">
									{"영상 썸네일"}
								</h3>

								{/* 썸네일 카드 컨테이너 */}
								<div className="flex items-center justify-center w-full h-auto">
									<ThumbnailCard
										key={"1"}
										artStyleId={1}
										thumbnailId={1}
										title={"기본 제목"}
										imageSrc={""} // 공백일 경우 더미 이미지
										altText={"썸네일 카드"}
										className="w-full h-auto object-contain"
									/>
								</div>
							</CardContent>
						</Card>

					</div>

					{/* 오른쪽 컬럼: 콘텐츠 카드들 컷 단위 추가 */}
					<div className="md:col-span-3 space-y-6">
						{contentSections.map((section, index) => (
							<Card key={index} className="border rounded-lg shadow-sm">
								<CardContent className="p-0">
									<div className="flex items-start">
										{section.hasCheckbox && (
											<div className="p-4">
												<Checkbox id={`section-${index}`} />
											</div>
										)}
										<div className="flex-1 p-4">
											<div className="flex justify-between items-center mb-4">
												<h3 className="text-sm text-slate-500">
													{section.title}
												</h3>
												<Button variant="ghost" size="icon" className="h-6 w-6">
													<XIcon className="h-4 w-4" />
												</Button>
											</div>
											<div className="aspect-video bg-slate-50 rounded-md border border-slate-200 mb-4"></div>
											<div className="flex justify-end">
												<Button variant="outline" size="sm" className="text-xs">
													{section.buttonText}
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* 하단 컨트롤 버튼 */}
				<div className="flex justify-between mt-6">
					<Button variant="outline" size="sm" className="flex items-center gap-1">
						<VoiceDropdown/>
					</Button>
					<Button variant="outline" size="sm" className="flex items-center gap-1">
						<PlusIcon className="h-4 w-4" />
						<span>콘텐츠 추가</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
