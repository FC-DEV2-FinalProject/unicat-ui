"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // URL 파라미터 로깅
        console.log(
          "Callback URL params:",
          Object.fromEntries(searchParams.entries())
        );

        // 토큰이 있는지 확인 (다양한 파라미터 이름 체크)
        const token =
          searchParams.get("token") ||
          searchParams.get("access_token") ||
          searchParams.get("id_token");

        if (token) {
          // 토큰 저장
          setCookie("Authorization", token);
          console.log("로그인 성공! 토큰이 저장되었습니다.");
          // 대시보드로 리다이렉트
          router.replace("/dashboard");
        } else {
          console.log(
            "토큰을 찾을 수 없습니다. 파라미터: ",
            Object.fromEntries(searchParams.entries())
          );
          // 토큰이 없으면 로그인 페이지로
          // router.replace("/login");
        }
      } catch (error) {
        console.error("콜백 처리 중 오류 발생:", error);
        // router.replace("/login");
      }
    };

    handleCallback();
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

export default function LoginCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">로딩 중...</h2>
            <p className="text-gray-600">잠시만 기다려주세요.</p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
