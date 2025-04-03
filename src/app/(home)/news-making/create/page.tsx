"use client"

// Lucide 아이콘 라이브러리에서 아이콘을 가져옴
import { PlusIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { Button } from "@/src/components/news-making/button/CommonNewsMakingButton";
import { Card, CardContent } from "@/src/components/news-making/card/CreateCard";
import { Checkbox } from "@/src/components/news-making/CreateCheckbox";
import ArtStyleCard from "@/src/components/news-making/art-style/ArtStyleCard";
import VoiceDropdown from "@/src/components/news-making/VoiceDropdown";
import Link from "next/link";
import { useProjectStore } from "@/src/store/useNewsMakingStore";
import { ART_STYLES } from "@/src/constants/artStyles";
import { useRouter } from "next/navigation";
import { SectionContent } from "@/src/components/news-making/section/SectionContent";
import { createProjectArtifact } from "@/src/components/news-making/api/CreateSectionAPI";

interface ContentSection {
	title: string;
	buttonText: string;
	hasCheckbox: boolean;
	script: string;
	backendSectionId?: number;
}

export default function Element() {
	const router = useRouter();
	const { projects, currentProjectId, updateThumbnailImage } = useProjectStore();
	const currentProject = projects.find(p => p.id === currentProjectId);
	const thumbnailRef = useRef<{ captureCard: (callback: (dataUrl: string) => void) => void }>(null);
	const [contentSections, setContentSections] = useState<ContentSection[]>([
		{ title: "썸네일", buttonText: "LLM 수정 버튼", hasCheckbox: true, script: "" }
	]);
	
	let selectedStyle = ART_STYLES[0]; // 기본값으로 첫 번째 스타일 사용
	
	if (currentProject?.selectedArtStyleId) {
		const found = ART_STYLES.find(style => style.id === currentProject.selectedArtStyleId);
		if (found) {
			selectedStyle = found;
		}
	}

	const handleNextClick = async () => {
		try {
			if (!currentProjectId) {
				console.error('No project ID available');
				return;
			}

			if (thumbnailRef.current && currentProject) {
				thumbnailRef.current.captureCard((dataUrl) => {
					updateThumbnailImage(dataUrl);
					createProjectArtifact(currentProjectId.toString()).then(() => {
						router.push('/loading');
					});
				});
			} else {
				await createProjectArtifact(currentProjectId.toString());
				router.push('/loading');
			}
		} catch (error) {
			console.error('Failed to create project artifact:', error);
		}
	};

	const handleAddContent = () => {
		if (contentSections.length < 5) {
			const nextCutNumber = (contentSections.length -1) + 1;
			setContentSections(prev => [
				...prev,
				{ 
					title: `컷 ${nextCutNumber}`, 
					buttonText: "LLM 수정 버튼", 
					hasCheckbox: true,
					script: ""
				}
			]);
		}
	};

	const handleScriptChange = (index: number, value: string) => {
		setContentSections(prev => prev.map((section, i) => 
			i === index ? { ...section, script: value } : section
		));
	};

	const handleSectionIdUpdate = (index: number, backendSectionId: number) => {
		setContentSections(prev => prev.map((section, i) => 
			i === index ? { ...section, backendSectionId: backendSectionId } : section
		));
	};

	return (
		<div className="mt-[105px] bg-purple-6 flex flex-row justify-center w-full border-b-[30px] border-white">
			<div className="bg-purple-6 w-full max-w-[1920px] p-12 pl-6 pt-6 pr-6 relative">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* 왼쪽 컬럼: 비디오 스타일 & 썸네일 */}
					<div className="md:col-span-1 space-y-6 sticky top-[105px]">
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
										isSelected={false}
										className="mx-auto border-[10px] border-purple-500 shadow-lg"
										width={200}
										height={224}
										applyBorderBox={true}
									/>
								</div>
							</CardContent>
						</Card>
						<div className="md:col-span-1 space-y-6">
						</div>
						{/* 왼쪽 영역 하단: Thumbnail Card 적용 */}
						<Card className="w-[268px] h-[480px] min-h-[543px] border rounded-lg shadow-sm h-auto">
							<CardContent className="p-3 flex flex-col justify-center items-center h-auto">
								{/* 카드 제목 */}
								<h3 className="text-3xl font-bold font-bold-32 mb-3 p-3 mt-3">
									{"선택한 썸네일"}
								</h3>

								{/* 썸네일 카드 컨테이너 */}
								<div className="w-auto h-auto bg-gray-5 rounded-lg min-h-[436px]">
									{currentProject?.thumbnail?.imageSrc ? (
										<div className="flex justify-center">
											{/* 캡처한 이미지를 사용 전체 배경까지 캡처 */}
											<img 
												src={currentProject.thumbnail.imageSrc}
												alt="썸네일 이미지"
												className="w-full h-auto rounded-lg"
											/>
										</div>
									) : (
										<div className="w-[268px] h-[480px] mx-auto flex items-center justify-center text-gray-500">
											이미지가 없습니다
										</div>
									)}
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
											<SectionContent
												index={index}
												title={section.title}
												script={section.script}
												onScriptChange={handleScriptChange}
												onSectionIdUpdate={handleSectionIdUpdate}
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
						{/* //content section */}
						{/* 하단 컨트롤 버튼 */}
						<div className="flex justify-between mt-6">
							<VoiceDropdown/>
							{contentSections.length < 5 && (
								<Button 
									variant="outline" 
									size="sm" 
									className="ml-2 p-0 w-full flex items-center gap-1"
									onClick={handleAddContent}
								>
									<PlusIcon className="h-4 w-4" />
									<span>콘텐츠 추가</span>
								</Button>
							)}
						</div>
						<div className="w-full max-w-[1200px] flex justify-end gap-6">
							<Link href="/news-making/thumbnail">
								<Button variant="preview" className="w-[200px] h-[60px]">
									이전으로
								</Button>
							</Link>

							<Button variant="next" className="w-[200px] h-[60px]" onClick={handleNextClick}>
								다음으로
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
