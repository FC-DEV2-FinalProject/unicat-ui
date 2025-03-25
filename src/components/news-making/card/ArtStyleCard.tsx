import Image from "next/image";
import { cn } from "@/src/utils/cn"; // ✅ cn 함수 가져오기

import { ArtStyleCardProps } from "@/src/types/newsMakingTypes";

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
