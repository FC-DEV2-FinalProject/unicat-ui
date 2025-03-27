"use client";

import React from 'react';
import { Button } from '@/src/components/common/Button';
import { useArtStyleStore } from '@/src/store/useNewsMakingStore';

interface ArtStyleNextButtonProps {
    onClick: () => void;
}

export const ArtStyleNextButton = ({ onClick }: ArtStyleNextButtonProps) => {
    const { selectedArtStyleId } = useArtStyleStore();

    return (
        <div className="w-full flex justify-end">
            <Button
                className={`w-[268px] h-[80px] rounded-[15px] text-white font-bold text-[24px] transition-colors 
                    ${selectedArtStyleId !== 0 ? "bg-purple-1" : "bg-gray-2"}`}
                onClick={onClick}
            >
                다음으로
            </Button>
        </div>
    );
}; 