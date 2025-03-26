"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

export default function LoginCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // JWT 토큰을 쿠키에 저장
      setCookie("jwt_token", token, {
        maxAge: 60 * 60 * 24 * 7, // 7일
        path: "/",
      });

      // 대시보드로 리다이렉트
      router.replace("/dashboard");
    } else {
      // 토큰이 없으면 로그인 페이지로
      router.replace("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">로그인 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
