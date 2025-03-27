"use client"; // ✅ 클라이언트 컴포넌트 지정

import React, { Suspense } from "react";
import { useArtStyleService } from "@/src/components/news-making/art-style/ArtStyleService";

function ArtStyleContent() {
    const { renderArtStyleContent } = useArtStyleService();
    return renderArtStyleContent();
}

export default function AiNews() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ArtStyleContent />
        </Suspense>
    );
}
