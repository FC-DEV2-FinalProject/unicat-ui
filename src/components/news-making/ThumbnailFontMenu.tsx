import React, { useState, useRef, useEffect } from "react";

interface ThumbnailFontMenuProps {
	fontSize: number;
	fontFamily: string;
	fontColor: string;
	textAlign: "left" | "center" | "right";
	onUpdate: (key: string, value: number | string) => void;
}

const ThumbnailFontMenu: React.FC<ThumbnailFontMenuProps> = ({ fontSize, fontFamily, fontColor, textAlign, onUpdate }) => {
	const [customFontSize, setCustomFontSize] = useState(fontSize);
	const [isEditing, setIsEditing] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const FONT_SIZES = [10, 11, 12, 13, 14, 15, 16, 20, 24, 28, 32, 36, 40, 48, 64, 96, 128];

	// ✅ 입력 값이 숫자인지 확인 & 범위 제한 적용 (10 ~ 128)
	const handleFontSizeChange = (value: string) => {
		let newSize = Number(value);
		if (isNaN(newSize)) return;
		setCustomFontSize(newSize);
	};

	const handleFontSizeSelect = (size: number) => {
		setCustomFontSize(size);
		onUpdate("fontSize", size);
		setIsEditing(false);
		setIsDropdownOpen(false);
	};

	const handleNumberClick = () => {
		setIsEditing(true);
		setIsDropdownOpen(false);
		if (inputRef.current) {
			inputRef.current.select();
		}
	};

	// 입력 모드일 때 input에 포커스
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	const handleFontSizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 숫자만 입력 가능하도록 정규식으로 필터링
		const value = e.target.value.replace(/[^0-9]/g, '');
		// 첫 입력 시에만 초기화
		if (e.target.value.length === 1) {
			setCustomFontSize(0);
		}
		handleFontSizeChange(value);
	};

	const handleFontSizeConfirm = () => {
		// 확인 시에만 범위 제한 적용
		let finalSize = customFontSize;
		if (finalSize < 10) finalSize = 10;
		if (finalSize > 128) finalSize = 128;
		onUpdate("fontSize", finalSize);
		setIsEditing(false);
	};

	// 드롭다운 버튼 클릭 시 드롭다운 메뉴 표시
	const handleDropdownClick = () => {
		setIsEditing(false);
		setIsDropdownOpen(!isDropdownOpen);
	};

	// 드롭다운 외부 클릭 시 닫기
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.font-size-dropdown')) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// 드롭다운 메뉴 아이템 렌더링
	const renderDropdownItem = (size: number) => (
		<div
			key={size}
			className={`px-2 py-1 hover:bg-gray-800 cursor-pointer text-center h-[28px] flex items-center justify-center text-white ${
				size === customFontSize ? 'bg-blue-600' : ''
			}`}
			onClick={() => handleFontSizeSelect(size)}
		>
			<div className="flex items-center w-full">
				<div className="w-6 flex justify-center">
					{size === customFontSize && (
						<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					)}
				</div>
				<span className="flex-1 ml-1">{size}</span>
			</div>
		</div>
	);

	return (
		<div className="flex flex-col gap-2 w-[250px] p-3 bg-gray-100 rounded-lg shadow">
			{/* 🔹 폰트 크기 선택 (드롭다운 + 직접 입력) */}
			<label className="text-sm font-semibold">폰트 크기</label>
			<div className="flex items-center gap-1 font-size-dropdown relative">
				<div 
					className="border rounded w-20 cursor-pointer flex items-center justify-center"
					onClick={handleNumberClick}
				>
					{isEditing ? (
						<input
							ref={inputRef}
							type="text"
							className="w-full border-none focus:outline-none text-center"
							value={customFontSize || ''}
							onChange={handleFontSizeInput}
							onBlur={handleFontSizeConfirm}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleFontSizeConfirm();
								}
							}}
						/>
					) : (
						<span>{customFontSize}</span>
					)}
				</div>
				<button
					className="border p-1 rounded w-8 flex items-center justify-center cursor-pointer hover:bg-gray-200"
					onClick={handleDropdownClick}
				>
					<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>
				{isDropdownOpen && (
					<div className="absolute top-0 left-0 w-20 bg-black border rounded shadow-lg z-10 max-h-[300px] overflow-y-auto">
						{!FONT_SIZES.includes(customFontSize) && renderDropdownItem(customFontSize)}
						{FONT_SIZES.map(renderDropdownItem)}
					</div>
				)}
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
							textAlign === align ? "bg-purple-1 text-white" : "bg-gray-300"
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
