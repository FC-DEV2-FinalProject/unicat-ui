"use client";

import React, { useState, useEffect } from "react";
import { useProjectStore } from '@/src/store/useNewsMakingStore';
import ModalImageUploadSelfButton from "@/src/components/news-making/button/ModalImageUploadSelfButton";
import ModalImageUploadAiButton from "@/src/components/news-making/button/ModalImageUploadAiButton";
import Link from "next/link";

interface ThumbnailImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	onImageUpload: (imageSrc: string) => void;
}

export default function ThumbnailImageModal({ isOpen, onClose, onImageUpload }: ThumbnailImageModalProps) {
	const { updateThumbnailImage } = useProjectStore();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>("");

	useEffect(() => {
		const savedFileName = localStorage.getItem("selectedFileName");
		if (savedFileName) {
			setFileName(savedFileName);
		}
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			setFileName(file.name);
			localStorage.setItem("selectedFileName", file.name);

			const reader = new FileReader();
			reader.onloadend = () => {
				const imageSrc = reader.result as string;
				onImageUpload(imageSrc);
				onClose();
			};
			reader.readAsDataURL(file);
		}
	};

	const handleClose = () => {
		onClose();
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-40" onClick={handleClose}></div>
			<div 
				className="flex flex-col items-center justify-center gap-[25px] relative bg-white w-[390px] h-[300px] p-[30px] rounded-lg shadow-lg text-center"
				onClick={handleModalClick}
			>
				<h2 className="font-bold font-bold-24 text-2xl">이미지 업로드</h2>
				<p className="text-gray-500">이미지를 업로드하세요.</p>
				<div className="w-full relative">
					<div className="absolute inset-0 pointer-events-none flex items-center pl-[120px]">
					</div>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className={`block w-full text-sm text-gray-500
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
				<button className="mt-4 px-4 py-2 bg-gray-300 rounded" onClick={handleClose}>
					닫기
				</button>
			</div>
		</div>
	);
}
