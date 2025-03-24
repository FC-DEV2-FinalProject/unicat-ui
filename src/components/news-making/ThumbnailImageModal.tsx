"use client";

import React from "react";
import ModalImageUploadSelfButton from "@/src/components/news-making/button/ModalImageUploadSelfButton";
import ModalImageUploadAiButton from "@/src/components/news-making/button/ModalImageUploadAiButton";
import Link from "next/link";

interface ThumbnailImageModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ThumbnailImageModal({ isOpen, onClose }: ThumbnailImageModalProps) {
	if (!isOpen) return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			{/* ✅ 배경 오버레이 (흐리게) */}
			<div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>

			{/* ✅ 모달 본체 */}
			<div className="flex flex-col items-center justify-center gap-[25px] relative bg-white w-[390px] h-[300px] p-[30px] rounded-lg shadow-lg text-center">
				<h2 className="font-bold font-bold-24 text-2xl">이미지 업로드</h2>
					<p className="text-gray-500">이미지를 업로드하세요.</p>
					<ModalImageUploadSelfButton></ModalImageUploadSelfButton>
				<Link href="/news-making/create">
					<ModalImageUploadAiButton></ModalImageUploadAiButton>
				</Link>
					{/* ✅ 닫기 버튼 */}
					<button className="mt-4 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
						닫기
					</button>
			</div>
		</div>
	);
}
