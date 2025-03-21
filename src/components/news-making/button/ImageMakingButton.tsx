import { Button } from "@/src/components/common/Button";

interface ImageMakingButtonProps {
	onClick?: () => void; // ✅ 클릭 이벤트 핸들러 추가
}

export default function ImageMakingButton({ onClick }: ImageMakingButtonProps) {


	return (
		<Button
			className="w-[1200px] h-[90px] bg-purple-1 rounded-lg text-white
                       font-bold text-[24px] hover:bg-purple-2 flex items-center justify-center"
			onClick={onClick} // ✅ onClick 이벤트 추가
		>
			이미지 업로드/생성하기
		</Button>
	);
}