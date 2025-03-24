import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/src/components/news-making/button/CommonNewsMakingButton";

export default function VoiceDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedVoice, setSelectedVoice] = useState("10대 목소리");

	const toggleDropdown = () => setIsOpen(!isOpen);
	const handleSelect = (voice: string) => {
		setSelectedVoice(voice);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block">
			<Button
				variant="outline"
				size="sm"
				className="flex items-center gap-1 min-w-[110px]" // ✅ 최소 너비 110px 설정
				onClick={toggleDropdown}
			>
				<ChevronDownIcon className="h-4 w-4" />
				<span className="truncate">{selectedVoice}</span> {/* 너무 길면 ... 처리 */}
			</Button>

			{isOpen && (
				<div className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
					<ul className="py-2 text-sm text-gray-700 w-full h-32 overflow-auto">
						{["10대 목소리", "20대 목소리", "30대 목소리"].map((voice) => (
							<li
								key={voice}
								className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
								onClick={() => handleSelect(voice)}
							>
								{voice}
							</li>
						))}
					</ul>
				</div>
			)}

		</div>
	);
}
