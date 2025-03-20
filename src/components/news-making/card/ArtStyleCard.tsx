import Image from "next/image";

interface ArtStyleCardProps {
    imageSrc: string;
    altText: string;
    onClick: () => void;
    isSelected: boolean;
}

export default function ArtStyleCard({ imageSrc, altText, onClick, isSelected }: ArtStyleCardProps) {
    return (
        <div
            className={`w-[268px] h-[300px] overflow-hidden cursor-pointer rounded-2xl 
                        transition-all border ${isSelected ? "border-[10px] border-purple-500 shadow-lg" : "border border-gray-300"}`}
            onClick={onClick}
        >
            <Image
                src={imageSrc}
                alt={altText}
                width={268}
                height={300}
                className="w-full h-full object-cover rounded"
            />
        </div>
    );
}

