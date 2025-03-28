import Image from "next/image";
import { cn } from "@/src/utils/cn"; // ✅ cn 함수 가져오기
import { ArtStyleCardProps } from "@/src/types/newsMakingTypes";

export default function ArtStyleCard({
    imageSrc,
    altText,
    isSelected,
    width = 268,
    height = 300,
    className,
    onClick,
}: ArtStyleCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden cursor-pointer rounded-2xl transition-all",
                isSelected ? "border-[10px] border-purple-500 shadow-lg" : "border border-gray-300",
                `w-[${width}px] h-[${height}px]`,
                className
            )}
            onClick={onClick}
        >
            <Image
                src={imageSrc}
                alt={altText}
                width={width}
                height={height}
                className="w-full h-full object-cover rounded"
                priority
            />
            {isSelected && (
                <div className="absolute inset-0 bg-purple-500 bg-opacity-20 rounded-lg border-2 border-purple-500" />
            )}
        </div>
    );
}
