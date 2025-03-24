import React, { useState } from "react";

interface ThumbnailFontMenuProps {
	fontSize: number;
	fontFamily: string;
	fontColor: string;
	textAlign: "left" | "center" | "right";
	onUpdate: (key: string, value: any) => void;
}

const ThumbnailFontMenu: React.FC<ThumbnailFontMenuProps> = ({ fontSize, fontFamily, fontColor, textAlign, onUpdate }) => {
	const [customFontSize, setCustomFontSize] = useState(fontSize);

	// ✅ 입력 값이 숫자인지 확인 & 범위 제한 적용 (12 ~ 40)
	const handleFontSizeChange = (value: string) => {
		let newSize = Number(value);
		if (isNaN(newSize)) return;
		if (newSize < 12) newSize = 12;
		if (newSize > 40) newSize = 40;
		setCustomFontSize(newSize);
		onUpdate("fontSize", newSize);
	};

	return (
		<div className="flex flex-col gap-2 w-[250px] p-3 bg-gray-100 rounded-lg shadow">
			{/* 🔹 폰트 크기 선택 (드롭다운 + 직접 입력) */}
			<label className="text-sm font-semibold">폰트 크기</label>
			<div className="flex gap-2 items-center">
				<select
					className="border p-1 rounded w-20"
					value={customFontSize}
					onChange={(e) => handleFontSizeChange(e.target.value)}
				>
					{[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
						<option key={size} value={size}>
							{size}
						</option>
					))}
				</select>
				<input
					type="text"
					className="border px-2 py-1 w-14 text-center rounded"
					value={customFontSize}
					onChange={(e) => handleFontSizeChange(e.target.value)}
				/>
			</div>

			{/* 🔹 폰트 종류 선택 */}
			<label className="text-sm font-semibold">폰트</label>
			<select
				className="border p-1 rounded"
				value={fontFamily}
				onChange={(e) => onUpdate("fontFamily", e.target.value)}
			>
				<option value="Arial">Arial</option>
				<option value="Times New Roman">Times New Roman</option>
				<option value="Courier New">Courier New</option>
				<option value="Verdana">Verdana</option>
			</select>

			{/* 🔹 색상 선택 */}
			<label className="text-sm font-semibold">색상</label>
			<input
				type="color"
				value={fontColor}
				onChange={(e) => onUpdate("fontColor", e.target.value)}
			/>

			{/* 🔹 정렬 선택 */}
			<label className="text-sm font-semibold">정렬</label>
			<div className="flex gap-2">
				{["left", "center", "right"].map((align) => (
					<button
						key={align}
						onClick={() => onUpdate("textAlign", align)}
						className={`px-3 py-1 rounded ${
							textAlign === align ? "bg-blue-500 text-white" : "bg-gray-300"
						}`}
					>
						{align.toUpperCase()}
					</button>
				))}
			</div>
		</div>
	);
};

export default ThumbnailFontMenu;
