"use client";

import React, { useState, useEffect } from "react";
import { useProjectStore } from '@/src/store/useNewsMakingStore';
import ModalImageUploadSelfButton from "@/src/components/news-making/button/ModalImageUploadSelfButton";
import ModalImageUploadAiButton from "@/src/components/news-making/button/ModalImageUploadAiButton";
import Link from "next/link";

interface ThumbnailImageModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ThumbnailImageModal({ isOpen, onClose }: ThumbnailImageModalProps) {
	const { updateThumbnailImage } = useProjectStore();
	const [selectedFileName, setSelectedFileName] = useState<string>("선택된 파일 없음");

	useEffect(() => {
		if (isOpen) {
			const savedFileName = localStorage.getItem('thumbnailFileName');
			if (savedFileName) {
				setSelectedFileName(savedFileName);
			}
		}
	}, [isOpen]);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFileName(file.name);
			localStorage.setItem('thumbnailFileName', file.name);
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result as string;
				updateThumbnailImage(base64String);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
			<div 
				className="flex flex-col items-center justify-center gap-[25px] relative bg-white w-[390px] h-[300px] p-[30px] rounded-lg shadow-lg text-center"
				onClick={handleModalClick}
			>
				<h2 className="font-bold font-bold-24 text-2xl">이미지 업로드</h2>
				<p className="text-gray-500">이미지를 업로드하세요.</p>
				<div className="w-full relative">
					<div className="absolute inset-0 pointer-events-none flex items-center pl-[120px]">
						<span className="text-sm text-gray-500">{selectedFileName}</span>
					</div>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className={`block w-full text-sm text-gray-500 ${selectedFileName !== "선택된 파일 없음" ? "text-transparent" : ""}
							file:mr-4 file:py-2 file:px-4
							file:rounded-full file:border-0
							file:text-sm file:font-semibold
							file:bg-purple-50 file:text-purple-700
							hover:file:bg-purple-100`}
					/>
				</div>
				<ModalImageUploadSelfButton></ModalImageUploadSelfButton>
				<Link href="/news-making/create">
					<ModalImageUploadAiButton></ModalImageUploadAiButton>
				</Link>
				<button className="mt-4 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
					닫기
				</button>
			</div>
		</div>
	);
}
