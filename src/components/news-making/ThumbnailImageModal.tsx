"use client";

import React from 'react';
import { useProjectStore } from '@/src/store/useNewsMakingStore';

interface ThumbnailImageModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ThumbnailImageModal({ isOpen, onClose }: ThumbnailImageModalProps) {
	const { updateThumbnailImage } = useProjectStore();

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result as string;
				updateThumbnailImage(base64String);
				onClose();
			};
			reader.readAsDataURL(file);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
			<div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
				<h2 className="text-lg font-medium mb-4">이미지 업로드</h2>
				<div className="space-y-4">
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="block w-full text-sm text-gray-500
							file:mr-4 file:py-2 file:px-4
							file:rounded-full file:border-0
							file:text-sm file:font-semibold
							file:bg-purple-50 file:text-purple-700
							hover:file:bg-purple-100"
					/>
					<button
						onClick={onClose}
						className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
					>
						취소
					</button>
				</div>
			</div>
		</div>
	);
}
