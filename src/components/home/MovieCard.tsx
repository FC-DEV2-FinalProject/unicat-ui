import React from "react";
import Image from "next/image";

interface MovieCardProps {
    image: string;
    title?: string;
    description?: string;
    className?: string;
}

export const MovieCard = ({ image, title, description, className }: MovieCardProps) => {
    return (
        <div className={`bg-white rounded-2xl border border-gray-200 shadow-md ${className}`}>
            <div className="relative w-full h-[600px] aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                    src={image || "/images/default-thumbnail.png"}
                    alt={title || "영상 이미지"}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-xl"
                />
            </div>

            {/* ✅ 텍스트 중앙 정렬 */}
            <div className="flex flex-col bg-gray-0 items-center text-center p-4">
                {title && <h3 className="font-bold text-lg line-clamp-1">{title}</h3>}
                {description && <p className="line-clamp-2">{description}</p>}
            </div>
        </div>
    );
};
