interface ModalImageUploadAiButtonProps {
	onClick: () => void;
}

export default function ModalImageUploadAiButton({ onClick }: ModalImageUploadAiButtonProps) {
	return (
		<button 
			onClick={onClick}
			className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
		>
			AI로 생성하기
		</button>
	);
}