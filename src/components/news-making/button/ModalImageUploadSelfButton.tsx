interface ModalImageUploadSelfButtonProps {
	onClick?: () => void;
}

export default function ModalImageUploadSelfButton({ onClick }: ModalImageUploadSelfButtonProps) {
	return (
		<button
			onClick={onClick}
			className="w-full py-3 px-4 bg-purple-1 text-white rounded-lg hover:bg-purple-2 transition-colors"
		>
			직접 업로드
		</button>
	);
}