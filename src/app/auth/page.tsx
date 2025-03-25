"use client"; // ✅ 클라이언트 컴포넌트로 설정

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OAuthLogin() {
    const router = useRouter();

    const handleOAuthLogin = () => {
        // 백엔드의 구글 OAuth 인증 URL로 직접 리다이렉트
        window.location.href = "https://api.unicat.day/oauth2/authorization/google";
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">간편 로그인</h1>
                <div className="space-y-4">
                    <button
                        onClick={handleOAuthLogin}
                        className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg
                                 hover:bg-blue-700 transition-colors duration-200
                                 flex items-center justify-center space-x-2"
                    >
                        <span>Google 로그인</span>
                    </button>
                </div>
            </div>
        </div>
    );
}