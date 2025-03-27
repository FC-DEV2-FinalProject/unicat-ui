"use client"

// Lucide 아이콘 라이브러리에서 아이콘을 가져옴
import { PlusIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "@/src/components/news-making/button/CommonNewsMakingButton";
import { Card, CardContent } from "@/src/components/news-making/card/CreateCard";
import { Checkbox } from "@/src/components/news-making/CreateCheckbox";
import ArtStyleCard from "@/src/components/news-making/art-style/ArtStyleCard";
import ThumbnailCard from "@/src/components/news-making/card/ThumbnailCard";
import VoiceDropdown from "@/src/components/news-making/VoiceDropdown";
import Link from "next/link";
import { useProjectStore } from "@/src/store/useNewsMakingStore";
import { ART_STYLES } from "@/src/constants/artStyles";

export default function Element() {
	const { projects, currentProjectId } = useProjectStore();
	const currentProject = projects.find(p => p.id === currentProjectId);
	let selectedStyle = ART_STYLES[0]; // 기본값으로 첫 번째 스타일 사용
	
	if (currentProject?.selectedArtStyleId) {
		const found = ART_STYLES.find(style => style.id === currentProject.selectedArtStyleId);
		if (found) {
			selectedStyle = found;
		}
	}

	const contentSections = [
		{ title: "썸네일", buttonText: "LLM 수정 버튼", hasCheckbox: true },
		{ title: "컷 1", buttonText: "LLM 수정 버튼", hasCheckbox: true },
	];

	return (
		<div className="mt-[105px] bg-purple-6 flex flex-row justify-center w-full border-b-[30px] border-white">
			<div className="bg-purple-6 w-full max-w-[1920px] p-12 pl-6 pt-6 pr-6 relative">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* 왼쪽 컬럼: 비디오 스타일 & 썸네일 */}
					<div className="md:col-span-1 space-y-6 overflow-hidden">
						{/* 왼쪽 영역 상단: ArtStyleCard 적용 */}
						<Card className="overflow-hidden border rounded-lg shadow-sm h-auto">
							<CardContent className="bg-white flex flex-col justify-center items-center h-auto">
								<h3 className="text-3xl font-bold font-bold-32 mb-3 p-3 mt-3">
									{"영상 스타일"}
								</h3>
								<div className="rounded-md">
									<ArtStyleCard
										artStyleId={selectedStyle.id}
										imageSrc={selectedStyle.imageSrc}
										altText={selectedStyle.alt}
										isSelected={currentProject?.selectedArtStyleId === selectedStyle.id}
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
						<Card>
							<CardContent className="flex flex-col justify-center items-center h-auto">
								{/* 카드 제목 */}
								<h3 className="text-3xl font-bold font-bold-32 mb-3 p-3 mt-3">
									{"영상 썸네일"}
								</h3>

								{/* 썸네일 카드 컨테이너 */}
								<div className="flex items-center justify-center w-full h-auto">
									<ThumbnailCard
										key={"1"}
										artStyleId={currentProject?.selectedArtStyleId || 1}
										thumbnailId={1}
										title={"기본 제목"}
										imageSrc={""} // 공백일 경우 더미 이미지
										altText={"썸네일 카드"}
										textAlign={"left"}
										fontColor={"#000000"}
										fontSize={20}
										fontFamily={"Arial"}
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
											{/* 썸네일 X버튼 컷씬 X버튼 이미지 및 스크립트 영역 */ }
											{/* 제목 & 닫기 버튼을 한 줄에 정렬 */}
											<div className="flex justify-between items-start mb-2">
												<h3 className="text-sm text-slate-500">{section.title}</h3>
												<Button variant="ghost" size="icon" className="h-6 w-6">
													<XIcon className="h-4 w-4" />
												</Button>
											</div>

											{/* 카드 내용 이미지 및 스크립트 영역 */}
											<div className="flex w-full max-w-[773px] h-[300px] border rounded-lg shadow-sm overflow-hidden">
												<div className="w-1/3 bg-gray-200 flex items-center justify-center">
													<span className="text-gray-500">이미지 삽입</span>
												</div>
												<div className="w-2/3 bg-white p-4 flex flex-col justify-between">
												<textarea
													className="w-full h-full p-2 resize-none focus:outline-none"
													placeholder="텍스트를 입력하세요..."
												/>
												{/* 카드 컨텐츠 별 버튼 텍스트 LLM 수정버튼 */}
												<Button variant="outline" size="sm" className="w-[120px] h-[40px]">
													{section.buttonText}
												</Button>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
						{/* //content section */}
						{/* 하단 컨트롤 버튼 */}
						<div className="flex justify-between mt-6">
							<VoiceDropdown/>
							<Button variant="outline" size="sm" className="ml-2 p-0 w-full flex items-center gap-1">
								<PlusIcon className="h-4 w-4" />
								<span>콘텐츠 추가</span>
							</Button>
						</div>
						<div className="w-full max-w-[1200px] flex justify-end gap-6">
							<Link href="/news-making/thumbnail">
								<Button variant="preview" className="w-[200px] h-[60px]">
									이전으로
								</Button>
							</Link>

							<Link href="/loading">
								<Button variant="next" className="w-[200px] h-[60px]">
									다음으로
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
