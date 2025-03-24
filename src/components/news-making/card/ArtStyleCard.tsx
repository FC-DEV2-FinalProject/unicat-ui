import Image from "next/image";
import { cn } from "@/src/utils/cn"; // ✅ cn 함수 가져오기

interface ArtStyleCardProps {
  imageSrc: string;
  altText: string;
  onClick?: () => void;
  isSelected: boolean;
  width?: number;
  height?: number;
  className?: string;
}

// 기본 width, height 268 300 이전 Props로 속성 전달시 변경됨
interface ArtStyleCardProps {
  imageSrc: string;
  altText: string;
  onClick?: () => void;
  isSelected: boolean;
  applyBorderBox?: boolean; // ✅ 특정 컴포넌트에서만 적용할 수 있는 새로운 prop
  width?: number;
  height?: number;
  className?: string;
}

export default function ArtStyleCard({
                                       imageSrc,
                                       altText,
                                       onClick,
                                       isSelected,
                                       applyBorderBox = false, // ✅ 기본값 false (기존 동작 유지)
                                       width = 268,
                                       height = 300,
                                       className,
                                     }: ArtStyleCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden cursor-pointer rounded-2xl transition-all",
        isSelected ? "border-[10px] border-purple-500 shadow-lg" : "border border-gray-300",
        applyBorderBox ? "box-border" : "", // ✅ createPage에서 보더 테두리가 존재하는 이미지로 사용하기 위해 추가
        `w-[${width}px] h-[${height}px]`,
        className
      )}
      onClick={onClick}
    >
      <Image
        src={imageSrc}
        alt={altText}
        width={width} // ✅ width 적용
        height={height} // ✅ height 적용
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
}
